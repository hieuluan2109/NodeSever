module.exports = function ( mongoose , connect_string ) {
    mongoose.connect(connect_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Kết nối thành công !!');
    });
}