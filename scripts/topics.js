/* ============================================================
   TOPICS.JS — Builds the topic category card grid dynamically.
   Used on the Topics index page.
   Reads from topics-data.js (TOPICS array).
   ============================================================ */

/**
 * Renders all topic cards into a container element.
 * Each card links to topics/[topic-id].html
 *
 * @param {string} containerId - the id of the <div> to fill with topic cards
 */
function renderTopics(containerId) {

  var container = document.getElementById(containerId);
  if (!container) return;

  var html = '';

  TOPICS.forEach(function (topic) {

    html += '<a class="topic-card-wrapper" href="topics/' + topic.id + '.html">';
    html +=   '<span class="topic-card">';
    html +=     '<span class="topic-card-label">' + topic.label + '</span>';
    html +=   '</span>';
    html += '</a>';

  });

  container.innerHTML = html;
}
