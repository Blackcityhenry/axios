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
      resultQuery: ''
    },
    methods: {
      checkHttp(){
        return /^https?\:\/\//g.test(this.consoleInput)? this.consoleInput = this.consoleInput.replace(/https?\:\/\//g, '') : null ;
      },
      process(){
        var userInput = 'https://' + this.consoleInput;
        var userOutput = [];
        this.consoleInput = '';
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
            userOutput = JSON.stringify(res.data).replace(/\[/g, '[<br/>').replace(/\,/g, ',<br/>').replace(/\{/g, '{<br/>').replace(/\}/g, '<br/>}');
            this.resultQuery = userOutput;
          }
        );
      },
      addNewBodyRow(){
        this.body.push({key: '', value: ''})
      }
    }
  }
)
