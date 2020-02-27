/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/


console.log('hi')
module.exports = function(controller) {
    controller.hears(['*'], 'ambient', function(bot, message) {
      console.log(bot)
    })
    controller.hears(['.*(g|G)uys.*'], 'ambient', function(bot, message) {
            bot.whisper(message, 'Please bear in mind that the makeup of this Slack is very diverse, and some people feel excluded by the use of the term “guys”. Maybe you could try using _people_, _team_, _all_, _folks_, _everyone_, or _y\'all_? (<https://dev.to/kmelve/the-problem-with-you-guys-51h7|What\'s this then?>).')
    });
    controller.hears(['.*(g|G)uys.*'], 'direct_message,direct_mention', function(bot, message) {
            bot.whisper(message, 'Please bear in mind that the makeup of this Slack is very diverse, and some people feel excluded by the use of the term “guys”. Maybe you could try using _people_, _team_, _all_, _folks_, _everyone_, or _y\'all_? (<https://dev.to/kmelve/the-problem-with-you-guys-51h7|What\'s this then?>).')
    });

};
