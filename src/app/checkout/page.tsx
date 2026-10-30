import Link from "next/link";
import { Icon } from "@/components/icons";

export default function CheckoutPage() {
  return (
    <main className="checkout-page page-gutter">
      <div className="checkout-card">
        <span className="checkout-card__symbol"><Icon name="bag" /></span>
        <p className="eyebrow">A note before you go</p>
        <h1>Checkout is<br /><em>not open yet.</em></h1>
        <p>This is a concept preview and no payment provider is connected. Your bag is saved on this device, but no order can be placed or payment taken.</p>
        <Link className="button button--dark" href="/cart">Return to your bag <Icon name="arrow" /></Link>
      </div>
    </main>
  );
}
