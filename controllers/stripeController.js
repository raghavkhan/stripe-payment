const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;
  console.log(total_amount);

  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'inr',
  });

  console.log(paymentIntent);
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = { stripeController };
