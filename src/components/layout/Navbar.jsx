import { Bell, Menu, Search } from "lucide-react";

export default function Navbar({ onMenu }) {
  return <header className="navbar">
    <button className="icon-button lg:hidden" onClick={onMenu} aria-label="Open navigation"><Menu size={20}/></button>
    <div><p className="eyebrow">Control center</p><h1>System overview</h1></div>
    <div className="nav-actions">
      <label className="search"><Search size={16}/><input aria-label="Search dashboard" placeholder="Search anything…"/></label>
      <button className="icon-button notification" aria-label="Notifications"><Bell size={18}/><i/></button>
      <div className="avatar">MH</div>
    </div>
  </header>;
}
