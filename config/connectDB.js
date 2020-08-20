module.exports = function ( mongoose , connect_string ) {
    connect_string = connect_string || 'mongodb+srv://luanmap:iSgGWwsnHwH8lKpd@cluster0-kazzw.mongodb.net/testingproject?retryWrites=true&w=majority'
    mongoose.connect(connect_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Kết nối thành công !!');
    });
}