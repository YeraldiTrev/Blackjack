const Game = (() => { "use strict"; let e = []; const t = ["C", "D", "H", "S"], r = ["A", "J", "Q", "K"]; let n = []; const l = document.querySelector("#btnTake"), s = document.querySelector("#btnNew"), o = document.querySelector("#btnStop"), d = document.querySelectorAll(".divCards"), c = document.querySelectorAll("small"), a = (t = 2) => { e = i(), n = []; for (let e = 0; e < t; e++)n.push(0); c.forEach(e => e.innerText = 0), d.forEach(e => e.innerText = ""), l.disabled = !1, o.disabled = !1 }, i = () => { e = []; for (let r = 2; r <= 10; r++)for (let n of t) e.push(r + n); for (let n of t) for (let t of r) e.push(t + n); return _.shuffle(e) }, u = () => { if (0 === e.length) throw "There are no cards in the deck"; return e.pop() }, b = (e, t) => (n[t] += (e => { const t = e.substring(0, e.length - 1); return isNaN(t) ? "A" === t ? 11 : 10 : 1 * t })(e), c[t].innerHTML = "<b>" + n[t] + "</b>", n[t]), h = (e, t) => { const r = document.createElement("img"); r.src = `assets/cartas/${e}.png`, r.classList.add("cards"), d[t].append(r) }, m = e => { let t = 0; do { const e = u(); t = b(e, n.length - 1), h(e, n.length - 1) } while (t < e && e <= 21); (() => { const [e, t] = n; setTimeout(() => { t === e ? alert("Tie") : e > 21 ? alert("Computer Won") : t > 21 ? alert("Player 1 Won") : alert("Computer Won") }, 100) })() }; return l.addEventListener("click", () => { const e = u(), t = b(e, 0); h(e, 0), t > 21 ? (l.disabled = !0, o.disabled = !0, m(t)) : 21 === t && (l.disabled = !0, o.disabled = !0, m(t)) }), o.addEventListener("click", () => { l.disabled = !0, o.disabled = !0, m(n[0]) }), s.addEventListener("click", () => { a() }), { newGame: a } })();