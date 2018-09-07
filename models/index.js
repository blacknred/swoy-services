import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    operatorsAliases: false,
    define: {
        underscored: true
    }
})

const models = {
    User: sequelize.import('./user'),
    Team: sequelize.import('./team'),
    Channel: sequelize.import('./channel'),
    Message: sequelize.import('./message'),
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;