module.exports = {
    name: 'hello',
    description: 'Test command to say hello back',
    usage: '!hello',
    async execute (message, args) {
        message.channel.send("Hello")
    }
}