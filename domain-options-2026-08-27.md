# Domain options with `denta` — 2026-08-27

The current production domain remains `active-medical.pp.ua`; no DNS or hosting change was made.

| Candidate | DNS A lookup | Preliminary reading |
|---|---:|---|
| `active-denta.pp.ua` | NXDOMAIN / no A answer | Clear, readable and closest to the parent brand |
| `activedenta.pp.ua` | NXDOMAIN / no A answer | Shorter, but less readable at a glance |
| `denta-active.pp.ua` | NXDOMAIN / no A answer | Understandable, but reverses the stronger brand-first order |
| `active-medical-denta.pp.ua` | NXDOMAIN / no A answer | Descriptive, but long and harder to say/type |

The DNS result only means that no current A record was observed through Google Public DNS at the time of checking. It is **not proof that a domain is unregistered or available for purchase**. The final choice must be checked in the `.pp.ua` registrar/registration flow and confirmed with the clinic owner. The recommended first candidate is `active-denta.pp.ua`, subject to registrar availability and ownership confirmation.

Recommended migration sequence: register and verify ownership of the selected domain; configure HTTPS; point it to the same production host as `active-medical.pp.ua`; verify images, forms, maps and monitoring; then keep `active-medical.pp.ua` as a permanent redirect/alias rather than removing it abruptly.

## Registrar check setup

NIC.UA's public domain search page confirms that it can show whether a requested domain is free or taken, and it exposes the `.pp.ua` zone in the search form. The four candidates were entered into the search field. No sign-in, cart action, registration, payment, ownership transfer, or DNS change has been performed.

## Registrar availability result

On 2026-08-27, the NIC.UA search result page displayed **“available for registration”** for all four tested candidates: `active-denta.pp.ua`, `activedenta.pp.ua`, `denta-active.pp.ua`, and `active-medical-denta.pp.ua`. The result also states that `.pp.ua` registration requires activation after registration. No candidate was added to cart, purchased, registered, or activated. The recommendation remains `active-denta.pp.ua` because it is the clearest brand-first option; the final choice still requires the owner's confirmation before any registration or DNS work.

Source: [NIC.UA domain search](https://nic.ua/en/order/check-result?domain_name=active-denta.pp.ua+activedenta.pp.ua+denta-active.pp.ua+active-medical-denta.pp.ua).
