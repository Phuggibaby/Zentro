/* ==========================================================================
   ZENTRO Technologies — main.js
   All behaviour for the ZENTRO website (extracted from the live site,
   unchanged). Plain vanilla JavaScript, no libraries, no build step.
   ========================================================================== */

/* ==================================================================
         ZENTRO site behaviour — plain vanilla JavaScript, no libraries.
         Blocks: 1) mobile menu  2) scroll reveal  3) active nav link
                 4) service buttons -> contact form  5) enquiry form
                 6) unknown #link -> 404 panel
         ================================================================== */
      (function () {
        "use strict";

        /* ---------- 1. Mobile menu ---------- */
        var toggle = document.getElementById("menuToggle");
        var nav = document.getElementById("mainNav");
        toggle.addEventListener("click", function () {
          var open = nav.classList.toggle("open");
          toggle.setAttribute("aria-expanded", open ? "true" : "false");
          toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        });
        nav.addEventListener("click", function (e) {
          if (e.target.closest("a")) {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
          }
        });

        /* ---------- 2. Scroll reveal (respects reduced motion via CSS) ---------- */
        var revealEls = document.querySelectorAll(".reveal");
        if ("IntersectionObserver" in window) {
          var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.12 });
          revealEls.forEach(function (el) { revealObserver.observe(el); });
        } else {
          revealEls.forEach(function (el) { el.classList.add("visible"); });
        }

        /* ---------- 3. Highlight the nav link for the section in view ---------- */
        var navLinks = document.querySelectorAll("[data-nav]");
        var sections = ["home", "about", "founder", "services", "work", "contact"]
          .map(function (id) { return document.getElementById(id); })
          .filter(Boolean);
        if ("IntersectionObserver" in window && sections.length) {
          var navObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                navLinks.forEach(function (link) {
                  link.classList.toggle("active", link.getAttribute("data-nav") === entry.target.id);
                });
              }
            });
          }, { rootMargin: "-40% 0px -55% 0px" });
          sections.forEach(function (s) { navObserver.observe(s); });
        }

        /* ---------- 4. Service buttons pre-select the contact form ---------- */
        var serviceSelect = document.getElementById("fService");
        document.querySelectorAll("[data-service]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            var value = btn.getAttribute("data-service").replace(/&amp;/g, "&");
            for (var i = 0; i < serviceSelect.options.length; i++) {
              if (serviceSelect.options[i].value.replace(/&amp;/g, "&") === value) {
                serviceSelect.selectedIndex = i;
                break;
              }
            }
            document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
            setTimeout(function () { document.getElementById("fName").focus({ preventScroll: true }); }, 600);
          });
        });

        /* ---------- 5. Enquiry form: validation + success state ---------- */
        /* TODO: form endpoint — the form is currently FRONT-END ONLY:
           on submit it validates and shows the success panel, but does
           NOT send the enquiry anywhere yet. To receive enquiries by
           email, point this submit handler at a form endpoint
           (e.g. Formspree / Web3Forms / your own API) once ZENTRO's
           business email is confirmed. */
        var form = document.getElementById("enquiryForm");
        var success = document.getElementById("formSuccess");

        function setValidity(input, ok) {
          input.closest(".field").classList.toggle("invalid", !ok);
          return ok;
        }
        function validateField(input) {
          var v = input.value.trim();
          if (input.id === "fEmail") return setValidity(input, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
          if (input.id === "fMessage") return setValidity(input, v.length >= 20);
          if (input.required) return setValidity(input, v.length > 0);
          return true;
        }
        ["fName", "fEmail", "fService", "fMessage"].forEach(function (id) {
          var el = document.getElementById(id);
          el.addEventListener("blur", function () { validateField(el); });
          el.addEventListener("input", function () { el.closest(".field").classList.remove("invalid"); });
          el.addEventListener("change", function () { el.closest(".field").classList.remove("invalid"); });
        });

        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var ok = ["fName", "fEmail", "fService", "fMessage"]
            .map(function (id) { return validateField(document.getElementById(id)); })
            .every(Boolean);
          if (!ok) {
            var firstInvalid = form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea");
            if (firstInvalid) firstInvalid.focus();
            return;
          }
          var name = document.getElementById("fName").value.trim();
          var business = document.getElementById("fBusiness").value.trim();
          var email = document.getElementById("fEmail").value.trim();
          var phone = document.getElementById("fPhone").value.trim();
          var service = serviceSelect.options[serviceSelect.selectedIndex].text;
          var message = document.getElementById("fMessage").value.trim();

          var lines = [
            "New project enquiry — ZENTRO Technologies",
            "Name: " + name,
            business ? "Business: " + business : null,
            "Email: " + email,
            phone ? "Phone: " + phone : null,
            "Interested in: " + service,
            "",
            message
          ].filter(function (l) { return l !== null; });

          document.getElementById("successTitle").textContent = "Thank you, " + name.split(" ")[0] + ".";
          document.getElementById("successSummary").textContent = lines.join("\n");
          form.style.display = "none";
          success.classList.add("show");
          success.focus();
          success.scrollIntoView({ behavior: "smooth", block: "center" });

          document.getElementById("copyEnquiryBtn").onclick = function () {
            var note = document.getElementById("copyNote");
            function done() { note.textContent = "Copied — your enquiry text is on your clipboard."; }
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(lines.join("\n")).then(done, function () { note.textContent = "Copy didn't work in this browser — you can select the text above and copy it manually."; });
            } else {
              note.textContent = "You can select the text above and copy it manually.";
            }
          };
          document.getElementById("newEnquiryBtn").onclick = function () {
            form.reset();
            success.classList.remove("show");
            form.style.display = "";
            document.getElementById("copyNote").textContent = "";
            document.getElementById("fName").focus();
          };
        });

        /* ---------- 6. Unknown #link -> show the not-found panel ---------- */
        function checkHash() {
          var panel = document.getElementById("notFound");
          var hash = window.location.hash;
          if (hash && hash.length > 1 && !document.querySelector(hash)) {
            panel.classList.add("show");
            panel.scrollIntoView();
          } else {
            panel.classList.remove("show");
          }
        }
        window.addEventListener("hashchange", checkHash);
        checkHash();
      })();
