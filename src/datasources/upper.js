const { SQLDataSource } = require("datasource-sql");
class ServerlessDatabase extends SQLDataSource {
  getUppers() {
    return this.knex.select("*").from("upper");
  }
  getUpperById(id) {
    return this.knex
      .select("*")
      .from("upper AS upper")
      .leftJoin("lower AS lower", "upper.lowerkey", "lower.id")
      .where("upper.id", "=", id)
      .options({ nestTables: true })
      .then((results) => {
        return this.upperReducer(results);
      });
  }
  getLowerById(id) {
    return this.knex
      .select("*")
      .from("lower AS lower")
      .where("lower.id", "=", id)
      .options({ nestTables: true })
      .then((results) => {
        return this.lowerReducer(results);
      });
  }

  upperReducer(result) {
    if (result.length > 0) {
      const lowers = result.map((res) => res.lower);
      return {
        ...result[0].upper,
        lowers,
      };
    }
    return null;
  }

  lowerReducer(results) {
    if (results.length > 0) {
      return {
        ...results[0].video,
      };
    }
    return null;
  }
}
module.exports = ServerlessDatabase;
