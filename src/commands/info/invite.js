const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const AvonCommand = require("../../structures/avonCommand");

class Invite extends AvonCommand{
    get name(){
        return 'invite'
    }
    get aliases(){
        return 'inv'
    }
    get cat(){
        return 'info';
    }
    async run(client,message,args,prefix)
    {   
        let currentTime = new Date();

        let e = new EmbedBuilder().setColor(client.config.color).setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL()})
          .addFields(
            {
              name: "Invite Muzic",
              value: `[**Muzic**](${client.config.invite})`
            },
            {
              name: "Need Help",
              value: `[**Support Server**](${client.config.server})`
            }
          ).setTimestamp(currentTime).setThumbnail(client.user.displayAvatarURL());
          let r = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(`https://discord.com/api/oauth2/authorize?client_id=1149585092478513214&permissions=137476565393&scope=bot`).setLabel(`Invite`),
            new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(client.config.server).setLabel(`Support Server`)
        );        
        return message.channel.send({embeds : [e] , components : [r]});
    }
}
module.exports = Invite;