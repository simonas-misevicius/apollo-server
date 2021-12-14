const { SQLDataSource } = require("datasource-sql");
class ServerlessDatabase extends SQLDataSource {
  getUppers() {
    return this.knex
      .select("*")
      .from("upper AS upper")
      .leftJoin("lower AS lower", "upper.id", "lower.upperkey")
      .orderBy("upper.id")
      .options({ nestTables: true })
      .then((results) => {
        return this.uppersReducer(results);
      });
  }
  getLowers() {
    return this.knex.select("*").from("lower");
  }
  getUpperById(id) {
    return this.knex
      .select("*")
      .from("upper AS upper")
      .leftJoin("lower AS lower", "upper.id", "lower.upperkey")
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

  addUpper(name) {
    return this.knex("upper")
      .insert({ name: name })
      .then((results) => {
        return { success: true };
      })
      .catch((error) => {
        return { success: false };
      });
  }

  removeUpper(id) {
    return this.knex("upper")
      .where("id", id)
      .del()
      .then((results) => {
        return { success: true };
      })
      .catch((error) => {
        return { success: false };
      });
  }

  editUpper(name, id) {
    return this.knex("upper")
      .where("id", id)
      .update({ name: name })
      .then((results) => {
        return { success: true };
      })
      .catch((error) => {
        return { success: false };
      });
  }

  addLower(name, keyId) {
    return this.knex("lower")
      .insert({ namel: name, upperkey: keyId })
      .then((results) => {
        return { success: true };
      })
      .catch((error) => {
        return { success: false, message: error };
      });
  }

  removeLower(id) {
    return this.knex("lower")
      .where("id", id)
      .del()
      .then((results) => {
        return { success: true };
      })
      .catch((error) => {
        return { success: false };
      });
  }

  editLower(name, keyId, id) {
    return this.knex("lower")
      .where("id", id)
      .update({ namel: name, upperkey: keyId })
      .then((results) => {
        return { success: true };
      })
      .catch((error) => {
        return { success: false };
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

  uppersReducer(result) {
    if (result.length > 0) {
      var currentId = result[0].upper.id;
      var formedResult = [];
      formedResult.push({
        ...result[0].upper,
        lowers: [{ ...result[0].lower }],
      });
      var resultCounterIndex = 0;
      for (var i = 1; i < result.length; i++) {
        if (result[i].upper.id != currentId) {
          currentId = result[i].upper.id;
          formedResult.push({
            ...result[i].upper,
            lowers: [{ ...result[i].lower }],
          });
          resultCounterIndex++;
        } else {
          formedResult[resultCounterIndex].lowers.push(result[i].lower);
        }
      }
      return formedResult;
      //return { ...result[0].upper, lowers: [...results[0].lower] };
    }
    return null;
  }

  lowerReducer(results) {
    if (results.length > 0) {
      return {
        ...results[0].lower,
      };
    }
    return null;
  }
}
module.exports = ServerlessDatabase;
