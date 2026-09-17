// ==============================================================================
// SIDEBAR EXTRAS COMPONENT (Tab Sumber Data, Contact Person, Ownership & Upgrade Space)
// ==============================================================================

export class SidebarExtras {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.render();
  }

  updateStats(total) {}

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';
  }

  attachEvents() {}
}
