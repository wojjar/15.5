
var GIPHY_PUB_KEY = 'clo3qCc6Z8J3o3IL8Y9uYKUHCDAynqai';
var GIPHY_API_URL = 'http://api.giphy.com';

App = React.createClass({

  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    };
  },
  handleSearch: function (searchingText) {
    this.setState({
      loading: true
    });

    this.getGif(searchingText)
      .then(response => {
        this.setState({
          loading: false,
          gif: {
            url: response.fixed_width_downsampled_url,
            sourceUrl: response.url
          },
          searchingText: searchingText
        });
      })
      .catch(error => console.error('Something went wrong', error));
  },
  getGif: function (searchText) {
    var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchText;

    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.onload = function () {
          if (this.status === 200) {
            let data = JSON.parse(this.response).data; 
            resolve(data);
          } else {
            reject(new Error(this.statusText)); 
          }
        };
        request.open('GET', url);
        request.send();
      }
    );
  },
  render: function () {
    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };
    return (
      <div style={styles}>
        <h1>Wyszukiwarka GIFow!</h1>
        <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
        <Search onSearch={this.handleSearch}/>
        <Gif loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl} />
      </div>
    );
  }
});

var app = React.createElement(App);
ReactDOM.render(app, document.getElementById('app'));

