const bcrypt = require("bcryptjs");

module.exports = {
  addProduct: (req, res) => {
    const { name, p_image, price, p_type, available } = req.body;
    const db = req.app.get("db");
    db.admin.add_product
      .add_product({
        name,
        p_image,
        price,
        p_type,
        available
      })
      .then(products => res.status(200).send(products))
      .catch(err => console.log(err));
  },

  editProduct: (req, res) => {
    const { p_id } = req.params;
    let { name, p_image, price, p_type, available } = req.body;
    const db = req.app.get("db");

    db.admin.edit_products
      .edit_products({
        name,
        p_image,
        price,
        p_type,
        p_id,
        available
      })
      .then(product => {
        res.status(200).send(product);
      });
  },

  deleteProduct: (req, res) => {
    let { p_id } = req.params;
    const db = req.app.get("db");
    db.admin.delete_product
      .delete_product({
        p_id
      })
      .then(product => {
        res.status(200).send({ Message: "Product has been removed" });
      });
  },

  getAllEmployees: (req, res) => {
    const db = req.app.get("db");
    db.users.get_users()
    .then(employees => {
      // console.log(employees)
        res.status(200).send(employees);
      })
      .catch(err => res.status(500).send(err));
  },

  deleteEmployee: (req, res) => {
    let { user_id } = req.params;
    // console.log(user_id)
    const db = req.app.get("db");
    db.admin.delete_employee
      .delete_employee({
        user_id
      })
      .then(employee => {
        res.status(200).send({ Message: "Employee has been removed" });
      });
  }
};
