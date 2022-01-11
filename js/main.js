var sandbox = new Vue(
  {
    el: '#app',
    vuetify: new Vuetify({
      theme: {
        dark: true
      }
    }
    ),
    router: new VueRouter(),
    data: {
      consoleInput: '',
      method: 'GET',
      methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'HEAD', 'PUT', 'CONNECT', 'PATCH'],
      body: [],
      historyURL: [],
      historyIndex: 0,
      resultQuery: '',
      isLoading: false
    },
    methods: {
      checkHttp(){
        return /^https?\:\/\//g.test(this.consoleInput)? this.consoleInput = this.consoleInput.replace(/https?\:\/\//g, '') : null ;
      },
      process(){

        this.isLoading = true;

        var userInput = 'https://' + this.consoleInput;
        var userOutput = [];
        this.historyURL.push(this.consoleInput);
        this.consoleInput = '';
        this.historyIndex = 0;
        var httpBody = {};

        if ( this.method == 'GET' && this.body.length){
          let string = '?';
          this.body.forEach(current=>{
            string += current.key + '=' + current.value + '&';
          })
          userInput += string;
        } else if ( this.method == 'POST' ) {
          this.body.forEach(current=>{
            httpBody[current.key] = current.value;
          })
        }

        axios({
          method: this.method,
          url: userInput,
          body: httpBody
        }).then(
          res => {
            // userOutput = JSON.stringify(res.data).replace(/\[/g, '[<br/>').replace(/\,/g, ',<br/>').replace(/\{/g, '{<br/>').replace(/\}/g, '<br/>}');
            userOutput = JSON.stringify(res.data, null, 2)

            this.resultQuery = userOutput;
          }
        ).catch(
          err => {
            userOutput = JSON.stringify(err.response, null, 2)
          }
        ).finally(
          ()=>{
            this.isLoading = false;
            this.initPrism();
          }
        )
      },
      historyUp(){
        var length = this.historyURL.length;

        if ( this.historyIndex == length ){

        } else {

          this.historyIndex += 1;
          var index = length - this.historyIndex;
          this.consoleInput = this.historyURL[index];

        }

      },
      historyDown(){
        var length = this.historyURL.length;

        if ( this.historyIndex == 0 ){

        } else {

          this.historyIndex -= 1;
          var index = length - this.historyIndex;
          this.consoleInput = this.historyURL[index];

        }

      },
      addNewBodyRow(){
        this.body.push({key: '', value: ''})
      },
      initPrism(){
        Prism.highlightAll();
      }
    },
    mounted(){
      // this.initPrism();
    }
  }
)
