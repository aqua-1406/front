const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

app
  .route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post((req, res) => {
    try {
      const data = req.body.data || [];
      const numbers = [];
      const alphabets = [];
      let highestLoweralphabet = "";

      for (const item of data) {
        if (!isNaN(item)) {
          numbers.push(item);
        } else if (item.length === 1 && isNaN(item)) {
          if (item >= 'a' && item <= 'z') {
            alphabets.push(item);
            if (!highestLoweralphabet || item > highestLoweralphabet) {
              highestLoweralphabet = item;
            }
          }
        }
      }

      res.json({
        is_success: true,
        user_id: "shreyansh_kumar_singh_14062004",
        email: "shreyanshkumar.singh2021@vitbhopal.ac.in",
        roll_number: "21BEC10848",
        numbers: numbers,
        alphabets: alphabets,
        highestLoweralphabet: highestLoweralphabet ? [highestLoweralphabet] : [],
      });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while processing the request." });
    }
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
