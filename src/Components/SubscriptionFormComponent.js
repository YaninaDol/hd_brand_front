import React from 'react';
import { LiqpayService, PaymentAction, PaymentPeriodicity, Currency } from 'magic-npm-package';

function SubscriptionFormComponent({ price, description, orderId, buttonTitle }) {
  const liqpayService = new LiqpayService();
  return (
    <div>
      {/* Call the createSubscriptionPaymentForm function on liqpayService */}
      {
        liqpayService.createSubscriptionPaymentForm({
          action: PaymentAction.Subscribe,
          subscribePeriodicity: PaymentPeriodicity.Month,
          price,
          currency: Currency.UAH,
          description,
          orderId,
          buttonTitle
        })
      }
    </div>
  );
}

export default SubscriptionFormComponent;

