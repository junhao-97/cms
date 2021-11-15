module.exports = app => {
    const { STRING } = app.Sequelize;

    const Resource = app.model.define('resource', {
        title: STRING,
        code: STRING,
        downloadurl: STRING
    })
    return Resource;
}