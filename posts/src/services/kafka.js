const kafka = require('kafka-node')
const Consumer = kafka.Consumer
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_URL })
const Post = require('../models/post.model')
const Category = require('../models/category.model')

// Create topic
var topicsToCreate = [
    {
        topic: "post",
        partitions: 1,
        replicationFactor: 1,
    },
    {
        topic: "category",
        partitions: 1,
        replicationFactor: 1,
    },
];



const option = {
  groupId: 'kafka-node-group', //consumer group id, default `kafka-node-group`
  // Auto commit config
  autoCommit: true,
  autoCommitIntervalMs: 5000,
  // The max wait time is the maximum amount of time in milliseconds to block waiting if insufficient data is available at the time the request is issued, default 100ms
  fetchMaxWaitMs: 100,
  // This is the minimum number of bytes of messages that must be available to give a response, default 1 byte
  fetchMinBytes: 1,
  // The maximum bytes to include in the message set for this partition. This helps bound the size of the response.
  fetchMaxBytes: 1024 * 1024,
  // If set true, consumer will fetch message from the given offset in the payloads
  fromOffset: false,
  // If set to 'buffer', values will be returned as raw buffer objects.
  encoding: 'utf8',
  keyEncoding: 'utf8',
}


client.on("ready", () => {
    client.createTopics(topicsToCreate, (error, result) => {
        if(error){
            console.log(error);
        }
        if(result){
            console.log("Topic started successfully")
        }
    });
    console.log("POST has connected to kafka");
});

const consumer = new Consumer(
  client,
  [{ topic: 'post' }, { topic: 'category' }],
  option
)

consumer.on("message", async (message) => {
    // console.log(Object.keys(message.value))
    switch (message.topic) {
        case "category":
            const categoryList = JSON.parse(message.value);
            try {
                await Category.create(categoryList);
            } catch (error) {
                if (error.code !== 11000) {
                    console.log(error);
                }
            }
            break;
        case "post":
            const postList = JSON.parse(message.value);
            try {
                await Post.create(postList);
            } catch (error) {
                if (error.code !== 11000) {
                    console.log(error);
                }
            }
            break;
        default:
            break;
    }
});


