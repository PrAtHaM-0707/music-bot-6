const { Client , GatewayIntentBits , Collection , WebhookClient, Partials , EmbedBuilder } = require(`discord.js`);
const { Guilds , MessageContent , GuildInvites , GuildVoiceStates , GuildMessages , DirectMessages } = GatewayIntentBits;
const { User , Channel , Reaction , Message , GuildMember } = Partials;
const { Poru } = require(`poru`);
const { Database } = require("quickmongo");
const AvonEvents = require("./avonEvents");
const AvonCommands = require("./CommandHandler");
const { Spotify } = require("poru-spotify");
const config = require(`../../config.json`);
const web = new WebhookClient({url : process.env.errors});
class Avon extends Client {
    constructor(){
        super({
            intents : [Guilds,MessageContent,GuildInvites,GuildMessages,DirectMessages,GuildVoiceStates],
            partials : [Channel,User,Reaction,Message,GuildMember],
            allowedMentions : {
                repliedUser : true,
                parse : ['everyone','roles','users']
            }
        });
        this.poru = new Poru(this,config.nodes,{
            apple : {
                playlistLimit : 5
            },
            plugins : [new Spotify({clientID : process.env.spotifyID,clientSecret : process.env.spotifySecret, playlistLimit : 5})],
        });
        this.data = new Database(process.env.mongourl);
        this.data.connect();
        this.data2 = new Database(process.env.mongourl2);
        this.data2.connect();
        this.emoji = require(`${process.cwd()}/emoji.json`);
        this.config = require(`${process.cwd()}/config.json`);
        this.AvonCommands = new AvonCommands(this).loadCommands();
        this.events = new AvonEvents(this).loadEvents();
        this.login(process.env.token);
        process.on('unhandledRejection',async(er) => {
            console.error(er);
            web.send({embeds : [new EmbedBuilder().setColor(`#2f3136`).setDescription(`\`\`\`js\n${er}\`\`\``)]});
        });
        process.on('uncaughtException',async(err) => {
            console.error(err);
            web.send({embeds : [new EmbedBuilder().setColor(`#2f3136`).setDescription(`\`\`\`js\n${err}\`\`\``)]});
        });
    }
    
}
module.exports = Avon;