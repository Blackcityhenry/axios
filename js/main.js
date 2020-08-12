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
      consoleInput: 'https://tmc.allab.net/sessions.php',
      resultQuery: ''
    },
    methods: {
      process(){
        var userInput = this.consoleInput;
        var userOutput = [];
        this.consoleInput = '';
        axios.get(userInput).then(
          res => {
            userOutput = JSON.stringify(res.data).replace(/\[/g, '[<br/>').replace(/\,/g, ',<br/>').replace(/\{/g, '{<br/>').replace(/\}/g, '<br/>}');
            console.error(userOutput);
            this.resultQuery = userOutput;
          }
        );
      }
    }
  }
)
