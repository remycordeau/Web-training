class Todo{
  constructor(data){   //id,title,comment,tags
    if(undefined != data.id) {
      this.id = data.id;
    } else {
      this.id = parseInt(Math.floor(Math.random() * Math.floor(100000)));
    }
    if(undefined != data.title) {
      this.title = data.title;
    } else {
      this.title = "";
    }
    if(undefined != data.comment) {
      this.comment = data.comment;
    } else {
      this.comment = "";
    }
    if(undefined != data.tags) {
      this.tags = data.tags;
    } else {
      this.tags = [];
    }
  }
}

module.exports = Todo;
