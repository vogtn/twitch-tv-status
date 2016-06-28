var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "halo", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","comster404","ninja","tPain","Adobe","summit1g"];

$(document).ready(function() {
  channels.forEach(function(channel) {
    var streamURL = 'https://api.twitch.tv/kraken/streams/' + channel + '?callback=?';
    var channelURL = 'https://api.twitch.tv/kraken/channels/' + channel;

    $.getJSON(streamURL, function(result) {

      var state;
      if (result.stream === null) {
        state = "offline";
      } else if (result.status === 422) {
        state = "Account closed";
        state = "offline";
      } else {
        state = "online";
      }
      $.ajax({
        url: channelURL,
        dataType: 'jsonp',
        success: function(data) {
          var img = data.logo;
 
          var name = data.display_name;
          var status = data.status;
          if (status.length > 20) {
            status = status.slice(0, 20) + "...";
          }
          var game = data.game + ":";
          if (data.game === null || state === "offline") {
            game = "";
            status = "Offline";
          }
          if (data.display_name === undefined) {
            game = "";
            status = "Account closed";
            name = data.message.split(" ")[1];
            name = name.substring(1, name.length - 1);
          }
          var content = '<div id="stream" class="' + state + 
              '"><div class="row"><div class="col-md-3"><img src="' + img +
            '"/></div><div class="col-md-3"><a id="name" href="' + data.url +
            '" target="_blank">' + name + '</a></div><div class="col-md-6"><p id="game">' + game +
            '</p><p id="status">' + status +
            '</p></div></div></div>';

          if (state === "online") {
            $(".accounts").prepend(content);
          } else {
            $(".accounts").append(content);
          }
        }
      });
    });
  });
  $("#onlineRadio").change(function() {
      $(".offline").hide();
      $(".online").show();
  });
  $("#offlineRadio").change(function() {
    if ($("div").hasClass('online')) {
      $(".online").hide();
      $(".offline").show();
    }
  });
    $("#allRadio").change(function() {
      $(".offline").show();
      $(".online").show();
  });
});