import Link from "next/link";
import { Icon } from "@/components/icons";

export default function AccountPage() {
  return <main className="account-page page-gutter"><div className="account-card"><p className="eyebrow">A more personal experience</p><h1>Accounts are<br /><em>coming later.</em></h1><p>There’s no account system in this preview. You can explore the collection and save a selection in your bag on this device.</p><Link href="/collections/all" className="button button--dark">Explore the collection <Icon name="arrow" /></Link></div></main>;
}
