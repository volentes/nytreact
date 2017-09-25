const axios = require('axios');
const APIKey = "4d48c8dd24e0407b90f10efa3df3b868";
const helpers = {

  // This will run our query.
  runQuery: function(term, start, end){
    let trimmedterm = term.trim();
    let fullstart = start.trim() + "0101";
    let fullend = end.trim() + "1231";

    return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
          'api-key': APIKey,
          'q': trimmedterm,
          'begin_date': fullstart,
          'end_date': fullend     
      }
    })
    .then(function(results){
      console.log("New York Times Search Results", results.data.response);
      return results.data.response;
    });
  },
  deleteSaved: function(title, data, url){
    return axios.delete('/api/saved', {
      params: {
          'title': title,
          'data': data,
          'url': url,
      }
    })
    .then(function(results){
      console.log("Delete results", results);
      return results;
    })
  },
  getSaved: function(){
    return axios.get('/api/saved')
      .then(function(results){
        console.log("Saving to Mongo Results", results);
        return results;
      })
  },
  postSaved: function(title, date, url){
    var newArticle = {title: title, date: date, url: url};
    return axios.post('/api/saved', newArticle)
      .then(function(results){
        console.log("Posting new article results", results._id);
        return results._id;
      })
  }
}
module.exports = helpers;