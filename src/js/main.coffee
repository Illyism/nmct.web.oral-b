$ = {
  reviews: []
}

window.onload = () ->
  $.getReviews $.renderReviews
  new WOW().init()

$.id = (q) -> document.getElementById q
$.q = (q) -> document.querySelector q
$.templ = (templ) ->
  node = $.q("##{templ}.ui.template").innerHTML

$.get = (url, callback) ->
  request = new XMLHttpRequest()
  request.open 'GET', url, yes

  request.onload = () ->
    if (request.status >= 200 and request.status < 400)
      data = JSON.parse request.responseText
      callback null, data
    else
      callback request

  request.onerror = () ->
    callback request

  request.send()

#     ____            _                  
#    / __ \___ _   __(_)__ _      _______
#   / /_/ / _ \ | / / / _ \ | /| / / ___/
#  / _, _/  __/ |/ / /  __/ |/ |/ (__  ) 
# /_/ |_|\___/|___/_/\___/|__/|__/____/  
#                                       

class Review
  constructor: (data) ->
    @[name] = item for name, item of data
    @time = timeSince new Date @timestamp
  render: ->
    root = document.createElement "div"
    root.className = "ui review wow fadeInUp"
    root.innerHTML = $.render $.templ("review"), @
    root

$.getReviews = (callback) ->
  $.get "reviews.json", (err, data) ->
    return console.log err if err?
    $.reviews = []
    for item in data
      $.reviews.push new Review item
    callback $.reviews

$.renderReviews = () ->
  root = $.q ".ui.reviews"
  fragment = document.createDocumentFragment()
  for review in $.reviews
    fragment.appendChild review.render()
  root.appendChild fragment.cloneNode true

timeSince = (time) ->
  seconds = Math.floor((new Date() - time) / 1000)
  interval = Math.floor(seconds / 31536000);
  return "#{interval} years" if interval > 1
  interval = Math.floor(seconds / 2592000)
  return "#{interval} months" if interval > 1
  interval = Math.floor(seconds / 86400)
  return "#{interval} days" if interval > 1
  interval = Math.floor(seconds / 3600)
  return "#{interval} hours" if interval > 1
  interval = Math.floor(seconds / 60)
  return "#{interval} minutes" if interval > 1
  return "#{Math.floor(seconds)} seconds"

###_____                   _       _       
|__   __|                 | |     | |      
   | | ___ _ __ ___  _ __ | | __ _| |_ ___ 
   | |/ _ \ '_ ` _ \| '_ \| |/ _` | __/ _ \
   | |  __/ | | | | | |_) | | (_| | ||  __/
   |_|\___|_| |_| |_| .__/|_|\__,_|\__\___|
                    | |                    
                    ###
FN = {}
template_escape = {"\\": "\\\\", "\n": "\\n", "\r": "\\r", "'": "\\'"}
render_escape = {'&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;'}

default_escape_fn = (str, key) ->
  if str is null then "" else (str+"").replace /[&\"<>]/g, (char) ->
    render_escape[char]


$.render = (tmpl, data, escape_fn) ->
  escape_fn = default_escape_fn if escape_fn is true
  tmpl = tmpl or ''

  (FN[tmpl] = FN[tmpl] || new Function("_", "e", "return '" +
    tmpl.replace(/[\\\n\r']/g, (char) ->
      template_escape[char];
    ).replace(/{\s*([\w\.]+)\s*}/g, "' + (e?e(_.$1,'$1'):_.$1||(_.$1==null?'':_.$1)) + '") + "'")
  )(data, escape_fn)