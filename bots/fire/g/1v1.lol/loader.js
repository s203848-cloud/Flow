function showAds(){/* No ads here */}
function hideAds(){/* No ads here */}
function onUnityReady(){/* Nothing */}
var UnityLoader = UnityLoader || {
  Compression: {
    identity: {
      require: function () {
        return {}
      }, decompress: function (e) {
        return e
      }
    }, gzip: {
      require: function (e) {
        var t = {
          "inflate.js": function (e, t, r) {
            "use strict";

            function n(e) {
              if (!(this instanceof n)) return new n(e);
              this.options = s.assign({chunkSize: 16384, windowBits: 0, to: ""}, e || {});
              var t = this.options;
              t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && 0 === (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new c, this.strm.avail_out = 0;
              var r = a.inflateInit2(this.strm, t.windowBits);
              if (r !== l.Z_OK) throw new Error(u[r]);
              this.header = new f, a.inflateGetHeader(this.strm, this.header)
            }

            function o(e, t) {
              var r = new n(t);
              if (r.push(e, !0), r.err) throw r.msg || u[r.err];
              return r.result
            }

            function i(e, t) {
              return t = t || {}, t.raw = !0, o(e, t)
            }

            var a = e("./zlib/inflate"), s = e("./utils/common"), d = e("./utils/strings"), l = e("./zlib/constants"),
              u = e("./zlib/messages"), c = e("./zlib/zstream"), f = e("./zlib/gzheader"),
              h = Object.prototype.toString;
            n.prototype.push = function (e, t) {
              var r, n, o, i, u, c, f = this.strm, p = this.options.chunkSize, m = this.options.dictionary, w = !1;
              if (this.ended) return !1;
              n = t === ~~t ? t : t === !0 ? l.Z_FINISH : l.Z_NO_FLUSH, "string" == typeof e ? f.input = d.binstring2buf(e) : "[object ArrayBuffer]" === h.call(e) ? f.input = new Uint8Array(e) : f.input = e, f.next_in = 0, f.avail_in = f.input.length;
              do {
                if (0 === f.avail_out && (f.output = new s.Buf8(p), f.next_out = 0, f.avail_out = p), r = a.inflate(f, l.Z_NO_FLUSH), r === l.Z_NEED_DICT && m && (c = "string" == typeof m ? d.string2buf(m) : "[object ArrayBuffer]" === h.call(m) ? new Uint8Array(m) : m, r = a.inflateSetDictionary(this.strm, c)), r === l.Z_BUF_ERROR && w === !0 && (r = l.Z_OK, w = !1), r !== l.Z_STREAM_END && r !== l.Z_OK) return this.onEnd(r), this.ended = !0, !1;
                f.next_out && (0 !== f.avail_out && r !== l.Z_STREAM_END && (0 !== f.avail_in || n !== l.Z_FINISH && n !== l.Z_SYNC_FLUSH) || ("string" === this.options.to ? (o = d.utf8border(f.output, f.next_out), i = f.next_out - o, u = d.buf2string(f.output, o), f.next_out = i, f.avail_out = p - i, i && s.arraySet(f.output, f.output, o, i, 0), this.onData(u)) : this.onData(s.shrinkBuf(f.output, f.next_out)))), 0 === f.avail_in && 0 === f.avail_out && (w = !0)
              } while ((f.avail_in > 0 || 0 === f.avail_out) && r !== l.Z_STREAM_END);
              return r === l.Z_STREAM_END && (n = l.Z_FINISH), n === l.Z_FINISH ? (r = a.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === l.Z_OK) : n !== l.Z_SYNC_FLUSH || (this.onEnd(l.Z_OK), f.avail_out = 0, !0)
            }, n.prototype.onData = function (e) {
              this.chunks.push(e)
            }, n.prototype.onEnd = function (e) {
              e === l.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
            }, r.Inflate = n, r.inflate = o, r.inflateRaw = i, r.ungzip = o
          }, "utils/common.js": function (e, t, r) {
            "use strict";
            var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
            r.assign = function (e) {
              for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
                var r = t.shift();
                if (r) {
                  if ("object" != typeof r) throw new TypeError(r + "must be non-object");
                  for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n])
                }
              }
              return e
            }, r.shrinkBuf = function (e, t) {
              return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e)
            };
            var o = {
              arraySet: function (e, t, r, n, o) {
                if (t.subarray && e.subarray) return void e.set(t.subarray(r, r + n), o);
                for (var i = 0; i < n; i++) e[o + i] = t[r + i]
              }, flattenChunks: function (e) {
                var t, r, n, o, i, a;
                for (n = 0, t = 0, r = e.length; t < r; t++) n += e[t].length;
                for (a = new Uint8Array(n), o = 0, t = 0, r = e.length; t < r; t++) i = e[t], a.set(i, o), o += i.length;
                return a
              }
            }, i = {
              arraySet: function (e, t, r, n, o) {
                for (var i = 0; i < n; i++) e[o + i] = t[r + i]
              }, flattenChunks: function (e) {
                return [].concat.apply([], e)
              }
            };
            r.setTyped = function (e) {
              e ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, o)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, i))
            }, r.setTyped(n)
          }, "utils/strings.js": function (e, t, r) {
            "use strict";

            function n(e, t) {
              if (t < 65537 && (e.subarray && a || !e.subarray && i)) return String.fromCharCode.apply(null, o.shrinkBuf(e, t));
              for (var r = "", n = 0; n < t; n++) r += String.fromCharCode(e[n]);
              return r
            }

            var o = e("./common"), i = !0, a = !0;
            try {
              String.fromCharCode.apply(null, [0])
            } catch (e) {
              i = !1
            }
            try {
              String.fromCharCode.apply(null, new Uint8Array(1))
            } catch (e) {
              a = !1
            }
            for (var s = new o.Buf8(256), d = 0; d < 256; d++) s[d] = d >= 252 ? 6 : d >= 248 ? 5 : d >= 240 ? 4 : d >= 224 ? 3 : d >= 192 ? 2 : 1;
            s[254] = s[254] = 1, r.string2buf = function (e) {
              var t, r, n, i, a, s = e.length, d = 0;
              for (i = 0; i < s; i++) r = e.charCodeAt(i), 55296 === (64512 & r) && i + 1 < s && (n = e.charCodeAt(i + 1), 56320 === (64512 & n) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++)), d += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
              for (t = new o.Buf8(d), a = 0, i = 0; a < d; i++) r = e.charCodeAt(i), 55296 === (64512 & r) && i + 1 < s && (n = e.charCodeAt(i + 1), 56320 === (64512 & n) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++)), r < 128 ? t[a++] = r : r < 2048 ? (t[a++] = 192 | r >>> 6, t[a++] = 128 | 63 & r) : r < 65536 ? (t[a++] = 224 | r >>> 12, t[a++] = 128 | r >>> 6 & 63, t[a++] = 128 | 63 & r) : (t[a++] = 240 | r >>> 18, t[a++] = 128 | r >>> 12 & 63, t[a++] = 128 | r >>> 6 & 63, t[a++] = 128 | 63 & r);
              return t
            }, r.buf2binstring = function (e) {
              return n(e, e.length)
            }, r.binstring2buf = function (e) {
              for (var t = new o.Buf8(e.length), r = 0, n = t.length; r < n; r++) t[r] = e.charCodeAt(r);
              return t
            }, r.buf2string = function (e, t) {
              var r, o, i, a, d = t || e.length, l = new Array(2 * d);
              for (o = 0, r = 0; r < d;) if (i = e[r++], i < 128) l[o++] = i; else if (a = s[i], a > 4) l[o++] = 65533, r += a - 1; else {
                for (i &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && r < d;) i = i << 6 | 63 & e[r++], a--;
                a > 1 ? l[o++] = 65533 : i < 65536 ? l[o++] = i : (i -= 65536, l[o++] = 55296 | i >> 10 & 1023, l[o++] = 56320 | 1023 & i)
              }
              return n(l, o)
            }, r.utf8border = function (e, t) {
              var r;
              for (t = t || e.length, t > e.length && (t = e.length), r = t - 1; r >= 0 && 128 === (192 & e[r]);) r--;
              return r < 0 ? t : 0 === r ? t : r + s[e[r]] > t ? r : t
            }
          }, "zlib/inflate.js": function (e, t, r) {
            "use strict";

            function n(e) {
              return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
            }

            function o() {
              this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new y.Buf16(320), this.work = new y.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
            }

            function i(e) {
              var t;
              return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = P, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new y.Buf32(me), t.distcode = t.distdyn = new y.Buf32(we), t.sane = 1, t.back = -1, M) : R
            }

            function a(e) {
              var t;
              return e && e.state ? (t = e.state, t.wsize = 0, t.whave = 0, t.wnext = 0, i(e)) : R
            }

            function s(e, t) {
              var r, n;
              return e && e.state ? (n = e.state, t < 0 ? (r = 0, t = -t) : (r = (t >> 4) + 1, t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? R : (null !== n.window && n.wbits !== t && (n.window = null), n.wrap = r, n.wbits = t, a(e))) : R
            }

            function d(e, t) {
              var r, n;
              return e ? (n = new o, e.state = n, n.window = null, r = s(e, t), r !== M && (e.state = null), r) : R
            }

            function l(e) {
              return d(e, ye)
            }

            function u(e) {
              if (ge) {
                var t;
                for (w = new y.Buf32(512), b = new y.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
                for (; t < 256;) e.lens[t++] = 9;
                for (; t < 280;) e.lens[t++] = 7;
                for (; t < 288;) e.lens[t++] = 8;
                for (U(E, e.lens, 0, 288, w, 0, e.work, {bits: 9}), t = 0; t < 32;) e.lens[t++] = 5;
                U(k, e.lens, 0, 32, b, 0, e.work, {bits: 5}), ge = !1
              }
              e.lencode = w, e.lenbits = 9, e.distcode = b, e.distbits = 5
            }

            function c(e, t, r, n) {
              var o, i = e.state;
              return null === i.window && (i.wsize = 1 << i.wbits, i.wnext = 0, i.whave = 0, i.window = new y.Buf8(i.wsize)), n >= i.wsize ? (y.arraySet(i.window, t, r - i.wsize, i.wsize, 0), i.wnext = 0, i.whave = i.wsize) : (o = i.wsize - i.wnext, o > n && (o = n), y.arraySet(i.window, t, r - n, o, i.wnext), n -= o, n ? (y.arraySet(i.window, t, r - n, n, 0), i.wnext = n, i.whave = i.wsize) : (i.wnext += o, i.wnext === i.wsize && (i.wnext = 0), i.whave < i.wsize && (i.whave += o))), 0
            }

            function f(e, t) {
              var r, o, i, a, s, d, l, f, h, p, m, w, b, me, we, be, ye, ge, ve, Ae, Ue, xe, Ee, ke, Be = 0,
                Le = new y.Buf8(4), We = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
              if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return R;
              r = e.state, r.mode === j && (r.mode = X), s = e.next_out, i = e.output, l = e.avail_out, a = e.next_in, o = e.input, d = e.avail_in, f = r.hold, h = r.bits, p = d, m = l, xe = M;
              e:for (; ;) switch (r.mode) {
                case P:
                  if (0 === r.wrap) {
                    r.mode = X;
                    break
                  }
                  for (; h < 16;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  if (2 & r.wrap && 35615 === f) {
                    r.check = 0, Le[0] = 255 & f, Le[1] = f >>> 8 & 255, r.check = v(r.check, Le, 2, 0), f = 0, h = 0, r.mode = T;
                    break
                  }
                  if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & f) << 8) + (f >> 8)) % 31) {
                    e.msg = "incorrect header check", r.mode = fe;
                    break
                  }
                  if ((15 & f) !== S) {
                    e.msg = "unknown compression method", r.mode = fe;
                    break
                  }
                  if (f >>>= 4, h -= 4, Ue = (15 & f) + 8, 0 === r.wbits) r.wbits = Ue; else if (Ue > r.wbits) {
                    e.msg = "invalid window size", r.mode = fe;
                    break
                  }
                  r.dmax = 1 << Ue, e.adler = r.check = 1, r.mode = 512 & f ? G : j, f = 0, h = 0;
                  break;
                case T:
                  for (; h < 16;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  if (r.flags = f, (255 & r.flags) !== S) {
                    e.msg = "unknown compression method", r.mode = fe;
                    break
                  }
                  if (57344 & r.flags) {
                    e.msg = "unknown header flags set", r.mode = fe;
                    break
                  }
                  r.head && (r.head.text = f >> 8 & 1), 512 & r.flags && (Le[0] = 255 & f, Le[1] = f >>> 8 & 255, r.check = v(r.check, Le, 2, 0)), f = 0, h = 0, r.mode = D;
                case D:
                  for (; h < 32;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  r.head && (r.head.time = f), 512 & r.flags && (Le[0] = 255 & f, Le[1] = f >>> 8 & 255, Le[2] = f >>> 16 & 255, Le[3] = f >>> 24 & 255, r.check = v(r.check, Le, 4, 0)), f = 0, h = 0, r.mode = F;
                case F:
                  for (; h < 16;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  r.head && (r.head.xflags = 255 & f, r.head.os = f >> 8), 512 & r.flags && (Le[0] = 255 & f, Le[1] = f >>> 8 & 255, r.check = v(r.check, Le, 2, 0)), f = 0, h = 0, r.mode = z;
                case z:
                  if (1024 & r.flags) {
                    for (; h < 16;) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    r.length = f, r.head && (r.head.extra_len = f), 512 & r.flags && (Le[0] = 255 & f, Le[1] = f >>> 8 & 255, r.check = v(r.check, Le, 2, 0)), f = 0, h = 0
                  } else r.head && (r.head.extra = null);
                  r.mode = V;
                case V:
                  if (1024 & r.flags && (w = r.length, w > d && (w = d), w && (r.head && (Ue = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), y.arraySet(r.head.extra, o, a, w, Ue)), 512 & r.flags && (r.check = v(r.check, o, w, a)), d -= w, a += w, r.length -= w), r.length)) break e;
                  r.length = 0, r.mode = q;
                case q:
                  if (2048 & r.flags) {
                    if (0 === d) break e;
                    w = 0;
                    do Ue = o[a + w++], r.head && Ue && r.length < 65536 && (r.head.name += String.fromCharCode(Ue)); while (Ue && w < d);
                    if (512 & r.flags && (r.check = v(r.check, o, w, a)), d -= w, a += w, Ue) break e
                  } else r.head && (r.head.name = null);
                  r.length = 0, r.mode = Z;
                case Z:
                  if (4096 & r.flags) {
                    if (0 === d) break e;
                    w = 0;
                    do Ue = o[a + w++], r.head && Ue && r.length < 65536 && (r.head.comment += String.fromCharCode(Ue)); while (Ue && w < d);
                    if (512 & r.flags && (r.check = v(r.check, o, w, a)), d -= w, a += w, Ue) break e
                  } else r.head && (r.head.comment = null);
                  r.mode = Y;
                case Y:
                  if (512 & r.flags) {
                    for (; h < 16;) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    if (f !== (65535 & r.check)) {
                      e.msg = "header crc mismatch", r.mode = fe;
                      break
                    }
                    f = 0, h = 0
                  }
                  r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), e.adler = r.check = 0, r.mode = j;
                  break;
                case G:
                  for (; h < 32;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  e.adler = r.check = n(f), f = 0, h = 0, r.mode = J;
                case J:
                  if (0 === r.havedict) return e.next_out = s, e.avail_out = l, e.next_in = a, e.avail_in = d, r.hold = f, r.bits = h, N;
                  e.adler = r.check = 1, r.mode = j;
                case j:
                  if (t === L || t === W) break e;
                case X:
                  if (r.last) {
                    f >>>= 7 & h, h -= 7 & h, r.mode = le;
                    break
                  }
                  for (; h < 3;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  switch (r.last = 1 & f, f >>>= 1, h -= 1, 3 & f) {
                    case 0:
                      r.mode = K;
                      break;
                    case 1:
                      if (u(r), r.mode = re, t === W) {
                        f >>>= 2, h -= 2;
                        break e
                      }
                      break;
                    case 2:
                      r.mode = $;
                      break;
                    case 3:
                      e.msg = "invalid block type", r.mode = fe
                  }
                  f >>>= 2, h -= 2;
                  break;
                case K:
                  for (f >>>= 7 & h, h -= 7 & h; h < 32;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  if ((65535 & f) !== (f >>> 16 ^ 65535)) {
                    e.msg = "invalid stored block lengths", r.mode = fe;
                    break
                  }
                  if (r.length = 65535 & f, f = 0, h = 0, r.mode = Q, t === W) break e;
                case Q:
                  r.mode = _;
                case _:
                  if (w = r.length) {
                    if (w > d && (w = d), w > l && (w = l), 0 === w) break e;
                    y.arraySet(i, o, a, w, s), d -= w, a += w, l -= w, s += w, r.length -= w;
                    break
                  }
                  r.mode = j;
                  break;
                case $:
                  for (; h < 14;) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  if (r.nlen = (31 & f) + 257, f >>>= 5, h -= 5, r.ndist = (31 & f) + 1, f >>>= 5, h -= 5, r.ncode = (15 & f) + 4, f >>>= 4, h -= 4, r.nlen > 286 || r.ndist > 30) {
                    e.msg = "too many length or distance symbols", r.mode = fe;
                    break
                  }
                  r.have = 0, r.mode = ee;
                case ee:
                  for (; r.have < r.ncode;) {
                    for (; h < 3;) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    r.lens[We[r.have++]] = 7 & f, f >>>= 3, h -= 3
                  }
                  for (; r.have < 19;) r.lens[We[r.have++]] = 0;
                  if (r.lencode = r.lendyn, r.lenbits = 7, Ee = {bits: r.lenbits}, xe = U(x, r.lens, 0, 19, r.lencode, 0, r.work, Ee), r.lenbits = Ee.bits, xe) {
                    e.msg = "invalid code lengths set", r.mode = fe;
                    break
                  }
                  r.have = 0, r.mode = te;
                case te:
                  for (; r.have < r.nlen + r.ndist;) {
                    for (; Be = r.lencode[f & (1 << r.lenbits) - 1], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(we <= h);) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    if (ye < 16) f >>>= we, h -= we, r.lens[r.have++] = ye; else {
                      if (16 === ye) {
                        for (ke = we + 2; h < ke;) {
                          if (0 === d) break e;
                          d--, f += o[a++] << h, h += 8
                        }
                        if (f >>>= we, h -= we, 0 === r.have) {
                          e.msg = "invalid bit length repeat", r.mode = fe;
                          break
                        }
                        Ue = r.lens[r.have - 1], w = 3 + (3 & f), f >>>= 2, h -= 2
                      } else if (17 === ye) {
                        for (ke = we + 3; h < ke;) {
                          if (0 === d) break e;
                          d--, f += o[a++] << h, h += 8
                        }
                        f >>>= we, h -= we, Ue = 0, w = 3 + (7 & f), f >>>= 3, h -= 3
                      } else {
                        for (ke = we + 7; h < ke;) {
                          if (0 === d) break e;
                          d--, f += o[a++] << h, h += 8
                        }
                        f >>>= we, h -= we, Ue = 0, w = 11 + (127 & f), f >>>= 7, h -= 7
                      }
                      if (r.have + w > r.nlen + r.ndist) {
                        e.msg = "invalid bit length repeat", r.mode = fe;
                        break
                      }
                      for (; w--;) r.lens[r.have++] = Ue
                    }
                  }
                  if (r.mode === fe) break;
                  if (0 === r.lens[256]) {
                    e.msg = "invalid code -- missing end-of-block", r.mode = fe;
                    break
                  }
                  if (r.lenbits = 9, Ee = {bits: r.lenbits}, xe = U(E, r.lens, 0, r.nlen, r.lencode, 0, r.work, Ee), r.lenbits = Ee.bits, xe) {
                    e.msg = "invalid literal/lengths set", r.mode = fe;
                    break
                  }
                  if (r.distbits = 6, r.distcode = r.distdyn, Ee = {bits: r.distbits}, xe = U(k, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, Ee), r.distbits = Ee.bits, xe) {
                    e.msg = "invalid distances set", r.mode = fe;
                    break
                  }
                  if (r.mode = re, t === W) break e;
                case re:
                  r.mode = ne;
                case ne:
                  if (d >= 6 && l >= 258) {
                    e.next_out = s, e.avail_out = l, e.next_in = a, e.avail_in = d, r.hold = f, r.bits = h, A(e, m), s = e.next_out, i = e.output, l = e.avail_out, a = e.next_in, o = e.input, d = e.avail_in, f = r.hold, h = r.bits, r.mode === j && (r.back = -1);
                    break
                  }
                  for (r.back = 0; Be = r.lencode[f & (1 << r.lenbits) - 1], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(we <= h);) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  if (be && 0 === (240 & be)) {
                    for (ge = we, ve = be, Ae = ye; Be = r.lencode[Ae + ((f & (1 << ge + ve) - 1) >> ge)], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(ge + we <= h);) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    f >>>= ge, h -= ge, r.back += ge
                  }
                  if (f >>>= we, h -= we, r.back += we, r.length = ye, 0 === be) {
                    r.mode = de;
                    break
                  }
                  if (32 & be) {
                    r.back = -1, r.mode = j;
                    break
                  }
                  if (64 & be) {
                    e.msg = "invalid literal/length code", r.mode = fe;
                    break
                  }
                  r.extra = 15 & be, r.mode = oe;
                case oe:
                  if (r.extra) {
                    for (ke = r.extra; h < ke;) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    r.length += f & (1 << r.extra) - 1, f >>>= r.extra, h -= r.extra, r.back += r.extra
                  }
                  r.was = r.length, r.mode = ie;
                case ie:
                  for (; Be = r.distcode[f & (1 << r.distbits) - 1], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(we <= h);) {
                    if (0 === d) break e;
                    d--, f += o[a++] << h, h += 8
                  }
                  if (0 === (240 & be)) {
                    for (ge = we, ve = be, Ae = ye; Be = r.distcode[Ae + ((f & (1 << ge + ve) - 1) >> ge)], we = Be >>> 24, be = Be >>> 16 & 255, ye = 65535 & Be, !(ge + we <= h);) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    f >>>= ge, h -= ge, r.back += ge
                  }
                  if (f >>>= we, h -= we, r.back += we, 64 & be) {
                    e.msg = "invalid distance code", r.mode = fe;
                    break
                  }
                  r.offset = ye, r.extra = 15 & be, r.mode = ae;
                case ae:
                  if (r.extra) {
                    for (ke = r.extra; h < ke;) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    r.offset += f & (1 << r.extra) - 1, f >>>= r.extra, h -= r.extra, r.back += r.extra
                  }
                  if (r.offset > r.dmax) {
                    e.msg = "invalid distance too far back", r.mode = fe;
                    break
                  }
                  r.mode = se;
                case se:
                  if (0 === l) break e;
                  if (w = m - l, r.offset > w) {
                    if (w = r.offset - w, w > r.whave && r.sane) {
                      e.msg = "invalid distance too far back", r.mode = fe;
                      break
                    }
                    w > r.wnext ? (w -= r.wnext, b = r.wsize - w) : b = r.wnext - w, w > r.length && (w = r.length), me = r.window
                  } else me = i, b = s - r.offset, w = r.length;
                  w > l && (w = l), l -= w, r.length -= w;
                  do i[s++] = me[b++]; while (--w);
                  0 === r.length && (r.mode = ne);
                  break;
                case de:
                  if (0 === l) break e;
                  i[s++] = r.length, l--, r.mode = ne;
                  break;
                case le:
                  if (r.wrap) {
                    for (; h < 32;) {
                      if (0 === d) break e;
                      d--, f |= o[a++] << h, h += 8
                    }
                    if (m -= l, e.total_out += m, r.total += m, m && (e.adler = r.check = r.flags ? v(r.check, i, m, s - m) : g(r.check, i, m, s - m)), m = l, (r.flags ? f : n(f)) !== r.check) {
                      e.msg = "incorrect data check", r.mode = fe;
                      break
                    }
                    f = 0, h = 0
                  }
                  r.mode = ue;
                case ue:
                  if (r.wrap && r.flags) {
                    for (; h < 32;) {
                      if (0 === d) break e;
                      d--, f += o[a++] << h, h += 8
                    }
                    if (f !== (4294967295 & r.total)) {
                      e.msg = "incorrect length check", r.mode = fe;
                      break
                    }
                    f = 0, h = 0
                  }
                  r.mode = ce;
                case ce:
                  xe = O;
                  break e;
                case fe:
                  xe = C;
                  break e;
                case he:
                  return I;
                case pe:
                default:
                  return R
              }
              return e.next_out = s, e.avail_out = l, e.next_in = a, e.avail_in = d, r.hold = f, r.bits = h, (r.wsize || m !== e.avail_out && r.mode < fe && (r.mode < le || t !== B)) && c(e, e.output, e.next_out, m - e.avail_out) ? (r.mode = he, I) : (p -= e.avail_in, m -= e.avail_out, e.total_in += p, e.total_out += m, r.total += m, r.wrap && m && (e.adler = r.check = r.flags ? v(r.check, i, m, e.next_out - m) : g(r.check, i, m, e.next_out - m)), e.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === j ? 128 : 0) + (r.mode === re || r.mode === Q ? 256 : 0), (0 === p && 0 === m || t === B) && xe === M && (xe = H), xe)
            }

            function h(e) {
              if (!e || !e.state) return R;
              var t = e.state;
              return t.window && (t.window = null), e.state = null, M
            }

            function p(e, t) {
              var r;
              return e && e.state ? (r = e.state, 0 === (2 & r.wrap) ? R : (r.head = t, t.done = !1, M)) : R
            }

            function m(e, t) {
              var r, n, o, i = t.length;
              return e && e.state ? (r = e.state, 0 !== r.wrap && r.mode !== J ? R : r.mode === J && (n = 1, n = g(n, t, i, 0), n !== r.check) ? C : (o = c(e, t, i, i)) ? (r.mode = he, I) : (r.havedict = 1, M)) : R
            }

            var w, b, y = e("../utils/common"), g = e("./adler32"), v = e("./crc32"), A = e("./inffast"),
              U = e("./inftrees"), x = 0, E = 1, k = 2, B = 4, L = 5, W = 6, M = 0, O = 1, N = 2, R = -2, C = -3,
              I = -4, H = -5, S = 8, P = 1, T = 2, D = 3, F = 4, z = 5, V = 6, q = 7, Z = 8, Y = 9, G = 10, J = 11,
              j = 12, X = 13, K = 14, Q = 15, _ = 16, $ = 17, ee = 18, te = 19, re = 20, ne = 21, oe = 22, ie = 23,
              ae = 24, se = 25, de = 26, le = 27, ue = 28, ce = 29, fe = 30, he = 31, pe = 32, me = 852, we = 592,
              be = 15, ye = be, ge = !0;
            r.inflateReset = a, r.inflateReset2 = s, r.inflateResetKeep = i, r.inflateInit = l, r.inflateInit2 = d, r.inflate = f, r.inflateEnd = h, r.inflateGetHeader = p, r.inflateSetDictionary = m, r.inflateInfo = "pako inflate (from Nodeca project)"
          }, "zlib/constants.js": function (e, t, r) {
            "use strict";
            t.exports = {
              Z_NO_FLUSH: 0,
              Z_PARTIAL_FLUSH: 1,
              Z_SYNC_FLUSH: 2,
              Z_FULL_FLUSH: 3,
              Z_FINISH: 4,
              Z_BLOCK: 5,
              Z_TREES: 6,
              Z_OK: 0,
              Z_STREAM_END: 1,
              Z_NEED_DICT: 2,
              Z_ERRNO: -1,
              Z_STREAM_ERROR: -2,
              Z_DATA_ERROR: -3,
              Z_BUF_ERROR: -5,
              Z_NO_COMPRESSION: 0,
              Z_BEST_SPEED: 1,
              Z_BEST_COMPRESSION: 9,
              Z_DEFAULT_COMPRESSION: -1,
              Z_FILTERED: 1,
              Z_HUFFMAN_ONLY: 2,
              Z_RLE: 3,
              Z_FIXED: 4,
              Z_DEFAULT_STRATEGY: 0,
              Z_BINARY: 0,
              Z_TEXT: 1,
              Z_UNKNOWN: 2,
              Z_DEFLATED: 8
            }
          }, "zlib/messages.js": function (e, t, r) {
            "use strict";
            t.exports = {
              2: "need dictionary",
              1: "stream end",
              0: "",
              "-1": "file error",
              "-2": "stream error",
              "-3": "data error",
              "-4": "insufficient memory",
              "-5": "buffer error",
              "-6": "incompatible version"
            }
          }, "zlib/zstream.js": function (e, t, r) {
            "use strict";

            function n() {
              this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
            }

            t.exports = n
          }, "zlib/gzheader.js": function (e, t, r) {
            "use strict";

            function n() {
              this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
            }

            t.exports = n
          }, "zlib/adler32.js": function (e, t, r) {
            "use strict";

            function n(e, t, r, n) {
              for (var o = 65535 & e | 0, i = e >>> 16 & 65535 | 0, a = 0; 0 !== r;) {
                a = r > 2e3 ? 2e3 : r, r -= a;
                do o = o + t[n++] | 0, i = i + o | 0; while (--a);
                o %= 65521, i %= 65521
              }
              return o | i << 16 | 0
            }

            t.exports = n
          }, "zlib/crc32.js": function (e, t, r) {
            "use strict";

            function n() {
              for (var e, t = [], r = 0; r < 256; r++) {
                e = r;
                for (var n = 0; n < 8; n++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                t[r] = e
              }
              return t
            }

            function o(e, t, r, n) {
              var o = i, a = n + r;
              e ^= -1;
              for (var s = n; s < a; s++) e = e >>> 8 ^ o[255 & (e ^ t[s])];
              return e ^ -1
            }

            var i = n();
            t.exports = o
          }, "zlib/inffast.js": function (e, t, r) {
            "use strict";
            var n = 30, o = 12;
            t.exports = function (e, t) {
              var r, i, a, s, d, l, u, c, f, h, p, m, w, b, y, g, v, A, U, x, E, k, B, L, W;
              r = e.state, i = e.next_in, L = e.input, a = i + (e.avail_in - 5), s = e.next_out, W = e.output, d = s - (t - e.avail_out), l = s + (e.avail_out - 257), u = r.dmax, c = r.wsize, f = r.whave, h = r.wnext, p = r.window, m = r.hold, w = r.bits, b = r.lencode, y = r.distcode, g = (1 << r.lenbits) - 1, v = (1 << r.distbits) - 1;
              e:do {
                w < 15 && (m += L[i++] << w, w += 8, m += L[i++] << w, w += 8), A = b[m & g];
                t:for (; ;) {
                  if (U = A >>> 24, m >>>= U, w -= U, U = A >>> 16 & 255, 0 === U) W[s++] = 65535 & A; else {
                    if (!(16 & U)) {
                      if (0 === (64 & U)) {
                        A = b[(65535 & A) + (m & (1 << U) - 1)];
                        continue t
                      }
                      if (32 & U) {
                        r.mode = o;
                        break e
                      }
                      e.msg = "invalid literal/length code", r.mode = n;
                      break e
                    }
                    x = 65535 & A, U &= 15, U && (w < U && (m += L[i++] << w, w += 8), x += m & (1 << U) - 1, m >>>= U, w -= U), w < 15 && (m += L[i++] << w, w += 8, m += L[i++] << w, w += 8), A = y[m & v];
                    r:for (; ;) {
                      if (U = A >>> 24, m >>>= U, w -= U, U = A >>> 16 & 255, !(16 & U)) {
                        if (0 === (64 & U)) {
                          A = y[(65535 & A) + (m & (1 << U) - 1)];
                          continue r
                        }
                        e.msg = "invalid distance code", r.mode = n;
                        break e
                      }
                      if (E = 65535 & A, U &= 15, w < U && (m += L[i++] << w, w += 8, w < U && (m += L[i++] << w, w += 8)), E += m & (1 << U) - 1, E > u) {
                        e.msg = "invalid distance too far back", r.mode = n;
                        break e
                      }
                      if (m >>>= U, w -= U, U = s - d, E > U) {
                        if (U = E - U, U > f && r.sane) {
                          e.msg = "invalid distance too far back", r.mode = n;
                          break e
                        }
                        if (k = 0, B = p, 0 === h) {
                          if (k += c - U, U < x) {
                            x -= U;
                            do W[s++] = p[k++]; while (--U);
                            k = s - E, B = W
                          }
                        } else if (h < U) {
                          if (k += c + h - U, U -= h, U < x) {
                            x -= U;
                            do W[s++] = p[k++]; while (--U);
                            if (k = 0, h < x) {
                              U = h, x -= U;
                              do W[s++] = p[k++]; while (--U);
                              k = s - E, B = W
                            }
                          }
                        } else if (k += h - U, U < x) {
                          x -= U;
                          do W[s++] = p[k++]; while (--U);
                          k = s - E, B = W
                        }
                        for (; x > 2;) W[s++] = B[k++], W[s++] = B[k++], W[s++] = B[k++], x -= 3;
                        x && (W[s++] = B[k++], x > 1 && (W[s++] = B[k++]))
                      } else {
                        k = s - E;
                        do W[s++] = W[k++], W[s++] = W[k++], W[s++] = W[k++], x -= 3; while (x > 2);
                        x && (W[s++] = W[k++], x > 1 && (W[s++] = W[k++]))
                      }
                      break
                    }
                  }
                  break
                }
              } while (i < a && s < l);
              x = w >> 3, i -= x, w -= x << 3, m &= (1 << w) - 1, e.next_in = i, e.next_out = s, e.avail_in = i < a ? 5 + (a - i) : 5 - (i - a), e.avail_out = s < l ? 257 + (l - s) : 257 - (s - l), r.hold = m, r.bits = w
            }
          }, "zlib/inftrees.js": function (e, t, r) {
            "use strict";
            var n = e("../utils/common"), o = 15, i = 852, a = 592, s = 0, d = 1, l = 2,
              u = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
              c = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
              f = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
              h = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
            t.exports = function (e, t, r, p, m, w, b, y) {
              var g, v, A, U, x, E, k, B, L, W = y.bits, M = 0, O = 0, N = 0, R = 0, C = 0, I = 0, H = 0, S = 0, P = 0,
                T = 0, D = null, F = 0, z = new n.Buf16(o + 1), V = new n.Buf16(o + 1), q = null, Z = 0;
              for (M = 0; M <= o; M++) z[M] = 0;
              for (O = 0; O < p; O++) z[t[r + O]]++;
              for (C = W, R = o; R >= 1 && 0 === z[R]; R--) ;
              if (C > R && (C = R), 0 === R) return m[w++] = 20971520, m[w++] = 20971520, y.bits = 1, 0;
              for (N = 1; N < R && 0 === z[N]; N++) ;
              for (C < N && (C = N), S = 1, M = 1; M <= o; M++) if (S <<= 1, S -= z[M], S < 0) return -1;
              if (S > 0 && (e === s || 1 !== R)) return -1;
              for (V[1] = 0, M = 1; M < o; M++) V[M + 1] = V[M] + z[M];
              for (O = 0; O < p; O++) 0 !== t[r + O] && (b[V[t[r + O]]++] = O);
              if (e === s ? (D = q = b, E = 19) : e === d ? (D = u, F -= 257, q = c, Z -= 257, E = 256) : (D = f, q = h, E = -1), T = 0, O = 0, M = N, x = w, I = C, H = 0, A = -1, P = 1 << C, U = P - 1, e === d && P > i || e === l && P > a) return 1;
              for (; ;) {
                k = M - H, b[O] < E ? (B = 0, L = b[O]) : b[O] > E ? (B = q[Z + b[O]], L = D[F + b[O]]) : (B = 96, L = 0), g = 1 << M - H, v = 1 << I, N = v;
                do v -= g, m[x + (T >> H) + v] = k << 24 | B << 16 | L | 0; while (0 !== v);
                for (g = 1 << M - 1; T & g;) g >>= 1;
                if (0 !== g ? (T &= g - 1, T += g) : T = 0, O++, 0 === --z[M]) {
                  if (M === R) break;
                  M = t[r + b[O]]
                }
                if (M > C && (T & U) !== A) {
                  for (0 === H && (H = C), x += N, I = M - H, S = 1 << I; I + H < R && (S -= z[I + H], !(S <= 0));) I++, S <<= 1;
                  if (P += 1 << I, e === d && P > i || e === l && P > a) return 1;
                  A = T & U, m[A] = C << 24 | I << 16 | x - w | 0
                }
              }
              return 0 !== T && (m[x + T] = M - H << 24 | 64 << 16 | 0), y.bits = C, 0
            }
          }
        };
        for (var r in t) t[r].folder = r.substring(0, r.lastIndexOf("/") + 1);
        var n = function (e) {
          var r = [];
          return e = e.split("/").every(function (e) {
            return ".." == e ? r.pop() : "." == e || "" == e || r.push(e)
          }) ? r.join("/") : null, e ? t[e] || t[e + ".js"] || t[e + "/index.js"] : null
        }, o = function (e, t) {
          return e ? n(e.folder + "node_modules/" + t) || o(e.parent, t) : null
        }, i = function (e, t) {
          var r = t.match(/^\//) ? null : e ? t.match(/^\.\.?\//) ? n(e.folder + t) : o(e, t) : n(t);
          if (!r) throw"module not found: " + t;
          return r.exports || (r.parent = e, r(i.bind(null, r), r, r.exports = {})), r.exports
        };
        return i(null, e)
      }, decompress: function (e) {
        this.exports || (this.exports = this.require("inflate.js"));
        try {
          return this.exports.inflate(e)
        } catch (e) {
        }
      }, hasUnityMarker: function (e) {
        var t = 10, r = "UnityWeb Compressed Content (gzip)";
        if (t > e.length || 31 != e[0] || 139 != e[1]) return !1;
        var n = e[3];
        if (4 & n) {
          if (t + 2 > e.length) return !1;
          if (t += 2 + e[t] + (e[t + 1] << 8), t > e.length) return !1
        }
        if (8 & n) {
          for (; t < e.length && e[t];) t++;
          if (t + 1 > e.length) return !1;
          t++
        }
        return 16 & n && String.fromCharCode.apply(null, e.subarray(t, t + r.length + 1)) == r + "\0"
      }
    }, brotli: {
      require: function (e) {
        var t = {
          "decompress.js": function (e, t, r) {
            t.exports = e("./dec/decode").BrotliDecompressBuffer
          }, "dec/bit_reader.js": function (e, t, r) {
            function n(e) {
              this.buf_ = new Uint8Array(i), this.input_ = e, this.reset()
            }

            const o = 4096, i = 8224, a = 8191,
              s = new Uint32Array([0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215]);
            n.READ_SIZE = o, n.IBUF_MASK = a, n.prototype.reset = function () {
              this.buf_ptr_ = 0, this.val_ = 0, this.pos_ = 0, this.bit_pos_ = 0, this.bit_end_pos_ = 0, this.eos_ = 0, this.readMoreInput();
              for (var e = 0; e < 4; e++) this.val_ |= this.buf_[this.pos_] << 8 * e, ++this.pos_;
              return this.bit_end_pos_ > 0
            }, n.prototype.readMoreInput = function () {
              if (!(this.bit_end_pos_ > 256)) if (this.eos_) {
                if (this.bit_pos_ > this.bit_end_pos_) throw new Error("Unexpected end of input " + this.bit_pos_ + " " + this.bit_end_pos_)
              } else {
                var e = this.buf_ptr_, t = this.input_.read(this.buf_, e, o);
                if (t < 0) throw new Error("Unexpected end of input");
                if (t < o) {
                  this.eos_ = 1;
                  for (var r = 0; r < 32; r++) this.buf_[e + t + r] = 0
                }
                if (0 === e) {
                  for (var r = 0; r < 32; r++) this.buf_[8192 + r] = this.buf_[r];
                  this.buf_ptr_ = o
                } else this.buf_ptr_ = 0;
                this.bit_end_pos_ += t << 3
              }
            }, n.prototype.fillBitWindow = function () {
              for (; this.bit_pos_ >= 8;) this.val_ >>>= 8, this.val_ |= this.buf_[this.pos_ & a] << 24, ++this.pos_, this.bit_pos_ = this.bit_pos_ - 8 >>> 0, this.bit_end_pos_ = this.bit_end_pos_ - 8 >>> 0
            }, n.prototype.readBits = function (e) {
              32 - this.bit_pos_ < e && this.fillBitWindow();
              var t = this.val_ >>> this.bit_pos_ & s[e];
              return this.bit_pos_ += e, t
            }, t.exports = n
          }, "dec/context.js": function (e, t, r) {
            r.lookup = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 12, 16, 12, 12, 20, 12, 16, 24, 28, 12, 12, 32, 12, 36, 12, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 32, 32, 24, 40, 28, 12, 12, 48, 52, 52, 52, 48, 52, 52, 52, 48, 52, 52, 52, 52, 52, 48, 52, 52, 52, 52, 52, 48, 52, 52, 52, 52, 52, 24, 12, 28, 12, 12, 12, 56, 60, 60, 60, 56, 60, 60, 60, 56, 60, 60, 60, 60, 60, 56, 60, 60, 60, 60, 60, 56, 60, 60, 60, 60, 60, 24, 12, 28, 12, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 56, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 26, 26, 26, 26, 27, 27, 27, 27, 28, 28, 28, 28, 29, 29, 29, 29, 30, 30, 30, 30, 31, 31, 31, 31, 32, 32, 32, 32, 33, 33, 33, 33, 34, 34, 34, 34, 35, 35, 35, 35, 36, 36, 36, 36, 37, 37, 37, 37, 38, 38, 38, 38, 39, 39, 39, 39, 40, 40, 40, 40, 41, 41, 41, 41, 42, 42, 42, 42, 43, 43, 43, 43, 44, 44, 44, 44, 45, 45, 45, 45, 46, 46, 46, 46, 47, 47, 47, 47, 48, 48, 48, 48, 49, 49, 49, 49, 50, 50, 50, 50, 51, 51, 51, 51, 52, 52, 52, 52, 53, 53, 53, 53, 54, 54, 54, 54, 55, 55, 55, 55, 56, 56, 56, 56, 57, 57, 57, 57, 58, 58, 58, 58, 59, 59, 59, 59, 60, 60, 60, 60, 61, 61, 61, 61, 62, 62, 62, 62, 63, 63, 63, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), r.lookupOffsets = new Uint16Array([1024, 1536, 1280, 1536, 0, 256, 768, 512])
          }, "dec/decode.js": function (e, t, r) {
            function n(e) {
              var t;
              return 0 === e.readBits(1) ? 16 : (t = e.readBits(3), t > 0 ? 17 + t : (t = e.readBits(3), t > 0 ? 8 + t : 17))
            }

            function o(e) {
              if (e.readBits(1)) {
                var t = e.readBits(3);
                return 0 === t ? 1 : e.readBits(t) + (1 << t)
              }
              return 0
            }

            function i() {
              this.meta_block_length = 0, this.input_end = 0, this.is_uncompressed = 0, this.is_metadata = !1
            }

            function a(e) {
              var t, r, n, o = new i;
              if (o.input_end = e.readBits(1), o.input_end && e.readBits(1)) return o;
              if (t = e.readBits(2) + 4, 7 === t) {
                if (o.is_metadata = !0, 0 !== e.readBits(1)) throw new Error("Invalid reserved bit");
                if (r = e.readBits(2), 0 === r) return o;
                for (n = 0; n < r; n++) {
                  var a = e.readBits(8);
                  if (n + 1 === r && r > 1 && 0 === a) throw new Error("Invalid size byte");
                  o.meta_block_length |= a << 8 * n
                }
              } else for (n = 0; n < t; ++n) {
                var s = e.readBits(4);
                if (n + 1 === t && t > 4 && 0 === s) throw new Error("Invalid size nibble");
                o.meta_block_length |= s << 4 * n
              }
              return ++o.meta_block_length, o.input_end || o.is_metadata || (o.is_uncompressed = e.readBits(1)), o
            }

            function s(e, t, r) {
              var n;
              return r.fillBitWindow(), t += r.val_ >>> r.bit_pos_ & D, n = e[t].bits - T, n > 0 && (r.bit_pos_ += T, t += e[t].value, t += r.val_ >>> r.bit_pos_ & (1 << n) - 1), r.bit_pos_ += e[t].bits, e[t].value
            }

            function d(e, t, r, n) {
              for (var o = 0, i = N, a = 0, s = 0, d = 32768, l = [], u = 0; u < 32; u++) l.push(new B(0, 0));
              for (L(l, 0, 5, e, z); o < t && d > 0;) {
                var c, f = 0;
                if (n.readMoreInput(), n.fillBitWindow(), f += n.val_ >>> n.bit_pos_ & 31, n.bit_pos_ += l[f].bits, c = 255 & l[f].value, c < R) a = 0, r[o++] = c, 0 !== c && (i = c, d -= 32768 >> c); else {
                  var h, p, m = c - 14, w = 0;
                  if (c === R && (w = i), s !== w && (a = 0, s = w), h = a, a > 0 && (a -= 2, a <<= m), a += n.readBits(m) + 3, p = a - h, o + p > t) throw new Error("[ReadHuffmanCodeLengths] symbol + repeat_delta > num_symbols");
                  for (var b = 0; b < p; b++) r[o + b] = s;
                  o += p, 0 !== s && (d -= p << 15 - s)
                }
              }
              if (0 !== d) throw new Error("[ReadHuffmanCodeLengths] space = " + d);
              for (; o < t; o++) r[o] = 0
            }

            function l(e, t, r, n) {
              var o, i = 0, a = new Uint8Array(e);
              if (n.readMoreInput(), o = n.readBits(2), 1 === o) {
                for (var s, l = e - 1, u = 0, c = new Int32Array(4), f = n.readBits(2) + 1; l;) l >>= 1, ++u;
                for (s = 0; s < f; ++s) c[s] = n.readBits(u) % e, a[c[s]] = 2;
                switch (a[c[0]] = 1, f) {
                  case 1:
                    break;
                  case 3:
                    if (c[0] === c[1] || c[0] === c[2] || c[1] === c[2]) throw new Error("[ReadHuffmanCode] invalid symbols");
                    break;
                  case 2:
                    if (c[0] === c[1]) throw new Error("[ReadHuffmanCode] invalid symbols");
                    a[c[1]] = 1;
                    break;
                  case 4:
                    if (c[0] === c[1] || c[0] === c[2] || c[0] === c[3] || c[1] === c[2] || c[1] === c[3] || c[2] === c[3]) throw new Error("[ReadHuffmanCode] invalid symbols");
                    n.readBits(1) ? (a[c[2]] = 3, a[c[3]] = 3) : a[c[0]] = 2
                }
              } else {
                var s, h = new Uint8Array(z), p = 32, m = 0,
                  w = [new B(2, 0), new B(2, 4), new B(2, 3), new B(3, 2), new B(2, 0), new B(2, 4), new B(2, 3), new B(4, 1), new B(2, 0), new B(2, 4), new B(2, 3), new B(3, 2), new B(2, 0), new B(2, 4), new B(2, 3), new B(4, 5)];
                for (s = o; s < z && p > 0; ++s) {
                  var b, y = V[s], g = 0;
                  n.fillBitWindow(), g += n.val_ >>> n.bit_pos_ & 15,
                    n.bit_pos_ += w[g].bits, b = w[g].value, h[y] = b, 0 !== b && (p -= 32 >> b, ++m)
                }
                if (1 !== m && 0 !== p) throw new Error("[ReadHuffmanCode] invalid num_codes or space");
                d(h, e, a, n)
              }
              if (i = L(t, r, T, a, e), 0 === i) throw new Error("[ReadHuffmanCode] BuildHuffmanTable failed: ");
              return i
            }

            function u(e, t, r) {
              var n, o;
              return n = s(e, t, r), o = M.kBlockLengthPrefixCode[n].nbits, M.kBlockLengthPrefixCode[n].offset + r.readBits(o)
            }

            function c(e, t, r) {
              var n;
              return e < q ? (r += Z[e], r &= 3, n = t[r] + Y[e]) : n = e - q + 1, n
            }

            function f(e, t) {
              for (var r = e[t], n = t; n; --n) e[n] = e[n - 1];
              e[0] = r
            }

            function h(e, t) {
              var r, n = new Uint8Array(256);
              for (r = 0; r < 256; ++r) n[r] = r;
              for (r = 0; r < t; ++r) {
                var o = e[r];
                e[r] = n[o], o && f(n, o)
              }
            }

            function p(e, t) {
              this.alphabet_size = e, this.num_htrees = t, this.codes = new Array(t + t * G[e + 31 >>> 5]), this.htrees = new Uint32Array(t)
            }

            function m(e, t) {
              var r, n, i, a = {num_htrees: null, context_map: null}, d = 0;
              t.readMoreInput();
              var u = a.num_htrees = o(t) + 1, c = a.context_map = new Uint8Array(e);
              if (u <= 1) return a;
              for (r = t.readBits(1), r && (d = t.readBits(4) + 1), n = [], i = 0; i < F; i++) n[i] = new B(0, 0);
              for (l(u + d, n, 0, t), i = 0; i < e;) {
                var f;
                if (t.readMoreInput(), f = s(n, 0, t), 0 === f) c[i] = 0, ++i; else if (f <= d) for (var p = 1 + (1 << f) + t.readBits(f); --p;) {
                  if (i >= e) throw new Error("[DecodeContextMap] i >= context_map_size");
                  c[i] = 0, ++i
                } else c[i] = f - d, ++i
              }
              return t.readBits(1) && h(c, e), a
            }

            function w(e, t, r, n, o, i, a) {
              var d, l = 2 * r, u = r, c = s(t, r * F, a);
              d = 0 === c ? o[l + (1 & i[u])] : 1 === c ? o[l + (i[u] - 1 & 1)] + 1 : c - 2, d >= e && (d -= e), n[r] = d, o[l + (1 & i[u])] = d, ++i[u]
            }

            function b(e, t, r, n, o, i) {
              var a, s = o + 1, d = r & o, l = i.pos_ & E.IBUF_MASK;
              if (t < 8 || i.bit_pos_ + (t << 3) < i.bit_end_pos_) for (; t-- > 0;) i.readMoreInput(), n[d++] = i.readBits(8), d === s && (e.write(n, s), d = 0); else {
                if (i.bit_end_pos_ < 32) throw new Error("[CopyUncompressedBlockToOutput] br.bit_end_pos_ < 32");
                for (; i.bit_pos_ < 32;) n[d] = i.val_ >>> i.bit_pos_, i.bit_pos_ += 8, ++d, --t;
                if (a = i.bit_end_pos_ - i.bit_pos_ >> 3, l + a > E.IBUF_MASK) {
                  for (var u = E.IBUF_MASK + 1 - l, c = 0; c < u; c++) n[d + c] = i.buf_[l + c];
                  a -= u, d += u, t -= u, l = 0
                }
                for (var c = 0; c < a; c++) n[d + c] = i.buf_[l + c];
                if (d += a, t -= a, d >= s) {
                  e.write(n, s), d -= s;
                  for (var c = 0; c < d; c++) n[c] = n[s + c]
                }
                for (; d + t >= s;) {
                  if (a = s - d, i.input_.read(n, d, a) < a) throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");
                  e.write(n, s), t -= a, d = 0
                }
                if (i.input_.read(n, d, t) < t) throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");
                i.reset()
              }
            }

            function y(e) {
              var t = e.bit_pos_ + 7 & -8, r = e.readBits(t - e.bit_pos_);
              return 0 == r
            }

            function g(e) {
              var t = new U(e), r = new E(t);
              n(r);
              var o = a(r);
              return o.meta_block_length
            }

            function v(e, t) {
              var r = new U(e);
              null == t && (t = g(e));
              var n = new Uint8Array(t), o = new x(n);
              return A(r, o), o.pos < o.buffer.length && (o.buffer = o.buffer.subarray(0, o.pos)), o.buffer
            }

            function A(e, t) {
              var r, i, d, f, h, g, v, A, U, x = 0, L = 0, N = 0, R = 0, T = [16, 15, 11, 4], D = 0, z = 0, V = 0,
                Z = [new p(0, 0), new p(0, 0), new p(0, 0)];
              const Y = 128 + E.READ_SIZE;
              U = new E(e), N = n(U), i = (1 << N) - 16, d = 1 << N, f = d - 1, h = new Uint8Array(d + Y + k.maxDictionaryWordLength), g = d, v = [], A = [];
              for (var G = 0; G < 3240; G++) v[G] = new B(0, 0), A[G] = new B(0, 0);
              for (; !L;) {
                var J, j, X, K, Q, _, $, ee, te, re = 0, ne = [1 << 28, 1 << 28, 1 << 28], oe = [0], ie = [1, 1, 1],
                  ae = [0, 1, 0, 1, 0, 1], se = [0], de = null, le = null, ue = null, ce = 0, fe = null, he = 0, pe = 0,
                  me = null, we = 0, be = 0, ye = 0;
                for (r = 0; r < 3; ++r) Z[r].codes = null, Z[r].htrees = null;
                U.readMoreInput();
                var ge = a(U);
                if (re = ge.meta_block_length, x + re > t.buffer.length) {
                  var ve = new Uint8Array(x + re);
                  ve.set(t.buffer), t.buffer = ve
                }
                if (L = ge.input_end, J = ge.is_uncompressed, ge.is_metadata) for (y(U); re > 0; --re) U.readMoreInput(), U.readBits(8); else if (0 !== re) if (J) U.bit_pos_ = U.bit_pos_ + 7 & -8, b(t, re, x, h, f, U), x += re; else {
                  for (r = 0; r < 3; ++r) ie[r] = o(U) + 1, ie[r] >= 2 && (l(ie[r] + 2, v, r * F, U), l(H, A, r * F, U), ne[r] = u(A, r * F, U), se[r] = 1);
                  for (U.readMoreInput(), j = U.readBits(2), X = q + (U.readBits(4) << j), K = (1 << j) - 1, Q = X + (48 << j), le = new Uint8Array(ie[0]), r = 0; r < ie[0]; ++r) U.readMoreInput(), le[r] = U.readBits(2) << 1;
                  var Ae = m(ie[0] << S, U);
                  _ = Ae.num_htrees, de = Ae.context_map;
                  var Ue = m(ie[2] << P, U);
                  for ($ = Ue.num_htrees, ue = Ue.context_map, Z[0] = new p(C, _), Z[1] = new p(I, ie[1]), Z[2] = new p(Q, $), r = 0; r < 3; ++r) Z[r].decode(U);
                  for (fe = 0, me = 0, ee = le[oe[0]], be = W.lookupOffsets[ee], ye = W.lookupOffsets[ee + 1], te = Z[1].htrees[0]; re > 0;) {
                    var xe, Ee, ke, Be, Le, We, Me, Oe, Ne, Re, Ce;
                    for (U.readMoreInput(), 0 === ne[1] && (w(ie[1], v, 1, oe, ae, se, U), ne[1] = u(A, F, U), te = Z[1].htrees[oe[1]]), --ne[1], xe = s(Z[1].codes, te, U), Ee = xe >> 6, Ee >= 2 ? (Ee -= 2, Me = -1) : Me = 0, ke = M.kInsertRangeLut[Ee] + (xe >> 3 & 7), Be = M.kCopyRangeLut[Ee] + (7 & xe), Le = M.kInsertLengthPrefixCode[ke].offset + U.readBits(M.kInsertLengthPrefixCode[ke].nbits), We = M.kCopyLengthPrefixCode[Be].offset + U.readBits(M.kCopyLengthPrefixCode[Be].nbits), z = h[x - 1 & f], V = h[x - 2 & f], Re = 0; Re < Le; ++Re) U.readMoreInput(), 0 === ne[0] && (w(ie[0], v, 0, oe, ae, se, U), ne[0] = u(A, 0, U), ce = oe[0] << S, fe = ce, ee = le[oe[0]], be = W.lookupOffsets[ee], ye = W.lookupOffsets[ee + 1]), Ne = W.lookup[be + z] | W.lookup[ye + V], he = de[fe + Ne], --ne[0], V = z, z = s(Z[0].codes, Z[0].htrees[he], U), h[x & f] = z, (x & f) === f && t.write(h, d), ++x;
                    if (re -= Le, re <= 0) break;
                    if (Me < 0) {
                      var Ne;
                      if (U.readMoreInput(), 0 === ne[2] && (w(ie[2], v, 2, oe, ae, se, U), ne[2] = u(A, 2160, U), pe = oe[2] << P, me = pe), --ne[2], Ne = 255 & (We > 4 ? 3 : We - 2), we = ue[me + Ne], Me = s(Z[2].codes, Z[2].htrees[we], U), Me >= X) {
                        var Ie, He, Se;
                        Me -= X, He = Me & K, Me >>= j, Ie = (Me >> 1) + 1, Se = (2 + (1 & Me) << Ie) - 4, Me = X + (Se + U.readBits(Ie) << j) + He
                      }
                    }
                    if (Oe = c(Me, T, D), Oe < 0) throw new Error("[BrotliDecompress] invalid distance");
                    if (R = x < i && R !== i ? x : i, Ce = x & f, Oe > R) {
                      if (!(We >= k.minDictionaryWordLength && We <= k.maxDictionaryWordLength)) throw new Error("Invalid backward reference. pos: " + x + " distance: " + Oe + " len: " + We + " bytes left: " + re);
                      var Se = k.offsetsByLength[We], Pe = Oe - R - 1, Te = k.sizeBitsByLength[We], De = (1 << Te) - 1,
                        Fe = Pe & De, ze = Pe >> Te;
                      if (Se += Fe * We, !(ze < O.kNumTransforms)) throw new Error("Invalid backward reference. pos: " + x + " distance: " + Oe + " len: " + We + " bytes left: " + re);
                      var Ve = O.transformDictionaryWord(h, Ce, Se, We, ze);
                      if (Ce += Ve, x += Ve, re -= Ve, Ce >= g) {
                        t.write(h, d);
                        for (var qe = 0; qe < Ce - g; qe++) h[qe] = h[g + qe]
                      }
                    } else {
                      if (Me > 0 && (T[3 & D] = Oe, ++D), We > re) throw new Error("Invalid backward reference. pos: " + x + " distance: " + Oe + " len: " + We + " bytes left: " + re);
                      for (Re = 0; Re < We; ++Re) h[x & f] = h[x - Oe & f], (x & f) === f && t.write(h, d), ++x, --re
                    }
                    z = h[x - 1 & f], V = h[x - 2 & f]
                  }
                  x &= 1073741823
                }
              }
              t.write(h, x & f)
            }

            var U = e("./streams").BrotliInput, x = e("./streams").BrotliOutput, E = e("./bit_reader"),
              k = e("./dictionary"), B = e("./huffman").HuffmanCode, L = e("./huffman").BrotliBuildHuffmanTable,
              W = e("./context"), M = e("./prefix"), O = e("./transform");
            const N = 8, R = 16, C = 256, I = 704, H = 26, S = 6, P = 2, T = 8, D = 255, F = 1080, z = 18,
              V = new Uint8Array([1, 2, 3, 4, 0, 5, 17, 6, 16, 7, 8, 9, 10, 11, 12, 13, 14, 15]), q = 16,
              Z = new Uint8Array([3, 2, 1, 0, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2]),
              Y = new Int8Array([0, 0, 0, 0, -1, 1, -2, 2, -3, 3, -1, 1, -2, 2, -3, 3]),
              G = new Uint16Array([256, 402, 436, 468, 500, 534, 566, 598, 630, 662, 694, 726, 758, 790, 822, 854, 886, 920, 952, 984, 1016, 1048, 1080]);
            p.prototype.decode = function (e) {
              var t, r, n = 0;
              for (t = 0; t < this.num_htrees; ++t) this.htrees[t] = n, r = l(this.alphabet_size, this.codes, n, e), n += r
            }, r.BrotliDecompressedSize = g, r.BrotliDecompressBuffer = v, r.BrotliDecompress = A, k.init()
          }, "dec/dictionary.js": function (e, t, r) {
            var n = e("./dictionary-browser");
            r.init = function () {
              r.dictionary = n.init()
            }, r.offsetsByLength = new Uint32Array([0, 0, 0, 0, 0, 4096, 9216, 21504, 35840, 44032, 53248, 63488, 74752, 87040, 93696, 100864, 104704, 106752, 108928, 113536, 115968, 118528, 119872, 121280, 122016]), r.sizeBitsByLength = new Uint8Array([0, 0, 0, 0, 10, 10, 11, 11, 10, 10, 10, 10, 10, 9, 9, 8, 7, 7, 8, 7, 7, 6, 6, 5, 5]), r.minDictionaryWordLength = 4, r.maxDictionaryWordLength = 24
          }, "dec/dictionary.bin.js": function (e, t, r) {
            t.exports = "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";
          }, "dec/dictionary-browser.js": function (e, t, r) {
            var n = e("base64-js");
            r.init = function () {
              var t = e("./decode").BrotliDecompressBuffer, r = n.toByteArray(e("./dictionary.bin.js"));
              return t(r)
            }
          }, "dec/huffman.js": function (e, t, r) {
            function n(e, t) {
              this.bits = e, this.value = t
            }

            function o(e, t) {
              for (var r = 1 << t - 1; e & r;) r >>= 1;
              return (e & r - 1) + r
            }

            function i(e, t, r, o, i) {
              do o -= r, e[t + o] = new n(i.bits, i.value); while (o > 0)
            }

            function a(e, t, r) {
              for (var n = 1 << t - r; t < s && (n -= e[t], !(n <= 0));) ++t, n <<= 1;
              return t - r
            }

            r.HuffmanCode = n;
            const s = 15;
            r.BrotliBuildHuffmanTable = function (e, t, r, d, l) {
              var u, c, f, h, p, m, w, b, y, g, v, A = t, U = new Int32Array(16), x = new Int32Array(16);
              for (v = new Int32Array(l), f = 0; f < l; f++) U[d[f]]++;
              for (x[1] = 0, c = 1; c < s; c++) x[c + 1] = x[c] + U[c];
              for (f = 0; f < l; f++) 0 !== d[f] && (v[x[d[f]]++] = f);
              if (b = r, y = 1 << b, g = y, 1 === x[s]) {
                for (h = 0; h < g; ++h) e[t + h] = new n(0, 65535 & v[0]);
                return g
              }
              for (h = 0, f = 0, c = 1, p = 2; c <= r; ++c, p <<= 1) for (; U[c] > 0; --U[c]) u = new n(255 & c, 65535 & v[f++]), i(e, t + h, p, y, u), h = o(h, c);
              for (w = g - 1, m = -1, c = r + 1, p = 2; c <= s; ++c, p <<= 1) for (; U[c] > 0; --U[c]) (h & w) !== m && (t += y, b = a(U, c, r), y = 1 << b, g += y, m = h & w, e[A + m] = new n(b + r & 255, t - A - m & 65535)), u = new n(c - r & 255, 65535 & v[f++]), i(e, t + (h >> r), p, y, u), h = o(h, c);
              return g
            }
          }, "dec/prefix.js": function (e, t, r) {
            function n(e, t) {
              this.offset = e, this.nbits = t
            }

            r.kBlockLengthPrefixCode = [new n(1, 2), new n(5, 2), new n(9, 2), new n(13, 2), new n(17, 3), new n(25, 3), new n(33, 3), new n(41, 3), new n(49, 4), new n(65, 4), new n(81, 4), new n(97, 4), new n(113, 5), new n(145, 5), new n(177, 5), new n(209, 5), new n(241, 6), new n(305, 6), new n(369, 7), new n(497, 8), new n(753, 9), new n(1265, 10), new n(2289, 11), new n(4337, 12), new n(8433, 13), new n(16625, 24)], r.kInsertLengthPrefixCode = [new n(0, 0), new n(1, 0), new n(2, 0), new n(3, 0), new n(4, 0), new n(5, 0), new n(6, 1), new n(8, 1), new n(10, 2), new n(14, 2), new n(18, 3), new n(26, 3), new n(34, 4), new n(50, 4), new n(66, 5), new n(98, 5), new n(130, 6), new n(194, 7), new n(322, 8), new n(578, 9), new n(1090, 10), new n(2114, 12), new n(6210, 14), new n(22594, 24)], r.kCopyLengthPrefixCode = [new n(2, 0), new n(3, 0), new n(4, 0), new n(5, 0), new n(6, 0), new n(7, 0), new n(8, 0), new n(9, 0), new n(10, 1), new n(12, 1), new n(14, 2), new n(18, 2), new n(22, 3), new n(30, 3), new n(38, 4), new n(54, 4), new n(70, 5), new n(102, 5), new n(134, 6), new n(198, 7), new n(326, 8), new n(582, 9), new n(1094, 10), new n(2118, 24)], r.kInsertRangeLut = [0, 0, 8, 8, 0, 16, 8, 16, 16], r.kCopyRangeLut = [0, 8, 0, 8, 16, 0, 16, 8, 16]
          }, "dec/streams.js": function (e, t, r) {
            function n(e) {
              this.buffer = e, this.pos = 0
            }

            function o(e) {
              this.buffer = e, this.pos = 0
            }

            n.prototype.read = function (e, t, r) {
              this.pos + r > this.buffer.length && (r = this.buffer.length - this.pos);
              for (var n = 0; n < r; n++) e[t + n] = this.buffer[this.pos + n];
              return this.pos += r, r
            }, r.BrotliInput = n, o.prototype.write = function (e, t) {
              if (this.pos + t > this.buffer.length) throw new Error("Output buffer is not large enough");
              return this.buffer.set(e.subarray(0, t), this.pos), this.pos += t, t
            }, r.BrotliOutput = o
          }, "dec/transform.js": function (e, t, r) {
            function n(e, t, r) {
              this.prefix = new Uint8Array(e.length), this.transform = t, this.suffix = new Uint8Array(r.length);
              for (var n = 0; n < e.length; n++) this.prefix[n] = e.charCodeAt(n);
              for (var n = 0; n < r.length; n++) this.suffix[n] = r.charCodeAt(n)
            }

            function o(e, t) {
              return e[t] < 192 ? (e[t] >= 97 && e[t] <= 122 && (e[t] ^= 32), 1) : e[t] < 224 ? (e[t + 1] ^= 32, 2) : (e[t + 2] ^= 5, 3)
            }

            var i = e("./dictionary");
            const a = 0, s = 1, d = 2, l = 3, u = 4, c = 5, f = 6, h = 7, p = 8, m = 9, w = 10, b = 11, y = 12, g = 13,
              v = 14, A = 15, U = 16, x = 17, E = 18, k = 20;
            var B = [new n("", a, ""), new n("", a, " "), new n(" ", a, " "), new n("", y, ""), new n("", w, " "), new n("", a, " the "), new n(" ", a, ""), new n("s ", a, " "), new n("", a, " of "), new n("", w, ""), new n("", a, " and "), new n("", g, ""), new n("", s, ""), new n(", ", a, " "), new n("", a, ", "), new n(" ", w, " "), new n("", a, " in "), new n("", a, " to "), new n("e ", a, " "), new n("", a, '"'), new n("", a, "."), new n("", a, '">'), new n("", a, "\n"), new n("", l, ""), new n("", a, "]"), new n("", a, " for "), new n("", v, ""), new n("", d, ""), new n("", a, " a "), new n("", a, " that "), new n(" ", w, ""), new n("", a, ". "), new n(".", a, ""), new n(" ", a, ", "), new n("", A, ""), new n("", a, " with "), new n("", a, "'"), new n("", a, " from "), new n("", a, " by "), new n("", U, ""), new n("", x, ""), new n(" the ", a, ""), new n("", u, ""), new n("", a, ". The "), new n("", b, ""), new n("", a, " on "), new n("", a, " as "), new n("", a, " is "), new n("", h, ""), new n("", s, "ing "), new n("", a, "\n\t"), new n("", a, ":"), new n(" ", a, ". "), new n("", a, "ed "), new n("", k, ""), new n("", E, ""), new n("", f, ""), new n("", a, "("), new n("", w, ", "), new n("", p, ""), new n("", a, " at "), new n("", a, "ly "), new n(" the ", a, " of "), new n("", c, ""), new n("", m, ""), new n(" ", w, ", "), new n("", w, '"'), new n(".", a, "("), new n("", b, " "), new n("", w, '">'), new n("", a, '="'), new n(" ", a, "."), new n(".com/", a, ""), new n(" the ", a, " of the "), new n("", w, "'"), new n("", a, ". This "), new n("", a, ","), new n(".", a, " "), new n("", w, "("), new n("", w, "."), new n("", a, " not "), new n(" ", a, '="'), new n("", a, "er "), new n(" ", b, " "), new n("", a, "al "), new n(" ", b, ""), new n("", a, "='"), new n("", b, '"'), new n("", w, ". "), new n(" ", a, "("), new n("", a, "ful "), new n(" ", w, ". "), new n("", a, "ive "), new n("", a, "less "), new n("", b, "'"), new n("", a, "est "), new n(" ", w, "."), new n("", b, '">'), new n(" ", a, "='"), new n("", w, ","), new n("", a, "ize "), new n("", b, "."), new n("\xc2\xa0", a, ""), new n(" ", a, ","), new n("", w, '="'), new n("", b, '="'), new n("", a, "ous "), new n("", b, ", "), new n("", w, "='"), new n(" ", w, ","), new n(" ", b, '="'), new n(" ", b, ", "), new n("", b, ","), new n("", b, "("), new n("", b, ". "), new n(" ", b, "."), new n("", b, "='"), new n(" ", b, ". "), new n(" ", w, '="'), new n(" ", b, "='"), new n(" ", w, "='")];
            r.kTransforms = B, r.kNumTransforms = B.length, r.transformDictionaryWord = function (e, t, r, n, a) {
              var s, d = B[a].prefix, l = B[a].suffix, u = B[a].transform, c = u < y ? 0 : u - 11, f = 0, h = t;
              c > n && (c = n);
              for (var p = 0; p < d.length;) e[t++] = d[p++];
              for (r += c, n -= c, u <= m && (n -= u), f = 0; f < n; f++) e[t++] = i.dictionary[r + f];
              if (s = t - n, u === w) o(e, s); else if (u === b) for (; n > 0;) {
                var g = o(e, s);
                s += g, n -= g
              }
              for (var v = 0; v < l.length;) e[t++] = l[v++];
              return t - h
            }
          }, "node_modules/base64-js/index.js": function (e, t, r) {
            "use strict";

            function n(e) {
              var t = e.length;
              if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
              return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0
            }

            function o(e) {
              return 3 * e.length / 4 - n(e)
            }

            function i(e) {
              var t, r, o, i, a, s, d = e.length;
              a = n(e), s = new c(3 * d / 4 - a), o = a > 0 ? d - 4 : d;
              var l = 0;
              for (t = 0, r = 0; t < o; t += 4, r += 3) i = u[e.charCodeAt(t)] << 18 | u[e.charCodeAt(t + 1)] << 12 | u[e.charCodeAt(t + 2)] << 6 | u[e.charCodeAt(t + 3)], s[l++] = i >> 16 & 255, s[l++] = i >> 8 & 255, s[l++] = 255 & i;
              return 2 === a ? (i = u[e.charCodeAt(t)] << 2 | u[e.charCodeAt(t + 1)] >> 4, s[l++] = 255 & i) : 1 === a && (i = u[e.charCodeAt(t)] << 10 | u[e.charCodeAt(t + 1)] << 4 | u[e.charCodeAt(t + 2)] >> 2, s[l++] = i >> 8 & 255, s[l++] = 255 & i), s
            }

            function a(e) {
              return l[e >> 18 & 63] + l[e >> 12 & 63] + l[e >> 6 & 63] + l[63 & e]
            }

            function s(e, t, r) {
              for (var n, o = [], i = t; i < r; i += 3) n = (e[i] << 16) + (e[i + 1] << 8) + e[i + 2], o.push(a(n));
              return o.join("")
            }

            function d(e) {
              for (var t, r = e.length, n = r % 3, o = "", i = [], a = 16383, d = 0, u = r - n; d < u; d += a) i.push(s(e, d, d + a > u ? u : d + a));
              return 1 === n ? (t = e[r - 1], o += l[t >> 2], o += l[t << 4 & 63], o += "==") : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], o += l[t >> 10], o += l[t >> 4 & 63], o += l[t << 2 & 63], o += "="), i.push(o), i.join("")
            }

            r.byteLength = o, r.toByteArray = i, r.fromByteArray = d;
            for (var l = [], u = [], c = "undefined" != typeof Uint8Array ? Uint8Array : Array, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = 0, p = f.length; h < p; ++h) l[h] = f[h], u[f.charCodeAt(h)] = h;
            u["-".charCodeAt(0)] = 62, u["_".charCodeAt(0)] = 63
          }
        };
        for (var r in t) t[r].folder = r.substring(0, r.lastIndexOf("/") + 1);
        var n = function (e) {
          var r = [];
          return e = e.split("/").every(function (e) {
            return ".." == e ? r.pop() : "." == e || "" == e || r.push(e)
          }) ? r.join("/") : null, e ? t[e] || t[e + ".js"] || t[e + "/index.js"] : null
        }, o = function (e, t) {
          return e ? n(e.folder + "node_modules/" + t) || o(e.parent, t) : null
        }, i = function (e, t) {
          var r = t.match(/^\//) ? null : e ? t.match(/^\.\.?\//) ? n(e.folder + t) : o(e, t) : n(t);
          if (!r) throw"module not found: " + t;
          return r.exports || (r.parent = e, r(i.bind(null, r), r, r.exports = {})), r.exports
        };
        return i(null, e)
      }, decompress: function (e) {
        this.exports || (this.exports = this.require("decompress.js"));
        try {
          return this.exports(e)
        } catch (e) {
        }
      }, hasUnityMarker: function (e) {
        var t = "UnityWeb Compressed Content (brotli)";
        if (!e.length) return !1;
        var r = 1 & e[0] ? 14 & e[0] ? 4 : 7 : 1, n = e[0] & (1 << r) - 1,
          o = 1 + (Math.log(t.length - 1) / Math.log(2) >> 3);
        if (commentOffset = r + 1 + 2 + 1 + 2 + (o << 3) + 7 >> 3, 17 == n || commentOffset > e.length) return !1;
        for (var i = n + (6 + (o << 4) + (t.length - 1 << 6) << r), a = 0; a < commentOffset; a++, i >>>= 8) if (e[a] != (255 & i)) return !1;
        return String.fromCharCode.apply(null, e.subarray(commentOffset, commentOffset + t.length)) == t
      }
    }, decompress: function (e, t) {
      var r = this.gzip.hasUnityMarker(e) ? this.gzip : this.brotli.hasUnityMarker(e) ? this.brotli : this.identity;
      if (this.serverSetupWarningEnabled && r != this.identity && (console.log("You can reduce your startup time if you configure your web server to host .unityweb files using " + (r == this.gzip ? "gzip" : "brotli") + " compression."), this.serverSetupWarningEnabled = !1), "function" != typeof t) return r.decompress(e);
      if (!r.worker) {
        var n = URL.createObjectURL(new Blob(["this.require = ", r.require.toString(), "; this.decompress = ", r.decompress.toString(), "; this.onmessage = ", function (e) {
          var t = {id: e.data.id, decompressed: this.decompress(e.data.compressed)};
          postMessage(t, t.decompressed ? [t.decompressed.buffer] : [])
        }.toString(), "; postMessage({ ready: true });"], {type: "text/javascript"}));
        r.worker = new Worker(n), r.worker.onmessage = function (e) {
          return e.data.ready ? void URL.revokeObjectURL(n) : (this.callbacks[e.data.id](e.data.decompressed), void delete this.callbacks[e.data.id])
        }, r.worker.callbacks = {}, r.worker.nextCallbackId = 0
      }
      var o = r.worker.nextCallbackId++;
      r.worker.callbacks[o] = t, r.worker.postMessage({id: o, compressed: e}, [e.buffer])
    }, serverSetupWarningEnabled: !0
  }, Cryptography: {
    crc32: function (e) {
      var t = UnityLoader.Cryptography.crc32.module;
      if (!t) {
        var r = new ArrayBuffer(16777216), n = function (e, t, r) {
          "use asm";
          var n = new e.Uint8Array(r);
          var o = new e.Uint32Array(r);

          function i(e, t) {
            e = e | 0;
            t = t | 0;
            var r = 0;
            for (r = o[1024 >> 2] | 0; t; e = e + 1 | 0, t = t - 1 | 0) r = o[(r & 255 ^ n[e]) << 2 >> 2] ^ r >>> 8 ^ 4278190080;
            o[1024 >> 2] = r
          }

          return {process: i}
        }({Uint8Array: Uint8Array, Uint32Array: Uint32Array}, null, r);
        t = UnityLoader.Cryptography.crc32.module = {
          buffer: r,
          HEAPU8: new Uint8Array(r),
          HEAPU32: new Uint32Array(r),
          process: n.process,
          crc32: 1024,
          data: 1028
        };
        for (var o = 0; o < 256; o++) {
          for (var i = 255 ^ o, a = 0; a < 8; a++) i = i >>> 1 ^ (1 & i ? 3988292384 : 0);
          t.HEAPU32[o] = i
        }
      }
      t.HEAPU32[t.crc32 >> 2] = 0;
      for (var s = 0; s < e.length;) {
        var d = Math.min(t.HEAPU8.length - t.data, e.length - s);
        t.HEAPU8.set(e.subarray(s, s + d), t.data), crc = t.process(t.data, d), s += d
      }
      var l = t.HEAPU32[t.crc32 >> 2];
      return new Uint8Array([l >> 24, l >> 16, l >> 8, l])
    }, md5: function (e) {
      var t = UnityLoader.Cryptography.md5.module;
      if (!t) {
        var r = new ArrayBuffer(16777216), n = function (e, t, r) {
          "use asm";
          var n = new e.Uint32Array(r);

          function o(e, t) {
            e = e | 0;
            t = t | 0;
            var r = 0, o = 0, i = 0, a = 0, s = 0, d = 0, l = 0, u = 0, c = 0, f = 0, h = 0, p = 0;
            r = n[128] | 0, o = n[129] | 0, i = n[130] | 0, a = n[131] | 0;
            for (; t; e = e + 64 | 0, t = t - 1 | 0) {
              s = r;
              d = o;
              l = i;
              u = a;
              for (f = 0; (f | 0) < 512; f = f + 8 | 0) {
                p = n[f >> 2] | 0;
                r = r + (n[f + 4 >> 2] | 0) + (n[e + (p >>> 14) >> 2] | 0) + ((f | 0) < 128 ? a ^ o & (i ^ a) : (f | 0) < 256 ? i ^ a & (o ^ i) : (f | 0) < 384 ? o ^ i ^ a : i ^ (o | ~a)) | 0;
                h = (r << (p & 31) | r >>> 32 - (p & 31)) + o | 0;
                r = a;
                a = i;
                i = o;
                o = h
              }
              r = r + s | 0;
              o = o + d | 0;
              i = i + l | 0;
              a = a + u | 0
            }
            n[128] = r;
            n[129] = o;
            n[130] = i;
            n[131] = a
          }

          return {process: o}
        }({Uint32Array: Uint32Array}, null, r);
        t = UnityLoader.Cryptography.md5.module = {
          buffer: r,
          HEAPU8: new Uint8Array(r),
          HEAPU32: new Uint32Array(r),
          process: n.process,
          md5: 512,
          data: 576
        }, t.HEAPU32.set(new Uint32Array([7, 3614090360, 65548, 3905402710, 131089, 606105819, 196630, 3250441966, 262151, 4118548399, 327692, 1200080426, 393233, 2821735955, 458774, 4249261313, 524295, 1770035416, 589836, 2336552879, 655377, 4294925233, 720918, 2304563134, 786439, 1804603682, 851980, 4254626195, 917521, 2792965006, 983062, 1236535329, 65541, 4129170786, 393225, 3225465664, 720910, 643717713, 20, 3921069994, 327685, 3593408605, 655369, 38016083, 983054, 3634488961, 262164, 3889429448, 589829, 568446438, 917513, 3275163606, 196622, 4107603335, 524308, 1163531501, 851973, 2850285829, 131081, 4243563512, 458766, 1735328473, 786452, 2368359562, 327684, 4294588738, 524299, 2272392833, 720912, 1839030562, 917527, 4259657740, 65540, 2763975236, 262155, 1272893353, 458768, 4139469664, 655383, 3200236656, 851972, 681279174, 11, 3936430074, 196624, 3572445317, 393239, 76029189, 589828, 3654602809, 786443, 3873151461, 983056, 530742520, 131095, 3299628645, 6, 4096336452, 458762, 1126891415, 917519, 2878612391, 327701, 4237533241, 786438, 1700485571, 196618, 2399980690, 655375, 4293915773, 65557, 2240044497, 524294, 1873313359, 983050, 4264355552, 393231, 2734768916, 851989, 1309151649, 262150, 4149444226, 720906, 3174756917, 131087, 718787259, 589845, 3951481745]))
      }
      t.HEAPU32.set(new Uint32Array([1732584193, 4023233417, 2562383102, 271733878]), t.md5 >> 2);
      for (var o = 0; o < e.length;) {
        var i = Math.min(t.HEAPU8.length - t.data, e.length - o) & -64;
        if (t.HEAPU8.set(e.subarray(o, o + i), t.data), o += i, t.process(t.data, i >> 6), e.length - o < 64) {
          if (i = e.length - o, t.HEAPU8.set(e.subarray(e.length - i, e.length), t.data), o += i, t.HEAPU8[t.data + i++] = 128, i > 56) {
            for (var a = i; a < 64; a++) t.HEAPU8[t.data + a] = 0;
            t.process(t.data, 1), i = 0
          }
          for (var a = i; a < 64; a++) t.HEAPU8[t.data + a] = 0;
          for (var s = e.length, d = 0, a = 56; a < 64; a++, d = (224 & s) >> 5, s /= 256) t.HEAPU8[t.data + a] = ((31 & s) << 3) + d;
          t.process(t.data, 1)
        }
      }
      return new Uint8Array(t.HEAPU8.subarray(t.md5, t.md5 + 16))
    }, sha1: function (e) {
      var t = UnityLoader.Cryptography.sha1.module;
      if (!t) {
        var r = new ArrayBuffer(16777216), n = function (e, t, r) {
          "use asm";
          var n = new e.Uint32Array(r);

          function o(e, t) {
            e = e | 0;
            t = t | 0;
            var r = 0, o = 0, i = 0, a = 0, s = 0, d = 0, l = 0, u = 0, c = 0, f = 0, h = 0, p = 0;
            r = n[80] | 0, o = n[81] | 0, i = n[82] | 0, a = n[83] | 0, s = n[84] | 0;
            for (; t; e = e + 64 | 0, t = t - 1 | 0) {
              d = r;
              l = o;
              u = i;
              c = a;
              f = s;
              for (p = 0; (p | 0) < 320; p = p + 4 | 0, s = a, a = i, i = o << 30 | o >>> 2, o = r, r = h) {
                if ((p | 0) < 64) {
                  h = n[e + p >> 2] | 0;
                  h = h << 24 & 4278190080 | h << 8 & 16711680 | h >>> 8 & 65280 | h >>> 24 & 255
                } else {
                  h = n[p - 12 >> 2] ^ n[p - 32 >> 2] ^ n[p - 56 >> 2] ^ n[p - 64 >> 2];
                  h = h << 1 | h >>> 31
                }
                n[p >> 2] = h;
                h = h + ((r << 5 | r >>> 27) + s) + ((p | 0) < 80 ? (o & i | ~o & a | 0) + 1518500249 | 0 : (p | 0) < 160 ? (o ^ i ^ a) + 1859775393 | 0 : (p | 0) < 240 ? (o & i | o & a | i & a) + 2400959708 | 0 : (o ^ i ^ a) + 3395469782 | 0) | 0
              }
              r = r + d | 0;
              o = o + l | 0;
              i = i + u | 0;
              a = a + c | 0;
              s = s + f | 0
            }
            n[80] = r;
            n[81] = o;
            n[82] = i;
            n[83] = a;
            n[84] = s
          }

          return {process: o}
        }({Uint32Array: Uint32Array}, null, r);
        t = UnityLoader.Cryptography.sha1.module = {
          buffer: r,
          HEAPU8: new Uint8Array(r),
          HEAPU32: new Uint32Array(r),
          process: n.process,
          sha1: 320,
          data: 384
        }
      }
      t.HEAPU32.set(new Uint32Array([1732584193, 4023233417, 2562383102, 271733878, 3285377520]), t.sha1 >> 2);
      for (var o = 0; o < e.length;) {
        var i = Math.min(t.HEAPU8.length - t.data, e.length - o) & -64;
        if (t.HEAPU8.set(e.subarray(o, o + i), t.data), o += i, t.process(t.data, i >> 6), e.length - o < 64) {
          if (i = e.length - o, t.HEAPU8.set(e.subarray(e.length - i, e.length), t.data), o += i, t.HEAPU8[t.data + i++] = 128, i > 56) {
            for (var a = i; a < 64; a++) t.HEAPU8[t.data + a] = 0;
            t.process(t.data, 1), i = 0
          }
          for (var a = i; a < 64; a++) t.HEAPU8[t.data + a] = 0;
          for (var s = e.length, d = 0, a = 63; a >= 56; a--, d = (224 & s) >> 5, s /= 256) t.HEAPU8[t.data + a] = ((31 & s) << 3) + d;
          t.process(t.data, 1)
        }
      }
      for (var l = new Uint8Array(20), a = 0; a < l.length; a++) l[a] = t.HEAPU8[t.sha1 + (a & -4) + 3 - (3 & a)];
      return l
    }
  }, Error: {
    init: function () {
      return Error.stackTraceLimit = 50, window.addEventListener("error", function (e) {
        var t = UnityLoader.Error.getModule(e);
        if (!t) return UnityLoader.Error.handler(e);
        var r = t.useWasm ? t.wasmSymbolsUrl : t.asmSymbolsUrl;
        if (!r) return UnityLoader.Error.handler(e, t);
        var n = new XMLHttpRequest;
        n.open("GET", t.resolveBuildUrl(r)), n.responseType = "arraybuffer", n.onload = function () {
          UnityLoader.loadCode(t, UnityLoader.Compression.decompress(new Uint8Array(n.response)), function (r) {
            t.demangleSymbol = UnityLoader[r](), UnityLoader.Error.handler(e, t)
          }, {isModularized: !1})
        }, n.send()
      }), !0
    }(),
    stackTraceFormat: navigator.userAgent.indexOf("Chrome") != -1 ? "(\\s+at\\s+)(([\\w\\d_\\.]*?)([\\w\\d_$]+)(/[\\w\\d_\\./]+|))(\\s+\\[.*\\]|)\\s*\\((blob:.*)\\)" : "(\\s*)(([\\w\\d_\\.]*?)([\\w\\d_$]+)(/[\\w\\d_\\./]+|))(\\s+\\[.*\\]|)\\s*@(blob:.*)",
    stackTraceFormatWasm: navigator.userAgent.indexOf("Chrome") != -1 ? "((\\s+at\\s*)\\s\\(<WASM>\\[(\\d+)\\]\\+\\d+\\))()" : "((\\s*)wasm-function\\[(\\d+)\\])@(blob:.*)",
    blobParseRegExp: new RegExp("^(blob:.*)(:\\d+:\\d+)$"),
    getModule: function (e) {
      var t = e.message.match(new RegExp(this.stackTraceFormat, "g"));
      for (var r in t) {
        var n = t[r].match(new RegExp("^" + this.stackTraceFormat + "$")), o = n[7].match(this.blobParseRegExp);
        if (o && UnityLoader.Blobs[o[1]] && UnityLoader.Blobs[o[1]].Module) return UnityLoader.Blobs[o[1]].Module
      }
    },
    demangle: function (e, t) {
      var r = e.message;
      return t ? (r = r.replace(new RegExp(this.stackTraceFormat, "g"), function (e) {
        var r = e.match(new RegExp("^" + this.stackTraceFormat + "$")), n = r[7].match(this.blobParseRegExp),
          o = t.demangleSymbol ? t.demangleSymbol(r[4]) : r[4],
          i = n && UnityLoader.Blobs[n[1]] && UnityLoader.Blobs[n[1]].url ? UnityLoader.Blobs[n[1]].url : "blob";
        return r[1] + o + (r[2] != o ? " [" + r[2] + "]" : "") + " (" + (n ? i.substr(i.lastIndexOf("/") + 1) + n[2] : r[7]) + ")"
      }.bind(this)), t.useWasm && (r = r.replace(new RegExp(this.stackTraceFormatWasm, "g"), function (e) {
        var r = e.match(new RegExp("^" + this.stackTraceFormatWasm + "$")),
          n = t.demangleSymbol ? t.demangleSymbol(r[3]) : r[3], o = r[4].match(this.blobParseRegExp),
          i = o && UnityLoader.Blobs[o[1]] && UnityLoader.Blobs[o[1]].url ? UnityLoader.Blobs[o[1]].url : "blob";
        return (n == r[3] ? r[1] : r[2] + n + " [wasm:" + r[3] + "]") + (r[4] ? " (" + (o ? i.substr(i.lastIndexOf("/") + 1) + o[2] : r[4]) + ")" : "")
      }.bind(this))), r) : r
    },
    handler: function (e, t) {
      var r = t ? this.demangle(e, t) : e.message;
      if (!(t && t.errorhandler && t.errorhandler(r, e.filename, e.lineno) || (console.log("Invoking error handler due to\n" + r), "function" == typeof dump && dump("Invoking error handler due to\n" + r), r.indexOf("UnknownError") != -1 || r.indexOf("Program terminated with exit(0)") != -1 || this.didShowErrorMessage))) {
        var r = "An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n" + r;
        r.indexOf("DISABLE_EXCEPTION_CATCHING") != -1 ? r = "An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace." : r.indexOf("Cannot enlarge memory arrays") != -1 ? r = "Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings." : r.indexOf("Invalid array buffer length") == -1 && r.indexOf("Invalid typed array length") == -1 && r.indexOf("out of memory") == -1 && r.indexOf("could not allocate memory") == -1 || (r = "The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."), alert(r), this.didShowErrorMessage = !0
      }
    },
    popup: function (e, t, r) {
      r = r || [{text: "OK"}];
      var n = document.createElement("div");
      n.style.cssText = "position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); text-align: center; border: 1px solid black; padding: 5px; background: #E8E8E8";
      var o = document.createElement("span");
      o.textContent = t, n.appendChild(o), n.appendChild(document.createElement("br"));
      for (var i = 0; i < r.length; i++) {
        var a = document.createElement("button");
        r[i].text && (a.textContent = r[i].text), r[i].callback && (a.onclick = r[i].callback), a.style.margin = "5px", a.addEventListener("click", function () {
          e.container.removeChild(n)
        }), n.appendChild(a)
      }
      e.container.appendChild(n)
    }
  }, Job: {
    schedule: function (e, t, r, n, o) {
      o = o || {};
      var i = e.Jobs[t];
      if (i || (i = e.Jobs[t] = {
        dependencies: {},
        dependants: {}
      }), i.callback) throw"[UnityLoader.Job.schedule] job '" + t + "' has been already scheduled";
      if ("function" != typeof n) throw"[UnityLoader.Job.schedule] job '" + t + "' has invalid callback";
      if ("object" != typeof o) throw"[UnityLoader.Job.schedule] job '" + t + "' has invalid parameters";
      i.callback = function (e, t) {
        i.starttime = performance.now(), n(e, t)
      }, i.parameters = o, i.complete = function (r) {
        i.endtime = performance.now(), i.result = {value: r};
        for (var n in i.dependants) {
          var o = e.Jobs[n];
          o.dependencies[t] = i.dependants[n] = !1;
          var a = "function" != typeof o.callback;
          for (var s in o.dependencies) a = a || o.dependencies[s];
          if (!a) {
            if (o.executed) throw"[UnityLoader.Job.schedule] job '" + t + "' has already been executed";
            o.executed = !0, setTimeout(o.callback.bind(null, e, o), 0)
          }
        }
      };
      var a = !1;
      r.forEach(function (r) {
        var n = e.Jobs[r];
        n || (n = e.Jobs[r] = {
          dependencies: {},
          dependants: {}
        }), (i.dependencies[r] = n.dependants[t] = !n.result) && (a = !0)
      }), a || (i.executed = !0, setTimeout(i.callback.bind(null, e, i), 0))
    }, result: function (e, t) {
      var r = e.Jobs[t];
      if (!r) throw"[UnityLoader.Job.result] job '" + t + "' does not exist";
      if ("object" != typeof r.result) throw"[UnityLoader.Job.result] job '" + t + "' has invalid result";
      return r.result.value
    }
  }, Progress: {
    Styles: {
      Dark: {
        progressLogoUrl: "data:image/png;base64,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",
        progressEmptyUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAASCAYAAABmbl0zAAAACXBIWXMAAAsSAAALEgHS3X78AAAATUlEQVRo3u3aIQ4AIAwEQUr4/5cPiyMVBDOj0M2mCKgkGdAwjYCudZzLOLiITYPrCdEgGkSDaEA0iAbRIBpEA6JBNHx1vnL7V4NNwxsbCNMGI3YImu0AAAAASUVORK5CYII=",
        progressFullUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAASCAYAAABmbl0zAAAACXBIWXMAAAsSAAALEgHS3X78AAAAO0lEQVRo3u3SQREAAAjDMMC/56EB3omEXjtJCg5GAkyDaTANpsE0YBpMg2kwDaYB02AaTINpMA2Yhr8FO18EIBpZMeQAAAAASUVORK5CYII="
      }, Light: {
        progressLogoUrl: "data:image/png;base64,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",
        progressEmptyUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAASCAYAAABmbl0zAAAACXBIWXMAAAsSAAALEgHS3X78AAAAUUlEQVRo3u3aMQ4AEAxAUcRJzGb3v1mt3cQglvcmc/NTA3XMFQUuNCPgVk/nahwchE2D6wnRIBpEg2hANIgG0SAaRAOiQTR8lV+5/avBpuGNDcz6A6oq1CgNAAAAAElFTkSuQmCC",
        progressFullUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAASCAYAAABmbl0zAAAACXBIWXMAAAsSAAALEgHS3X78AAAAQElEQVRo3u3SMREAMAgAsVIpnTvj3xlogDmR8PfxftaBgSsBpsE0mAbTYBowDabBNJgG04BpMA2mwTSYBkzDXgP/hgGnr4PpeAAAAABJRU5ErkJggg=="
      }
    }, handler: function (e, t) {
      if (e.Module) {
        var r = UnityLoader.Progress.Styles[e.Module.splashScreenStyle],
          n = e.Module.progressLogoUrl ? e.Module.resolveBuildUrl(e.Module.progressLogoUrl) : r.progressLogoUrl,
          o = e.Module.progressEmptyUrl ? e.Module.resolveBuildUrl(e.Module.progressEmptyUrl) : r.progressEmptyUrl,
          i = e.Module.progressFullUrl ? e.Module.resolveBuildUrl(e.Module.progressFullUrl) : r.progressFullUrl,
          a = "position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);";
        e.logo || (e.logo = document.createElement("div"), e.logo.style.cssText = a + "background: url('" + n + "') no-repeat center / contain; width: 154px; height: 130px;", e.container.appendChild(e.logo)), e.progress || (e.progress = document.createElement("div"), e.progress.style.cssText = a + " height: 18px; width: 141px; margin-top: 90px;", e.progress.empty = document.createElement("div"), e.progress.empty.style.cssText = "background: url('" + o + "') no-repeat right / cover; float: right; width: 100%; height: 100%; display: inline-block;", e.progress.appendChild(e.progress.empty), e.progress.full = document.createElement("div"), e.progress.full.style.cssText = "background: url('" + i + "') no-repeat left / cover; float: left; width: 0%; height: 100%; display: inline-block;", e.progress.appendChild(e.progress.full), e.container.appendChild(e.progress)), e.progress.full.style.width = 100 * t + "%", e.progress.empty.style.width = 100 * (1 - t) + "%", 1 == t && (e.logo.style.display = e.progress.style.display = "none")
      }
    }, update: function (e, t, r) {
      var n = e.buildDownloadProgress[t];
      n || (n = e.buildDownloadProgress[t] = {
        started: !1,
        finished: !1,
        lengthComputable: !1,
        total: 0,
        loaded: 0
      }), "object" != typeof r || "progress" != r.type && "load" != r.type || (n.started || (n.started = !0, n.lengthComputable = r.lengthComputable, n.total = r.total), n.loaded = r.loaded, "load" == r.type && (n.finished = !0));
      var o = 0, i = 0, a = 0, s = 0, d = 0;
      for (var t in e.buildDownloadProgress) {
        var n = e.buildDownloadProgress[t];
        if (!n.started) return 0;
        a++, n.lengthComputable ? (o += n.loaded, i += n.total, s++) : n.finished || d++
      }
      var l = a ? (a - d - (i ? s * (i - o) / i : 0)) / a : 0;
      e.unityInstance.onProgress(e.unityInstance, .9 * l)
    }
  }, SystemInfo: function () {
    var e, t, r, n = "-", o = navigator.appVersion, i = navigator.userAgent, a = navigator.appName,
      s = navigator.appVersion, d = parseInt(navigator.appVersion, 10);
    (t = i.indexOf("Opera")) != -1 ? (a = "Opera", s = i.substring(t + 6), (t = i.indexOf("Version")) != -1 && (s = i.substring(t + 8))) : (t = i.indexOf("MSIE")) != -1 ? (a = "Microsoft Internet Explorer", s = i.substring(t + 5)) : (t = i.indexOf("Edge")) != -1 ? (a = "Edge", s = i.substring(t + 5)) : (t = i.indexOf("Chrome")) != -1 ? (a = "Chrome", s = i.substring(t + 7)) : (t = i.indexOf("Safari")) != -1 ? (a = "Safari", s = i.substring(t + 7), (t = i.indexOf("Version")) != -1 && (s = i.substring(t + 8))) : (t = i.indexOf("Firefox")) != -1 ? (a = "Firefox", s = i.substring(t + 8)) : i.indexOf("Trident/") != -1 ? (a = "Microsoft Internet Explorer", s = i.substring(i.indexOf("rv:") + 3)) : (e = i.lastIndexOf(" ") + 1) < (t = i.lastIndexOf("/")) && (a = i.substring(e, t), s = i.substring(t + 1), a.toLowerCase() == a.toUpperCase() && (a = navigator.appName)), (r = s.indexOf(";")) != -1 && (s = s.substring(0, r)), (r = s.indexOf(" ")) != -1 && (s = s.substring(0, r)), (r = s.indexOf(")")) != -1 && (s = s.substring(0, r)), d = parseInt("" + s, 10), isNaN(d) ? (s = "" + parseFloat(navigator.appVersion), d = parseInt(navigator.appVersion, 10)) : s = "" + parseFloat(s);
    var l = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(o), u = n,
      c = [{s: "Windows 3.11", r: /Win16/}, {s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/}, {
        s: "Windows ME",
        r: /(Win 9x 4.90|Windows ME)/
      }, {s: "Windows 98", r: /(Windows 98|Win98)/}, {s: "Windows CE", r: /Windows CE/}, {
        s: "Windows 2000",
        r: /(Windows NT 5.0|Windows 2000)/
      }, {s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/}, {
        s: "Windows Server 2003",
        r: /Windows NT 5.2/
      }, {s: "Windows Vista", r: /Windows NT 6.0/}, {
        s: "Windows 7",
        r: /(Windows 7|Windows NT 6.1)/
      }, {s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/}, {
        s: "Windows 8",
        r: /(Windows 8|Windows NT 6.2)/
      }, {s: "Windows 10", r: /(Windows 10|Windows NT 10.0)/}, {
        s: "Windows NT 4.0",
        r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
      }, {s: "Windows ME", r: /Windows ME/}, {s: "Android", r: /Android/}, {s: "Open BSD", r: /OpenBSD/}, {
        s: "Sun OS",
        r: /SunOS/
      }, {s: "Linux", r: /(Linux|X11)/}, {s: "iOS", r: /(iPhone|iPad|iPod)/}, {
        s: "Mac OS X",
        r: /Mac OS X/
      }, {s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/}, {s: "QNX", r: /QNX/}, {
        s: "UNIX",
        r: /UNIX/
      }, {s: "BeOS", r: /BeOS/}, {s: "OS/2", r: /OS\/2/}, {
        s: "Search Bot",
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
      }];
    for (var f in c) {
      var h = c[f];
      if (h.r.test(i)) {
        u = h.s;
        break
      }
    }
    var p = n;
    switch (/Windows/.test(u) && (p = /Windows (.*)/.exec(u)[1], u = "Windows"), u) {
      case"Mac OS X":
        p = /Mac OS X (10[\.\_\d]+)/.exec(i)[1];
        break;
      case"Android":
        p = /Android ([\.\_\d]+)/.exec(i)[1];
        break;
      case"iOS":
        p = /OS (\d+)_(\d+)_?(\d+)?/.exec(o), p = p[1] + "." + p[2] + "." + (0 | p[3])
    }
    return {
      width: screen.width ? screen.width : 0,
      height: screen.height ? screen.height : 0,
      browser: a,
      browserVersion: s,
      mobile: l,
      os: u,
      osVersion: p,
      gpu: function () {
        var e = document.createElement("canvas"), t = e.getContext("experimental-webgl");
        if (t) {
          var r = t.getExtension("WEBGL_debug_renderer_info");
          if (r) return t.getParameter(r.UNMASKED_RENDERER_WEBGL)
        }
        return n
      }(),
      language: window.navigator.userLanguage || window.navigator.language,
      hasWebGL: function () {
        if (!window.WebGLRenderingContext) return 0;
        var e = document.createElement("canvas"), t = e.getContext("webgl2");
        return t ? 2 : (t = e.getContext("experimental-webgl2"), t ? 2 : (t = e.getContext("webgl"), t || (t = e.getContext("experimental-webgl")) ? 1 : 0))
      }(),
      hasCursorLock: function () {
        var e = document.createElement("canvas");
        return e.requestPointerLock || e.mozRequestPointerLock || e.webkitRequestPointerLock || e.msRequestPointerLock ? 1 : 0
      }(),
      hasFullscreen: function () {
        var e = document.createElement("canvas");
        return (e.requestFullScreen || e.mozRequestFullScreen || e.msRequestFullscreen || e.webkitRequestFullScreen) && (a.indexOf("Safari") == -1 || s >= 10.1) ? 1 : 0
      }(),
      hasThreads: "undefined" != typeof SharedArrayBuffer,
      hasWasm: "object" == typeof WebAssembly && "function" == typeof WebAssembly.validate && "function" == typeof WebAssembly.compile,
      hasWasmThreads: function () {
        if ("object" != typeof WebAssembly) return !1;
        if ("undefined" == typeof SharedArrayBuffer) return !1;
        var e = new WebAssembly.Memory({initial: 1, maximum: 1, shared: !0}), t = e.buffer instanceof SharedArrayBuffer;
        return delete e, t
      }()
    }
  }(), compatibilityCheck: function (e, t, r) {
    UnityLoader.SystemInfo.hasWebGL ? UnityLoader.SystemInfo.mobile ? e.popup("Please note that Unity WebGL is not currently supported on mobiles. Press OK if you wish to continue anyway.", [{
      text: "OK",
      callback: t
    }]) : ["Edge", "Firefox", "Chrome", "Safari"].indexOf(UnityLoader.SystemInfo.browser) == -1 ? e.popup("Please note that your browser is not currently supported for this Unity WebGL content. Press OK if you wish to continue anyway.", [{
      text: "OK",
      callback: t
    }]) : t() : e.popup("Your browser does not support WebGL", [{text: "OK", callback: r}])
  }, buildCompatibilityCheck: function (e, t, r) {
    function n() {
      if ("undefined" == typeof e.graphicsAPI) return !0;
      for (var t = 0; t < e.graphicsAPI.length; t++) {
        var r = e.graphicsAPI[t];
        if ("WebGL 2.0" == r && 2 == UnityLoader.SystemInfo.hasWebGL) return !0;
        if ("WebGL 1.0" == r && UnityLoader.SystemInfo.hasWebGL >= 1) return !0;
        e.print("Warning: Unsupported graphics API " + r)
      }
      return !1
    }

    n() ? !UnityLoader.SystemInfo.hasThreads && e.multithreading ? r("Your browser does not support multithreading.") : t() : r("Your browser does not support any of the required graphics API for this content.")
  }, Blobs: {}, loadCode: function (e, t, r, n) {

    var o = [].slice.call(UnityLoader.Cryptography.md5(t)).map(function (e) {
      return ("0" + e.toString(16)).substr(-2)
    }).join("");
    if(n.url === "wasm.framework.unityweb") {
      var script = document.createElement("script");
      script.src = "framework.js";
      script.onload = function() {
        r(o, null), delete script.onload
      };
      document.body.appendChild(script);
      return;
    }
    var i = document.createElement("script"), a = (n.isModularized ? function (e) {
      return new Blob([e], {type: "application/javascript"})
    } : function (e, t) {
      return new Blob(['UnityLoader["' + t + '"]=', e], {type: "text/javascript"})
    })(t, o), s = URL.createObjectURL(a);
    UnityLoader.Blobs[s] = n, e.deinitializers.push(function () {
      delete UnityLoader.Blobs[s], delete UnityLoader[o], document.body.removeChild(document.getElementById(o))
    }), i.src = s, i.id = o, i.onload = function () {
      e.developmentBuild || URL.revokeObjectURL(s), r(o, a), delete i.onload
    };
   fetch(s).then(r => r.text()).then(console.log)
      document.body.appendChild(i)
  }, setupIndexedDBJob: function (e, t) {
    function r(n) {
      r.called || (r.called = !0, e.indexedDB = n, t.complete())
    }

    try {
      var n = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
        o = n.open("/idbfs-test");
      o.onerror = function (e) {
        e.preventDefault(), r()
      }, o.onsuccess = function () {
        o.result.close(), r(n)
      }, setTimeout(r, 1e3)
    } catch (e) {
      r()
    }
  }, processWasmCodeJob: function (e, t) {
    e.wasmBinary = UnityLoader.Job.result(e, "downloadWasmCode"), t.complete()
  }, processWasmFrameworkJob: function (e, t) {
    var r = UnityLoader.Job.result(e, "downloadWasmFramework");
    UnityLoader.loadCode(e, r, function (r, n) {
      e.mainScriptUrlOrBlob = n, e.isModularized && (UnityLoader[r] = UnityModule), UnityLoader[r](e), t.complete()
    }, {Module: e, url: e.wasmFrameworkUrl, isModularized: e.isModularized})
  }, processAsmCodeJob: function (e, t) {
    var r = UnityLoader.Job.result(e, "downloadAsmCode");
    UnityLoader.loadCode(e, Math.fround ? r : UnityLoader.Utils.optimizeMathFround(r), function (r, n) {
      e.isModularized ? e.asmJsUrlOrBlob = n : e.asm = UnityLoader[r], t.complete()
    }, {Module: e, url: e.asmCodeUrl, isModularized: e.isModularized})
  }, processAsmFrameworkJob: function (e, t) {
    var r = UnityLoader.Job.result(e, "downloadAsmFramework");
    UnityLoader.loadCode(e, r, function (r, n) {
      e.isModularized && (e.mainScriptUrlOrBlob = n, UnityLoader[r] = UnityModule), UnityLoader[r](e), t.complete()
    }, {Module: e, url: e.asmFrameworkUrl, isModularized: e.isModularized})
  }, processMemoryInitializerJob: function (e, t) {
    e.memoryInitializerRequest.status = 200, e.memoryInitializerRequest.response = UnityLoader.Job.result(e, "downloadMemoryInitializer"), e.memoryInitializerRequest.callback && e.memoryInitializerRequest.callback(), t.complete()
  }, processDataJob: function (e, t) {
    var r = UnityLoader.Job.result(e, "downloadData"), n = new DataView(r.buffer, r.byteOffset, r.byteLength), o = 0,
      i = "UnityWebData1.0\0";
    if (!String.fromCharCode.apply(null, r.subarray(o, o + i.length)) == i) throw"unknown data format";
    o += i.length;
    var a = n.getUint32(o, !0);
    for (o += 4; o < a;) {
      var s = n.getUint32(o, !0);
      o += 4;
      var d = n.getUint32(o, !0);
      o += 4;
      var l = n.getUint32(o, !0);
      o += 4;
      var u = String.fromCharCode.apply(null, r.subarray(o, o + l));
      o += l;
      for (var c = 0, f = u.indexOf("/", c) + 1; f > 0; c = f, f = u.indexOf("/", c) + 1) e.FS_createPath(u.substring(0, c), u.substring(c, f - 1), !0, !0);
      e.FS_createDataFile(u, null, r.subarray(s, s + d), !0, !0, !0)
    }
    e.removeRunDependency("processDataJob"), t.complete()
  }, downloadJob: function (e, t) {
    var r = t.parameters.objParameters ? new UnityLoader.UnityCache.XMLHttpRequest(t.parameters.objParameters) : new XMLHttpRequest;
    r.open("GET", t.parameters.url), r.responseType = "arraybuffer", r.onload = function () {
      UnityLoader.Compression.decompress(new Uint8Array(r.response), function (e) {
        t.complete(e)
      })
    }, t.parameters.onprogress && r.addEventListener("progress", t.parameters.onprogress), t.parameters.onload && r.addEventListener("load", t.parameters.onload), r.send()
  }, scheduleBuildDownloadJob: function (e, t, r) {
    UnityLoader.Progress.update(e, t), UnityLoader.Job.schedule(e, t, [], UnityLoader.downloadJob, {
      url: e.resolveBuildUrl(e[r]),
      onprogress: function (r) {
        UnityLoader.Progress.update(e, t, r)
      },
      onload: function (r) {
        UnityLoader.Progress.update(e, t, r)
      },
      objParameters: e.companyName && e.productName && e.cacheControl && (e.cacheControl[r] || e.cacheControl.default) ? {
        companyName: e.companyName,
        productName: e.productName,
        cacheControl: e.cacheControl[r] || e.cacheControl.default
      } : null
    })
  }, loadModule: function (e, t) {
    if (e.useWasm = e.wasmCodeUrl && UnityLoader.SystemInfo.hasWasm, e.useWasm) {
      if (e.multithreading && !UnityLoader.SystemInfo.hasWasmThreads) return void t("Your browser does not support WebAssembly Threads.");
      var r = ["downloadWasmFramework", "setupIndexedDB"];
      e.wasmCodeUrl.endsWith(".unityweb") && (UnityLoader.scheduleBuildDownloadJob(e, "downloadWasmCode", "wasmCodeUrl"), UnityLoader.Job.schedule(e, "processWasmCode", ["downloadWasmCode"], UnityLoader.processWasmCodeJob), r.push("processWasmCode")), e.wasmMemoryUrl && (UnityLoader.scheduleBuildDownloadJob(e, "downloadMemoryInitializer", "wasmMemoryUrl"), UnityLoader.Job.schedule(e, "processMemoryInitializer", ["downloadMemoryInitializer"], UnityLoader.processMemoryInitializerJob), e.memoryInitializerRequest = {
        addEventListener: function (t, r) {
          e.memoryInitializerRequest.callback = r
        }
      }), UnityLoader.scheduleBuildDownloadJob(e, "downloadWasmFramework", "wasmFrameworkUrl"), UnityLoader.Job.schedule(e, "processWasmFramework", r, UnityLoader.processWasmFrameworkJob)
    } else {
      if (!e.asmCodeUrl) return void t("Your browser does not support WebAssembly.");
      UnityLoader.scheduleBuildDownloadJob(e, "downloadAsmCode", "asmCodeUrl"), UnityLoader.Job.schedule(e, "processAsmCode", ["downloadAsmCode"], UnityLoader.processAsmCodeJob), UnityLoader.scheduleBuildDownloadJob(e, "downloadMemoryInitializer", "asmMemoryUrl"), UnityLoader.Job.schedule(e, "processMemoryInitializer", ["downloadMemoryInitializer"], UnityLoader.processMemoryInitializerJob), e.memoryInitializerRequest = {
        addEventListener: function (t, r) {
          e.memoryInitializerRequest.callback = r
        }
      }, e.asmLibraryUrl && (e.dynamicLibraries = [e.asmLibraryUrl].map(e.resolveBuildUrl)), UnityLoader.scheduleBuildDownloadJob(e, "downloadAsmFramework", "asmFrameworkUrl"), UnityLoader.Job.schedule(e, "processAsmFramework", ["downloadAsmFramework", "processAsmCode", "setupIndexedDB"], UnityLoader.processAsmFrameworkJob)
    }
    UnityLoader.scheduleBuildDownloadJob(e, "downloadData", "dataUrl"), UnityLoader.Job.schedule(e, "setupIndexedDB", [], UnityLoader.setupIndexedDBJob), e.preRun.push(function () {
      e.addRunDependency("processDataJob"), UnityLoader.Job.schedule(e, "processData", ["downloadData"], UnityLoader.processDataJob)
    })
  }, instantiate: function (e, t, r) {
    function n(e, n) {
      if ("string" == typeof e && !(e = document.getElementById(e))) return !1;
      e.innerHTML = "", e.style.border = e.style.margin = e.style.padding = 0, "static" == getComputedStyle(e).getPropertyValue("position") && (e.style.position = "relative"), e.style.width = n.width || e.style.width, e.style.height = n.height || e.style.height, n.container = e;
      var o = n.Module;
      o.canvas = document.createElement("canvas"), o.canvas.style.width = "100%", o.canvas.style.height = "100%", o.canvas.addEventListener("contextmenu", function (e) {
        e.preventDefault()
      }), o.canvas.id = "#canvas", e.appendChild(o.canvas), o.deinitializers.push(function () {
        e.removeChild(o.canvas)
      });
      var i = !0;
      return n.compatibilityCheck(n, function () {
        var t = new XMLHttpRequest;
        t.open("GET", n.url, !0), t.responseType = "text", t.onerror = function () {
          o.print("Could not download " + n.url), 0 == document.URL.indexOf("file:") && alert("It seems your browser does not support running Unity WebGL content from file:// urls. Please upload it to an http server, or try a different browser.")
        }, t.onload = function () {
          var a = JSON.parse(t.responseText);
          for (var s in a) "undefined" == typeof o[s] && (o[s] = a[s]);
          if (o.unityVersion) {
            var d = o.unityVersion.match(/(\d+)\.(\d+)\.(\d+)(.+)/);
            d && (o.unityVersion = {
              string: o.unityVersion,
              version: parseInt(d[0]),
              major: parseInt(d[1]),
              minor: parseInt(d[2]),
              suffix: d[3]
            })
          }
          o.isModularized = o.unityVersion && o.unityVersion.version >= 2019, UnityLoader.buildCompatibilityCheck(o, function () {
            e.style.background = o.backgroundUrl ? "center/cover url('" + o.resolveBuildUrl(o.backgroundUrl) + "')" : o.backgroundColor ? " " + o.backgroundColor : "", n.onProgress(n, 0), i = UnityLoader.loadModule(o, r.onerror)
          }, r.onerror)
        }, t.send()
      }, function () {
        var e = "Instantiation of '" + t + "' terminated due to the failed compatibility check.";
        "object" == typeof r && "function" == typeof r.onerror ? r.onerror(e) : o.printErr(e)
      }), i
    }

    function o(e) {
      return o.link = o.link || document.createElement("a"), o.link.href = e, o.link.href
    }

    "undefined" == typeof r && (r = {}), "undefined" == typeof r.onerror && (r.onerror = function (e) {
      i.popup(e, [{text: "OK"}])
    });
    var i = {
      url: t,
      onProgress: UnityLoader.Progress.handler,
      compatibilityCheck: UnityLoader.compatibilityCheck,
      Module: {
        deinitializers: [], intervals: {}, setInterval: function (e, t) {
          var r = window.setInterval(e, t);
          return this.intervals[r] = !0, r
        }, clearInterval: function (e) {
          delete this.intervals[e], window.clearInterval(e)
        }, onAbort: function (e) {
          throw void 0 !== e ? (this.print(e), this.printErr(e), e = JSON.stringify(e)) : e = "", "abort(" + e + ") at " + this.stackTrace()
        }, preRun: [], postRun: [], print: function (e) {
          console.log(e)
        }, printErr: function (e) {
          console.error(e)
        }, Jobs: {}, buildDownloadProgress: {}, resolveBuildUrl: function (e) {
          return e.match(/(http|https|ftp|file):\/\//) ? e : t.substring(0, t.lastIndexOf("/") + 1) + e
        }, streamingAssetsUrl: function () {
          return o(this.resolveBuildUrl("../StreamingAssets"))
        }, locateFile: function (e) {
          return "Build/".concat("build.wasm" == e ? this.wasmCodeUrl : e)
        }
      },
      SetFullscreen: function () {
        if (i.Module.SetFullscreen) return i.Module.SetFullscreen.apply(i.Module, arguments)
      },
      SendMessage: function () {
        if (i.Module.SendMessage) return i.Module.SendMessage.apply(i.Module, arguments)
      },
      Quit: function (e) {
        "function" == typeof e && (i.Module.onQuit = e), i.Module.shouldQuit = !0
      }
    };
    i.Module.unityInstance = i, i.popup = function (e, t) {
      return UnityLoader.Error.popup(i, e, t)
    }, i.Module.postRun.push(function () {
      i.onProgress(i, 1), "object" == typeof r && "function" == typeof r.onsuccess && r.onsuccess(i.Module)
    });
    for (var a in r) if ("Module" == a) for (var s in r[a]) i.Module[s] = r[a][s]; else i[a] = r[a];
    return n(e, i) || document.addEventListener("DOMContentLoaded", function () {
      n(e, i)
    }), i
  }, instantiateAsync: function (e, t, r) {
    return new Promise(function (n, o) {
      const i = Object.assign({
        onsuccess: function (e) {
          n(e)
        }, onerror: function (e) {
          o(e)
        }
      }, r);
      UnityLoader.instantiate(e, t, i)
    })
  }, Utils: {
    assert: function (e, t) {
      e || abort("Assertion failed: " + t)
    }, optimizeMathFround: function (e, t) {
      console.log("optimizing out Math.fround calls");
      for (var r = {
        LOOKING_FOR_MODULE: 0,
        SCANNING_MODULE_VARIABLES: 1,
        SCANNING_MODULE_FUNCTIONS: 2
      }, n = ["EMSCRIPTEN_START_ASM", "EMSCRIPTEN_START_FUNCS", "EMSCRIPTEN_END_FUNCS"], o = "var", i = "global.Math.fround;", a = 0, s = t ? r.LOOKING_FOR_MODULE : r.SCANNING_MODULE_VARIABLES, d = 0, l = 0; s <= r.SCANNING_MODULE_FUNCTIONS && a < e.length; a++) if (47 == e[a] && 47 == e[a + 1] && 32 == e[a + 2] && String.fromCharCode.apply(null, e.subarray(a + 3, a + 3 + n[s].length)) === n[s]) s++; else if (s != r.SCANNING_MODULE_VARIABLES || l || 61 != e[a] || String.fromCharCode.apply(null, e.subarray(a + 1, a + 1 + i.length)) !== i) {
        if (l && 40 == e[a]) {
          for (var u = 0; u < l && e[a - 1 - u] == e[d - u];) u++;
          if (u == l) {
            var c = e[a - 1 - u];
            if (c < 36 || 36 < c && c < 48 || 57 < c && c < 65 || 90 < c && c < 95 || 95 < c && c < 97 || 122 < c) for (; u; u--) e[a - u] = 32
          }
        }
      } else {
        for (d = a - 1; 32 != e[d - l];) l++;
        l && String.fromCharCode.apply(null, e.subarray(d - l - o.length, d - l)) === o || (d = l = 0)
      }
      return e
    }
  }, UnityCache: function () {
    function e(e) {
      console.log("[UnityCache] " + e)
    }

    function t(e) {
      return t.link = t.link || document.createElement("a"), t.link.href = e, t.link.href
    }

    function r(e) {
      var t = window.location.href.match(/^[a-z]+:\/\/[^\/]+/);
      return !t || e.lastIndexOf(t[0], 0)
    }

    function n() {
      function t(t) {
        if ("undefined" == typeof n.database) for (n.database = t, n.database || e("indexedDB database could not be opened"); n.queue.length;) {
          var r = n.queue.shift();
          n.database ? n.execute.apply(n, r) : "function" == typeof r.onerror && r.onerror(new Error("operation cancelled"))
        }
      }

      function r() {
        var e = o.open(a.name, a.version);
        e.onupgradeneeded = function (e) {
          var t = e.target.result;
          t.objectStoreNames.contains(d.name) || t.createObjectStore(d.name)
        }, e.onsuccess = function (e) {
          t(e.target.result)
        }, e.onerror = function () {
          t(null)
        }
      }

      var n = this;
      n.queue = [];
      try {
        var o = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
          i = o.open(a.name);
        i.onupgradeneeded = function (e) {
          var t = e.target.result.createObjectStore(s.name, {keyPath: "url"});
          ["version", "company", "product", "updated", "revalidated", "accessed"].forEach(function (e) {
            t.createIndex(e, e)
          })
        }, i.onsuccess = function (e) {
          var n = e.target.result;
          n.version < a.version ? (n.close(), r()) : t(n)
        }, i.onerror = function () {
          t(null)
        }, setTimeout(i.onerror, 1e3)
      } catch (e) {
        t(null)
      }
    }

    function o(e, t, r, n, o) {
      var i = {
        url: e,
        version: s.version,
        company: t,
        product: r,
        updated: n,
        revalidated: n,
        accessed: n,
        responseHeaders: {},
        xhr: {}
      };
      return o && (["Last-Modified", "ETag"].forEach(function (e) {
        i.responseHeaders[e] = o.getResponseHeader(e)
      }), ["responseURL", "status", "statusText", "response"].forEach(function (e) {
        i.xhr[e] = o[e]
      })), i
    }

    function i(t) {
      this.cache = {enabled: !1}, t && (this.cache.control = t.cacheControl, this.cache.company = t.companyName, this.cache.product = t.productName), this.xhr = new XMLHttpRequest(t), this.xhr.addEventListener("load", function () {
        var t = this.xhr, r = this.cache;
        r.enabled && !r.revalidated && (304 == t.status ? (r.result.revalidated = r.result.accessed, r.revalidated = !0, l.execute(s.name, "put", [r.result]), e("'" + r.result.url + "' successfully revalidated and served from the indexedDB cache")) : 200 == t.status ? (r.result = o(r.result.url, r.company, r.product, r.result.accessed, t), r.revalidated = !0, l.execute(s.name, "put", [r.result], function (t) {
          e("'" + r.result.url + "' successfully downloaded and stored in the indexedDB cache")
        }, function (t) {
          e("'" + r.result.url + "' successfully downloaded but not stored in the indexedDB cache due to the error: " + t)
        })) : e("'" + r.result.url + "' request failed with status: " + t.status + " " + t.statusText))
      }.bind(this))
    }

    var a = {name: "UnityCache", version: 2}, s = {name: "XMLHttpRequest", version: 1},
      d = {name: "WebAssembly", version: 1};
    n.prototype.execute = function (e, t, r, n, o) {
      if (this.database) try {
        var i = this.database.transaction([e], ["put", "delete", "clear"].indexOf(t) != -1 ? "readwrite" : "readonly").objectStore(e);
        "openKeyCursor" == t && (i = i.index(r[0]), r = r.slice(1));
        var a = i[t].apply(i, r);
        "function" == typeof n && (a.onsuccess = function (e) {
          n(e.target.result)
        }), a.onerror = o
      } catch (e) {
        "function" == typeof o && o(e)
      } else "undefined" == typeof this.database ? this.queue.push(arguments) : "function" == typeof o && o(new Error("indexedDB access denied"))
    };
    var l = new n;
    i.prototype.send = function (t) {
      var n = this.xhr, o = this.cache, i = arguments;
      return o.enabled = o.enabled && "arraybuffer" == n.responseType && !t, o.enabled ? void l.execute(s.name, "get", [o.result.url], function (t) {
        if (!t || t.version != s.version) return void n.send.apply(n, i);
        if (o.result = t, o.result.accessed = Date.now(), "immutable" == o.control) o.revalidated = !0, l.execute(s.name, "put", [o.result]), n.dispatchEvent(new Event("load")), e("'" + o.result.url + "' served from the indexedDB cache without revalidation"); else if (r(o.result.url) && (o.result.responseHeaders["Last-Modified"] || o.result.responseHeaders.ETag)) {
          var a = new XMLHttpRequest;
          a.open("HEAD", o.result.url), a.onload = function () {
            o.revalidated = ["Last-Modified", "ETag"].every(function (e) {
              return !o.result.responseHeaders[e] || o.result.responseHeaders[e] == a.getResponseHeader(e)
            }), o.revalidated ? (o.result.revalidated = o.result.accessed, l.execute(s.name, "put", [o.result]), n.dispatchEvent(new Event("load")), e("'" + o.result.url + "' successfully revalidated and served from the indexedDB cache")) : n.send.apply(n, i)
          }, a.send()
        } else o.result.responseHeaders["Last-Modified"] ? (n.setRequestHeader("If-Modified-Since", o.result.responseHeaders["Last-Modified"]), n.setRequestHeader("Cache-Control", "no-cache")) : o.result.responseHeaders.ETag && (n.setRequestHeader("If-None-Match", o.result.responseHeaders.ETag), n.setRequestHeader("Cache-Control", "no-cache")), n.send.apply(n, i)
      }, function (e) {
        n.send.apply(n, i)
      }) : n.send.apply(n, i)
    }, i.prototype.open = function (e, r, n, i, a) {
      return this.cache.result = o(t(r), this.cache.company, this.cache.product, Date.now()), this.cache.enabled = ["must-revalidate", "immutable"].indexOf(this.cache.control) != -1 && "GET" == e && this.cache.result.url.match("^https?://") && ("undefined" == typeof n || n) && "undefined" == typeof i && "undefined" == typeof a, this.cache.revalidated = !1, this.xhr.open.apply(this.xhr, arguments)
    }, i.prototype.setRequestHeader = function (e, t) {
      return this.cache.enabled = !1, this.xhr.setRequestHeader.apply(this.xhr, arguments)
    };
    var u = new XMLHttpRequest;
    for (var c in u) i.prototype.hasOwnProperty(c) || !function (e) {
      Object.defineProperty(i.prototype, e, "function" == typeof u[e] ? {
        value: function () {
          return this.xhr[e].apply(this.xhr, arguments)
        }
      } : {
        get: function () {
          return this.cache.revalidated && this.cache.result.xhr.hasOwnProperty(e) ? this.cache.result.xhr[e] : this.xhr[e]
        }, set: function (t) {
          this.xhr[e] = t
        }
      })
    }(c);
    return {
      XMLHttpRequest: i, WebAssembly: {
        get: function (e, r) {
          var n = {url: t(e), version: d.version, module: null, md5: null};
          l.execute(d.name, "get", [n.url], function (e) {
            r(e && e.version == d.version ? e : n)
          }, function () {
            r(n)
          })
        }, put: function (e, t, r) {
          l.execute(d.name, "put", [e, e.url], t, r)
        }
      }
    }
  }()
};

function UnityProgress(gameInstance, progress) {
  if (!gameInstance.Module)
    return;
  if (!gameInstance.logo) {
    gameInstance.logo = document.createElement("div");
    gameInstance.logo.className = "logo " + gameInstance.Module.splashScreenStyle;
    gameInstance.container.appendChild(gameInstance.logo);
  }
  if (!gameInstance.progress) {
    gameInstance.progress = document.createElement("div");
    gameInstance.progress.className = "progress " + gameInstance.Module.splashScreenStyle;
    gameInstance.progress.empty = document.createElement("div");
    gameInstance.progress.empty.className = "empty";
    gameInstance.progress.appendChild(gameInstance.progress.empty);
    gameInstance.progress.full = document.createElement("div");
    gameInstance.progress.full.className = "full";
    gameInstance.progress.appendChild(gameInstance.progress.full);
    gameInstance.container.appendChild(gameInstance.progress);
  }
  gameInstance.progress.full.style.width = (100 * progress) + "%";
  gameInstance.progress.empty.style.width = (100 * (1 - progress)) + "%";
  if (progress == 1)
    gameInstance.logo.style.display = gameInstance.progress.style.display = "none";
}

var gameInstance = UnityLoader.instantiate("unityarea", "unity.json", {
  onProgress: UnityProgress,
  Module: {
    onRuntimeInitialized: function () {
      UnityProgress(gameInstance, "complete")
    }
  }
});
document.getElementsByClassName('fullscreen')[0].addEventListener('click', function () {
  gameInstance.SetFullscreen(1)
});
function updateFullscreen(){
  gameInstance.SetFullscreen(1)
}
!function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).firebase = t()
}(this, function () {
  "use strict";
  var r = function (e, t) {
    return (r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
      e.__proto__ = t
    } || function (e, t) {
      for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
    })(e, t)
  };
  var n = function () {
    return (n = Object.assign || function (e) {
      for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
      return e
    }).apply(this, arguments)
  };

  function d(e, t) {
    if (!(t instanceof Object)) return t;
    switch (t.constructor) {
      case Date:
        return new Date(t.getTime());
      case Object:
        void 0 === e && (e = {});
        break;
      case Array:
        e = [];
        break;
      default:
        return t
    }
    for (var r in t) t.hasOwnProperty(r) && (e[r] = d(e[r], t[r]));
    return e
  }

  var e, t, o,
    f = (o = Error, r(e = a, t = o), void (e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)), a);

  function i() {
    this.constructor = e
  }

  function a(e, t) {
    var r = o.call(this, t) || this;
    return r.code = e, r.name = "FirebaseError", Object.setPrototypeOf(r, a.prototype), Error.captureStackTrace && Error.captureStackTrace(r, s.prototype.create), r
  }

  var s = (c.prototype.create = function (e) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    for (var n = t[0] || {}, o = this.service + "/" + e, i = this.errors[e], a = i ? function (e, n) {
      return e.replace(h, function (e, t) {
        var r = n[t];
        return null != r ? r.toString() : "<" + t + "?>"
      })
    }(i, n) : "Error", s = this.serviceName + ": " + a + " (" + o + ").", c = new f(o, s), p = 0, l = Object.keys(n); p < l.length; p++) {
      var u = l[p];
      "_" !== u.slice(-1) && (u in c && console.warn('Overwriting FirebaseError base field "' + u + '" can cause unexpected behavior.'), c[u] = n[u])
    }
    return c
  }, c);

  function c(e, t, r) {
    this.service = e, this.serviceName = t, this.errors = r
  }

  var h = /\{\$([^}]+)}/g;

  function v(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }

  function p(e, t) {
    var r = new b(e, t);
    return r.subscribe.bind(r)
  }

  var l, u, b = (y.prototype.next = function (t) {
    this.forEachObserver(function (e) {
      e.next(t)
    })
  }, y.prototype.error = function (t) {
    this.forEachObserver(function (e) {
      e.error(t)
    }), this.close(t)
  }, y.prototype.complete = function () {
    this.forEachObserver(function (e) {
      e.complete()
    }), this.close()
  }, y.prototype.subscribe = function (e, t, r) {
    var n, o = this;
    if (void 0 === e && void 0 === t && void 0 === r) throw new Error("Missing Observer.");
    void 0 === (n = function (e, t) {
      if ("object" != typeof e || null === e) return !1;
      for (var r = 0, n = t; r < n.length; r++) {
        var o = n[r];
        if (o in e && "function" == typeof e[o]) return !0
      }
      return !1
    }(e, ["next", "error", "complete"]) ? e : {
      next: e,
      error: t,
      complete: r
    }).next && (n.next = g), void 0 === n.error && (n.error = g), void 0 === n.complete && (n.complete = g);
    var i = this.unsubscribeOne.bind(this, this.observers.length);
    return this.finalized && this.task.then(function () {
      try {
        o.finalError ? n.error(o.finalError) : n.complete()
      } catch (e) {
      }
    }), this.observers.push(n), i
  }, y.prototype.unsubscribeOne = function (e) {
    void 0 !== this.observers && void 0 !== this.observers[e] && (delete this.observers[e], this.observerCount -= 1, 0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this))
  }, y.prototype.forEachObserver = function (e) {
    if (!this.finalized) for (var t = 0; t < this.observers.length; t++) this.sendOne(t, e)
  }, y.prototype.sendOne = function (e, t) {
    var r = this;
    this.task.then(function () {
      if (void 0 !== r.observers && void 0 !== r.observers[e]) try {
        t(r.observers[e])
      } catch (e) {
        "undefined" != typeof console && console.error && console.error(e)
      }
    })
  }, y.prototype.close = function (e) {
    var t = this;
    this.finalized || (this.finalized = !0, void 0 !== e && (this.finalError = e), this.task.then(function () {
      t.observers = void 0, t.onNoObservers = void 0
    }))
  }, y);

  function y(e, t) {
    var r = this;
    this.observers = [], this.unsubscribes = [], this.observerCount = 0, this.task = Promise.resolve(), this.finalized = !1, this.onNoObservers = t, this.task.then(function () {
      e(r)
    }).catch(function (e) {
      r.error(e)
    })
  }

  function g() {
  }

  (u = l = l || {})[u.DEBUG = 0] = "DEBUG", u[u.VERBOSE = 1] = "VERBOSE", u[u.INFO = 2] = "INFO", u[u.WARN = 3] = "WARN", u[u.ERROR = 4] = "ERROR", u[u.SILENT = 5] = "SILENT";

  function m(e, t) {
    for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
    if (!(t < e.logLevel)) {
      var o = (new Date).toISOString();
      switch (t) {
        case l.DEBUG:
        case l.VERBOSE:
          console.log.apply(console, ["[" + o + "]  " + e.name + ":"].concat(r));
          break;
        case l.INFO:
          console.info.apply(console, ["[" + o + "]  " + e.name + ":"].concat(r));
          break;
        case l.WARN:
          console.warn.apply(console, ["[" + o + "]  " + e.name + ":"].concat(r));
          break;
        case l.ERROR:
          console.error.apply(console, ["[" + o + "]  " + e.name + ":"].concat(r));
          break;
        default:
          throw new Error("Attempted to log a message with an invalid logType (value: " + t + ")")
      }
    }
  }

  var _, E = l.INFO, N = (Object.defineProperty(O.prototype, "logLevel", {
    get: function () {
      return this._logLevel
    }, set: function (e) {
      if (!(e in l)) throw new TypeError("Invalid value assigned to `logLevel`");
      this._logLevel = e
    }, enumerable: !0, configurable: !0
  }), Object.defineProperty(O.prototype, "logHandler", {
    get: function () {
      return this._logHandler
    }, set: function (e) {
      if ("function" != typeof e) throw new TypeError("Value assigned to `logHandler` must be a function");
      this._logHandler = e
    }, enumerable: !0, configurable: !0
  }), O.prototype.debug = function () {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    this._logHandler.apply(this, [this, l.DEBUG].concat(e))
  }, O.prototype.log = function () {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    this._logHandler.apply(this, [this, l.VERBOSE].concat(e))
  }, O.prototype.info = function () {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    this._logHandler.apply(this, [this, l.INFO].concat(e))
  }, O.prototype.warn = function () {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    this._logHandler.apply(this, [this, l.WARN].concat(e))
  }, O.prototype.error = function () {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    this._logHandler.apply(this, [this, l.ERROR].concat(e))
  }, O);

  function O(e) {
    this.name = e, this._logLevel = E, this._logHandler = m
  }

  var w = ((_ = {})["no-app"] = "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()", _["bad-app-name"] = "Illegal App name: '{$appName}", _["duplicate-app"] = "Firebase App named '{$appName}' already exists", _["app-deleted"] = "Firebase App named '{$appName}' already deleted", _["duplicate-service"] = "Firebase service named '{$appName}' already registered", _["invalid-app-argument"] = "firebase.{$appName}() takes either no argument or a Firebase App instance.", _),
    A = new s("app", "Firebase", w), k = "[DEFAULT]", R = [],
    I = (Object.defineProperty(T.prototype, "automaticDataCollectionEnabled", {
      get: function () {
        return this.checkDestroyed_(), this.automaticDataCollectionEnabled_
      }, set: function (e) {
        this.checkDestroyed_(), this.automaticDataCollectionEnabled_ = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(T.prototype, "name", {
      get: function () {
        return this.checkDestroyed_(), this.name_
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(T.prototype, "options", {
      get: function () {
        return this.checkDestroyed_(), this.options_
      }, enumerable: !0, configurable: !0
    }), T.prototype.delete = function () {
      var s = this;
      return new Promise(function (e) {
        s.checkDestroyed_(), e()
      }).then(function () {
        s.firebase_.INTERNAL.removeApp(s.name_);
        for (var e = [], t = 0, r = Object.keys(s.services_); t < r.length; t++) for (var n = r[t], o = 0, i = Object.keys(s.services_[n]); o < i.length; o++) {
          var a = i[o];
          e.push(s.services_[n][a])
        }
        return Promise.all(e.filter(function (e) {
          return "INTERNAL" in e
        }).map(function (e) {
          return e.INTERNAL.delete()
        }))
      }).then(function () {
        s.isDeleted_ = !0, s.services_ = {}
      })
    }, T.prototype._getService = function (e, t) {
      if (void 0 === t && (t = k), this.checkDestroyed_(), this.services_[e] || (this.services_[e] = {}), !this.services_[e][t]) {
        var r = t !== k ? t : void 0, n = this.firebase_.INTERNAL.factories[e](this, this.extendApp.bind(this), r);
        this.services_[e][t] = n
      }
      return this.services_[e][t]
    }, T.prototype._removeServiceInstance = function (e, t) {
      void 0 === t && (t = k), this.services_[e] && this.services_[e][t] && delete this.services_[e][t]
    }, T.prototype.extendApp = function (e) {
      var t = this;
      d(this, e), e.INTERNAL && e.INTERNAL.addAuthTokenListener && (R.forEach(function (e) {
        t.INTERNAL.addAuthTokenListener(e)
      }), R = [])
    }, T.prototype.checkDestroyed_ = function () {
      if (this.isDeleted_) throw A.create("app-deleted", {appName: this.name_})
    }, T);

  function T(e, t, r) {
    this.firebase_ = r, this.isDeleted_ = !1, this.services_ = {}, this.name_ = t.name, this.automaticDataCollectionEnabled_ = t.automaticDataCollectionEnabled || !1, this.options_ = function (e) {
      return d(void 0, e)
    }(e), this.INTERNAL = {
      getUid: function () {
        return null
      }, getToken: function () {
        return Promise.resolve(null)
      }, addAuthTokenListener: function (e) {
        R.push(e), setTimeout(function () {
          return e(null)
        }, 0)
      }, removeAuthTokenListener: function (t) {
        R = R.filter(function (e) {
          return e !== t
        })
      }
    }
  }

  I.prototype.name && I.prototype.options || I.prototype.delete || console.log("dc");
  var j = "6.3.4";
  var F = new N("@firebase/app");
  //alert("This function is not available in the current version");
  if ("object" == typeof self && self.self === self && void 0 !== self.firebase) {
    F.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");
    var D = self.firebase.SDK_VERSION;
    D && 0 <= D.indexOf("LITE") && F.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")
  }
  var L = function e() {
    var t = function (a) {
      var i = {}, s = {}, c = {}, p = {
        __esModule: !0, initializeApp: function (e, t) {

          void 0 === t && (t = {}), "object" == typeof t && null !== t || (t = {name: t});
          var r = t;
          void 0 === r.name && (r.name = k);
          var n = r.name;
          if ("string" != typeof n || !n) throw A.create("bad-app-name", {appName: String(n)});
          if (v(i, n)) throw A.create("duplicate-app", {appName: n});
          var o = new a(e, r, p);
          return f(i[n] = o, "create"), o
        }, app: l, apps: null, SDK_VERSION: j, INTERNAL: {
          registerService: function (r, e, t, n, o) {
            if (void 0 === o && (o = !1), s[r]) throw A.create("duplicate-service", {appName: r});

            function i(e) {
              if (void 0 === e && (e = l()), "function" != typeof e[r]) throw A.create("invalid-app-argument", {appName: r});
              return e[r]()
            }

            return s[r] = e, n && (c[r] = n, u().forEach(function (e) {
              n("create", e)
            })), void 0 !== t && d(i, t), p[r] = i, a.prototype[r] = function () {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              return this._getService.bind(this, r).apply(this, o ? e : [])
            }, i
          }, removeApp: function (e) {
            f(i[e], "delete"), delete i[e]
          }, factories: s, useAsService: h
        }
      };

      function l(e) {
        if (!v(i, e = e || k)) throw A.create("no-app", {appName: e});
        return i[e]
      }

      function u() {
        return Object.keys(i).map(function (e) {
          return i[e]
        })
      }

      function f(e, t) {
        for (var r = 0, n = Object.keys(s); r < n.length; r++) {
          var o = h(0, n[r]);
          if (null === o) return;
          c[o] && c[o](t, e)
        }
      }

      function h(e, t) {
        return "serverAuth" === t ? null : t
      }

      return p.default = p, Object.defineProperty(p, "apps", {get: u}), l.App = a, p
    }(I);
    return t.INTERNAL = n({}, t.INTERNAL, {
      createFirebaseNamespace: e, extendNamespace: function (e) {
        d(t, e)
      }, createSubscribe: p, ErrorFactory: s, deepExtend: d
    }), t
  }(), S = L.initializeApp;
  return L.initializeApp = function () {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return function () {
      try {
        return "[object process]" === Object.prototype.toString.call(global.process)
      } catch (e) {
        return !1
      }
    }() && F.warn('\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the "main" field in package.json.\n      \n      If you are using Webpack, you can specify "main" as the first item in\n      "resolve.mainFields":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the rollup-plugin-node-resolve plugin and specify "main"\n      as the first item in "mainFields", e.g. [\'main\', \'module\'].\n      https://github.com/rollup/rollup-plugin-node-resolve\n      '), S.apply(void 0, e)
  }, L
});
//# sourceMappingURL=firebase-app.js.map
!function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(require("@firebase/app")) : "function" == typeof define && define.amd ? define(["@firebase/app"], e) : e((t = t || self).firebase)
}(this, function ($h) {
  "use strict";
  try {
    (function () {
      $h = $h && $h.hasOwnProperty("default") ? $h.default : $h, function () {
        var t, o = "function" == typeof Object.defineProperties ? Object.defineProperty : function (t, e, n) {
            t != Array.prototype && t != Object.prototype && (t[e] = n.value)
          },
          a = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;

        function c(t) {
          var e = "undefined" != typeof Symbol && Symbol.iterator && t[Symbol.iterator];
          return e ? e.call(t) : {
            next: function (t) {
              var e = 0;
              return function () {
                return e < t.length ? {done: !1, value: t[e++]} : {done: !0}
              }
            }(t)
          }
        }

        !function (t, e) {
          if (e) {
            var n = a;
            t = t.split(".");
            for (var i = 0; i < t.length - 1; i++) {
              var r = t[i];
              r in n || (n[r] = {}), n = n[r]
            }
            (e = e(i = n[t = t[t.length - 1]])) != i && null != e && o(n, t, {configurable: !0, writable: !0, value: e})
          }
        }("Promise", function (t) {
          function s(t) {
            this.b = 0, this.c = void 0, this.a = [];
            var e = this.f();
            try {
              t(e.resolve, e.reject)
            } catch (t) {
              e.reject(t)
            }
          }

          function e() {
            this.a = null
          }

          function u(e) {
            return e instanceof s ? e : new s(function (t) {
              t(e)
            })
          }

          if (t) return t;
          e.prototype.b = function (t) {
            if (null == this.a) {
              this.a = [];
              var e = this;
              this.c(function () {
                e.g()
              })
            }
            this.a.push(t)
          };
          var n = a.setTimeout;
          e.prototype.c = function (t) {
            n(t, 0)
          }, e.prototype.g = function () {
            for (; this.a && this.a.length;) {
              var t = this.a;
              this.a = [];
              for (var e = 0; e < t.length; ++e) {
                var n = t[e];
                t[e] = null;
                try {
                  n()
                } catch (t) {
                  this.f(t)
                }
              }
            }
            this.a = null
          }, e.prototype.f = function (t) {
            this.c(function () {
              throw t
            })
          }, s.prototype.f = function () {
            function t(e) {
              return function (t) {
                i || (i = !0, e.call(n, t))
              }
            }

            var n = this, i = !1;
            return {resolve: t(this.o), reject: t(this.g)}
          }, s.prototype.o = function (t) {
            if (t === this) this.g(new TypeError("A Promise cannot resolve to itself")); else if (t instanceof s) this.u(t); else {
              t:switch (typeof t) {
                case"object":
                  var e = null != t;
                  break t;
                case"function":
                  e = !0;
                  break t;
                default:
                  e = !1
              }
              e ? this.l(t) : this.h(t)
            }
          }, s.prototype.l = function (t) {
            var e = void 0;
            try {
              e = t.then
            } catch (t) {
              return void this.g(t)
            }
            "function" == typeof e ? this.v(e, t) : this.h(t)
          }, s.prototype.g = function (t) {
            this.i(2, t)
          }, s.prototype.h = function (t) {
            this.i(1, t)
          }, s.prototype.i = function (t, e) {
            if (0 != this.b) throw Error("Cannot settle(" + t + ", " + e + "): Promise already settled in state" + this.b);
            this.b = t, this.c = e, this.m()
          }, s.prototype.m = function () {
            if (null != this.a) {
              for (var t = 0; t < this.a.length; ++t) r.b(this.a[t]);
              this.a = null
            }
          };
          var r = new e;
          return s.prototype.u = function (t) {
            var e = this.f();
            t.Ja(e.resolve, e.reject)
          }, s.prototype.v = function (t, e) {
            var n = this.f();
            try {
              t.call(e, n.resolve, n.reject)
            } catch (t) {
              n.reject(t)
            }
          }, s.prototype.then = function (t, e) {
            function n(e, t) {
              return "function" == typeof e ? function (t) {
                try {
                  i(e(t))
                } catch (t) {
                  r(t)
                }
              } : t
            }

            var i, r, o = new s(function (t, e) {
              i = t, r = e
            });
            return this.Ja(n(t, i), n(e, r)), o
          }, s.prototype.catch = function (t) {
            return this.then(void 0, t)
          }, s.prototype.Ja = function (t, e) {
            function n() {
              switch (i.b) {
                case 1:
                  t(i.c);
                  break;
                case 2:
                  e(i.c);
                  break;
                default:
                  throw Error("Unexpected state: " + i.b)
              }
            }

            var i = this;
            null == this.a ? r.b(n) : this.a.push(n)
          }, s.resolve = u, s.reject = function (n) {
            return new s(function (t, e) {
              e(n)
            })
          }, s.race = function (r) {
            return new s(function (t, e) {
              for (var n = c(r), i = n.next(); !i.done; i = n.next()) u(i.value).Ja(t, e)
            })
          }, s.all = function (t) {
            var o = c(t), a = o.next();
            return a.done ? u([]) : new s(function (n, t) {
              function e(e) {
                return function (t) {
                  i[e] = t, 0 == --r && n(i)
                }
              }

              for (var i = [], r = 0; i.push(void 0), r++, u(a.value).Ja(e(i.length - 1), t), !(a = o.next()).done;) ;
            })
          }, s
        });
        var u = u || {}, h = this || self;

        function f(t) {
          return "string" == typeof t
        }

        function n(t) {
          return "boolean" == typeof t
        }

        var s = /^[\w+/_-]+[=]{0,2}$/, l = null;

        function d() {
        }

        function i(t) {
          var e = typeof t;
          if ("object" == e) {
            if (!t) return "null";
            if (t instanceof Array) return "array";
            if (t instanceof Object) return e;
            var n = Object.prototype.toString.call(t);
            if ("[object Window]" == n) return "object";
            if ("[object Array]" == n || "number" == typeof t.length && void 0 !== t.splice && void 0 !== t.propertyIsEnumerable && !t.propertyIsEnumerable("splice")) return "array";
            if ("[object Function]" == n || void 0 !== t.call && void 0 !== t.propertyIsEnumerable && !t.propertyIsEnumerable("call")) return "function"
          } else if ("function" == e && void 0 === t.call) return "object";
          return e
        }

        function r(t) {
          return null === t
        }

        function p(t) {
          return "array" == i(t)
        }

        function v(t) {
          var e = i(t);
          return "array" == e || "object" == e && "number" == typeof t.length
        }

        function m(t) {
          return "function" == i(t)
        }

        function g(t) {
          var e = typeof t;
          return "object" == e && null != t || "function" == e
        }

        var e = "closure_uid_" + (1e9 * Math.random() >>> 0), b = 0;

        function y(t, e, n) {
          return t.call.apply(t.bind, arguments)
        }

        function w(e, n, t) {
          if (!e) throw Error();
          if (2 < arguments.length) {
            var i = Array.prototype.slice.call(arguments, 2);
            return function () {
              var t = Array.prototype.slice.call(arguments);
              return Array.prototype.unshift.apply(t, i), e.apply(n, t)
            }
          }
          return function () {
            return e.apply(n, arguments)
          }
        }

        function I(t, e, n) {
          return (I = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? y : w).apply(null, arguments)
        }

        function T(e, t) {
          var n = Array.prototype.slice.call(arguments, 1);
          return function () {
            var t = n.slice();
            return t.push.apply(t, arguments), e.apply(this, t)
          }
        }

        var k = Date.now || function () {
          return +new Date
        };

        function E(t, o) {
          function e() {
          }

          e.prototype = o.prototype, t.qb = o.prototype, t.prototype = new e, (t.prototype.constructor = t).cd = function (t, e, n) {
            for (var i = Array(arguments.length - 2), r = 2; r < arguments.length; r++) i[r - 2] = arguments[r];
            return o.prototype[e].apply(t, i)
          }
        }

        function S(t) {
          if (!t) return !1;
          try {
            return !!t.$goog_Thenable
          } catch (t) {
            return !1
          }
        }

        function A(t) {
          if (Error.captureStackTrace) Error.captureStackTrace(this, A); else {
            var e = Error().stack;
            e && (this.stack = e)
          }
          t && (this.message = String(t))
        }

        function N(t, e) {
          for (var n = "", i = (t = t.split("%s")).length - 1, r = 0; r < i; r++) n += t[r] + (r < e.length ? e[r] : "%s");
          A.call(this, n + t[i])
        }

        function O(t, e) {
          throw new N("Failure" + (t ? ": " + t : ""), Array.prototype.slice.call(arguments, 1))
        }

        function _(t, e) {
          this.c = t, this.f = e, this.b = 0, this.a = null
        }

        function P(t, e) {
          t.f(e), t.b < 100 && (t.b++, e.next = t.a, t.a = e)
        }

        function C() {
          this.b = this.a = null
        }

        E(A, Error), A.prototype.name = "CustomError", E(N, A), N.prototype.name = "AssertionError", _.prototype.get = function () {
          if (0 < this.b) {
            this.b--;
            var t = this.a;
            this.a = t.next, t.next = null
          } else t = this.c();
          return t
        };
        var R = new _(function () {
          return new D
        }, function (t) {
          t.reset()
        });

        function D() {
          this.next = this.b = this.a = null
        }

        function L(t, e) {
          t:{
            try {
              var n = t && t.ownerDocument, i = n && (n.defaultView || n.parentWindow);
              if ((i = i || h).Element && i.Location) {
                var r = i;
                break t
              }
            } catch (t) {
            }
            r = null
          }
          if (r && void 0 !== r[e] && (!t || !(t instanceof r[e]) && (t instanceof r.Location || t instanceof r.Element))) {
            if (g(t)) try {
              var o = t.constructor.displayName || t.constructor.name || Object.prototype.toString.call(t)
            } catch (t) {
              o = "<object could not be stringified>"
            } else o = void 0 === t ? "undefined" : null === t ? "null" : typeof t;
            O("Argument is not a %s (or a non-Element, non-Location mock); got: %s", e, o)
          }
        }

        C.prototype.add = function (t, e) {
          var n = R.get();
          n.set(t, e), this.b ? this.b.next = n : this.a = n, this.b = n
        }, D.prototype.set = function (t, e) {
          this.a = t, this.b = e, this.next = null
        }, D.prototype.reset = function () {
          this.next = this.b = this.a = null
        };
        var x = Array.prototype.indexOf ? function (t, e) {
          return Array.prototype.indexOf.call(t, e, void 0)
        } : function (t, e) {
          if (f(t)) return f(e) && 1 == e.length ? t.indexOf(e, 0) : -1;
          for (var n = 0; n < t.length; n++) if (n in t && t[n] === e) return n;
          return -1
        }, M = Array.prototype.forEach ? function (t, e, n) {
          Array.prototype.forEach.call(t, e, n)
        } : function (t, e, n) {
          for (var i = t.length, r = f(t) ? t.split("") : t, o = 0; o < i; o++) o in r && e.call(n, r[o], o, t)
        };
        var j = Array.prototype.map ? function (t, e) {
          return Array.prototype.map.call(t, e, void 0)
        } : function (t, e) {
          for (var n = t.length, i = Array(n), r = f(t) ? t.split("") : t, o = 0; o < n; o++) o in r && (i[o] = e.call(void 0, r[o], o, t));
          return i
        }, U = Array.prototype.some ? function (t, e) {
          return Array.prototype.some.call(t, e, void 0)
        } : function (t, e) {
          for (var n = t.length, i = f(t) ? t.split("") : t, r = 0; r < n; r++) if (r in i && e.call(void 0, i[r], r, t)) return !0;
          return !1
        };

        function V(t, e) {
          return 0 <= x(t, e)
        }

        function K(t, e) {
          var n;
          return (n = 0 <= (e = x(t, e))) && Array.prototype.splice.call(t, e, 1), n
        }

        function F(n, i) {
          !function (t, e) {
            for (var n = f(t) ? t.split("") : t, i = t.length - 1; 0 <= i; --i) i in n && e.call(void 0, n[i], i, t)
          }(n, function (t, e) {
            i.call(void 0, t, e, n) && 1 == Array.prototype.splice.call(n, e, 1).length && 0
          })
        }

        function q(t) {
          return Array.prototype.concat.apply([], arguments)
        }

        function H(t) {
          var e = t.length;
          if (0 < e) {
            for (var n = Array(e), i = 0; i < e; i++) n[i] = t[i];
            return n
          }
          return []
        }

        function B(t, e) {
          for (var n in t) e.call(void 0, t[n], n, t)
        }

        function G(t) {
          for (var e in t) return !1;
          return !0
        }

        function W(t) {
          var e, n = {};
          for (e in t) n[e] = t[e];
          return n
        }

        var X = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

        function J(t, e) {
          for (var n, i, r = 1; r < arguments.length; r++) {
            for (n in i = arguments[r]) t[n] = i[n];
            for (var o = 0; o < X.length; o++) n = X[o], Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
          }
        }

        function z(t, e) {
          this.a = t === Z && e || "", this.b = $
        }

        function Y(t) {
          return t instanceof z && t.constructor === z && t.b === $ ? t.a : (O("expected object of type Const, got '" + t + "'"), "type_error:Const")
        }

        z.prototype.na = !0, z.prototype.ma = function () {
          return this.a
        }, z.prototype.toString = function () {
          return "Const{" + this.a + "}"
        };
        var $ = {}, Z = {}, Q = new z(Z, "");

        function tt() {
          this.a = "", this.b = ot
        }

        function et(t) {
          return t instanceof tt && t.constructor === tt && t.b === ot ? t.a : (O("expected object of type TrustedResourceUrl, got '" + t + "' of type " + i(t)), "type_error:TrustedResourceUrl")
        }

        function nt(t, n) {
          var i = Y(t);
          if (!rt.test(i)) throw Error("Invalid TrustedResourceUrl format: " + i);
          return at(t = i.replace(it, function (t, e) {
            if (!Object.prototype.hasOwnProperty.call(n, e)) throw Error('Found marker, "' + e + '", in format string, "' + i + '", but no valid label mapping found in args: ' + JSON.stringify(n));
            return (t = n[e]) instanceof z ? Y(t) : encodeURIComponent(String(t))
          }))
        }

        tt.prototype.na = !0, tt.prototype.ma = function () {
          return this.a.toString()
        }, tt.prototype.toString = function () {
          return "TrustedResourceUrl{" + this.a + "}"
        };
        var it = /%{(\w+)}/g, rt = /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i,
          ot = {};

        function at(t) {
          var e = new tt;
          return e.a = t, e
        }

        var st = String.prototype.trim ? function (t) {
          return t.trim()
        } : function (t) {
          return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]
        }, ut = /&/g, ct = /</g, ht = />/g, ft = /"/g, lt = /'/g, dt = /\x00/g, pt = /[\x00&<>"']/;

        function vt(t, e) {
          return -1 != t.indexOf(e)
        }

        function mt(t, e) {
          return t < e ? -1 : e < t ? 1 : 0
        }

        function gt() {
          this.a = "", this.b = Tt
        }

        function bt(t) {
          return t instanceof gt && t.constructor === gt && t.b === Tt ? t.a : (O("expected object of type SafeUrl, got '" + t + "' of type " + i(t)), "type_error:SafeUrl")
        }

        gt.prototype.na = !0, gt.prototype.ma = function () {
          return this.a.toString()
        }, gt.prototype.toString = function () {
          return "SafeUrl{" + this.a + "}"
        };
        var yt = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;

        function wt(t) {
          return t instanceof gt ? t : (t = "object" == typeof t && t.na ? t.ma() : String(t), yt.test(t) || (t = "about:invalid#zClosurez"), kt(t))
        }

        var It, Tt = {};

        function kt(t) {
          var e = new gt;
          return e.a = t, e
        }

        kt("about:blank");
        t:{
          var Et = h.navigator;
          if (Et) {
            var St = Et.userAgent;
            if (St) {
              It = St;
              break t
            }
          }
          It = ""
        }

        function At(t) {
          return vt(It, t)
        }

        function Nt() {
          this.a = "", this.b = _t
        }

        function Ot(t) {
          return t instanceof Nt && t.constructor === Nt && t.b === _t ? t.a : (O("expected object of type SafeHtml, got '" + t + "' of type " + i(t)), "type_error:SafeHtml")
        }

        Nt.prototype.na = !0, Nt.prototype.ma = function () {
          return this.a.toString()
        }, Nt.prototype.toString = function () {
          return "SafeHtml{" + this.a + "}"
        };
        var _t = {};

        function Pt(t) {
          var e = new Nt;
          return e.a = t, e
        }

        Pt("<!DOCTYPE html>");
        var Ct, Rt, Dt = Pt("");

        function Lt(t, e) {
          for (var n = t.split("%s"), i = "", r = Array.prototype.slice.call(arguments, 1); r.length && 1 < n.length;) i += n.shift() + r.shift();
          return i + n.join("%s")
        }

        function xt(t) {
          return pt.test(t) && (-1 != t.indexOf("&") && (t = t.replace(ut, "&amp;")), -1 != t.indexOf("<") && (t = t.replace(ct, "&lt;")), -1 != t.indexOf(">") && (t = t.replace(ht, "&gt;")), -1 != t.indexOf('"') && (t = t.replace(ft, "&quot;")), -1 != t.indexOf("'") && (t = t.replace(lt, "&#39;")), -1 != t.indexOf("\0") && (t = t.replace(dt, "&#0;"))), t
        }

        function Mt(t) {
          h.setTimeout(function () {
            throw t
          }, 0)
        }

        function jt() {
          var t = h.MessageChannel;
          if (void 0 === t && "undefined" != typeof window && window.postMessage && window.addEventListener && !At("Presto") && (t = function () {
            var t = document.createElement("IFRAME");
            t.style.display = "none", function (t) {
              var e = at(Y(Q));
              L(t, "HTMLIFrameElement"), t.src = et(e).toString()
            }(t), document.documentElement.appendChild(t);
            var e = t.contentWindow;
            (t = e.document).open(), t.write(Ot(Dt)), t.close();
            var n = "callImmediate" + Math.random(),
              i = "file:" == e.location.protocol ? "*" : e.location.protocol + "//" + e.location.host;
            t = I(function (t) {
              "*" != i && t.origin != i || t.data != n || this.port1.onmessage()
            }, this), e.addEventListener("message", t, !1), this.port1 = {}, this.port2 = {
              postMessage: function () {
                e.postMessage(n, i)
              }
            }
          }), void 0 === t || At("Trident") || At("MSIE")) return "undefined" != typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function (t) {
            var e = document.createElement("SCRIPT");
            e.onreadystatechange = function () {
              e.onreadystatechange = null, e.parentNode.removeChild(e), e = null, t(), t = null
            }, document.documentElement.appendChild(e)
          } : function (t) {
            h.setTimeout(t, 0)
          };
          var e = new t, n = {}, i = n;
          return e.port1.onmessage = function () {
            if (void 0 !== n.next) {
              var t = (n = n.next).yb;
              n.yb = null, t()
            }
          }, function (t) {
            i.next = {yb: t}, i = i.next, e.port2.postMessage(0)
          }
        }

        function Ut(t, e) {
          Rt || function () {
            if (h.Promise && h.Promise.resolve) {
              var t = h.Promise.resolve(void 0);
              Rt = function () {
                t.then(Ft)
              }
            } else Rt = function () {
              var t = Ft;
              !m(h.setImmediate) || h.Window && h.Window.prototype && !At("Edge") && h.Window.prototype.setImmediate == h.setImmediate ? (Ct = Ct || jt())(t) : h.setImmediate(t)
            }
          }(), Vt || (Rt(), Vt = !0), Kt.add(t, e)
        }

        Pt("<br>");
        var Vt = !1, Kt = new C;

        function Ft() {
          for (var t; n = e = void 0, n = null, (e = Kt).a && (n = e.a, e.a = e.a.next, e.a || (e.b = null), n.next = null), t = n;) {
            try {
              t.a.call(t.b)
            } catch (t) {
              Mt(t)
            }
            P(R, t)
          }
          var e, n;
          Vt = !1
        }

        function qt(t, e) {
          if (this.a = Ht, this.i = void 0, this.f = this.b = this.c = null, this.g = this.h = !1, t != d) try {
            var n = this;
            t.call(e, function (t) {
              ee(n, Bt, t)
            }, function (t) {
              if (!(t instanceof ue)) try {
                if (t instanceof Error) throw t;
                throw Error("Promise rejected.")
              } catch (t) {
              }
              ee(n, Gt, t)
            })
          } catch (t) {
            ee(this, Gt, t)
          }
        }

        var Ht = 0, Bt = 2, Gt = 3;

        function Wt() {
          this.next = this.f = this.b = this.g = this.a = null, this.c = !1
        }

        Wt.prototype.reset = function () {
          this.f = this.b = this.g = this.a = null, this.c = !1
        };
        var Xt = new _(function () {
          return new Wt
        }, function (t) {
          t.reset()
        });

        function Jt(t, e, n) {
          var i = Xt.get();
          return i.g = t, i.b = e, i.f = n, i
        }

        function zt(t) {
          if (t instanceof qt) return t;
          var e = new qt(d);
          return ee(e, Bt, t), e
        }

        function Yt(n) {
          return new qt(function (t, e) {
            e(n)
          })
        }

        function $t(t, e, n) {
          ne(t, e, n, null) || Ut(T(e, t))
        }

        function Zt(n) {
          return new qt(function (i) {
            var r = n.length, o = [];
            if (r) for (var t = function (t, e, n) {
              r--, o[t] = e ? {Eb: !0, value: n} : {Eb: !1, reason: n}, 0 == r && i(o)
            }, e = 0; e < n.length; e++) $t(n[e], T(t, e, !0), T(t, e, !1)); else i(o)
          })
        }

        function Qt(t, e) {
          t.b || t.a != Bt && t.a != Gt || ie(t), t.f ? t.f.next = e : t.b = e, t.f = e
        }

        function te(t, r, o, a) {
          var e = Jt(null, null, null);
          return e.a = new qt(function (n, i) {
            e.g = r ? function (t) {
              try {
                var e = r.call(a, t);
                n(e)
              } catch (t) {
                i(t)
              }
            } : n, e.b = o ? function (t) {
              try {
                var e = o.call(a, t);
                void 0 === e && t instanceof ue ? i(t) : n(e)
              } catch (t) {
                i(t)
              }
            } : i
          }), Qt(e.a.c = t, e), e.a
        }

        function ee(t, e, n) {
          t.a == Ht && (t === n && (e = Gt, n = new TypeError("Promise cannot resolve to itself")), t.a = 1, ne(n, t.Lc, t.Mc, t) || (t.i = n, t.a = e, t.c = null, ie(t), e != Gt || n instanceof ue || function (t, e) {
            t.g = !0, Ut(function () {
              t.g && se.call(null, e)
            })
          }(t, n)))
        }

        function ne(t, e, n, i) {
          if (t instanceof qt) return Qt(t, Jt(e || d, n || null, i)), !0;
          if (S(t)) return t.then(e, n, i), !0;
          if (g(t)) try {
            var r = t.then;
            if (m(r)) return function (t, e, n, i, r) {
              function o(t) {
                a || (a = !0, i.call(r, t))
              }

              var a = !1;
              try {
                e.call(t, function (t) {
                  a || (a = !0, n.call(r, t))
                }, o)
              } catch (t) {
                o(t)
              }
            }(t, r, e, n, i), !0
          } catch (t) {
            return n.call(i, t), !0
          }
          return !1
        }

        function ie(t) {
          t.h || (t.h = !0, Ut(t.Wb, t))
        }

        function re(t) {
          var e = null;
          return t.b && (e = t.b, t.b = e.next, e.next = null), t.b || (t.f = null), e
        }

        function oe(t, e, n, i) {
          if (n == Gt && e.b && !e.c) for (; t && t.g; t = t.c) t.g = !1;
          if (e.a) e.a.c = null, ae(e, n, i); else try {
            e.c ? e.g.call(e.f) : ae(e, n, i)
          } catch (t) {
            se.call(null, t)
          }
          P(Xt, e)
        }

        function ae(t, e, n) {
          e == Bt ? t.g.call(t.f, n) : t.b && t.b.call(t.f, n)
        }

        qt.prototype.then = function (t, e, n) {
          return te(this, m(t) ? t : null, m(e) ? e : null, n)
        }, qt.prototype.$goog_Thenable = !0, (t = qt.prototype).ia = function (t, e) {
          return (t = Jt(t, t, e)).c = !0, Qt(this, t), this
        }, t.s = function (t, e) {
          return te(this, null, t, e)
        }, t.cancel = function (t) {
          this.a == Ht && Ut(function () {
            !function t(e, n) {
              if (e.a == Ht) if (e.c) {
                var i = e.c;
                if (i.b) {
                  for (var r = 0, o = null, a = null, s = i.b; s && (s.c || (r++, s.a == e && (o = s), !(o && 1 < r))); s = s.next) o || (a = s);
                  o && (i.a == Ht && 1 == r ? t(i, n) : (a ? ((r = a).next == i.f && (i.f = r), r.next = r.next.next) : re(i), oe(i, o, Gt, n)))
                }
                e.c = null
              } else ee(e, Gt, n)
            }(this, new ue(t))
          }, this)
        }, t.Lc = function (t) {
          this.a = Ht, ee(this, Bt, t)
        }, t.Mc = function (t) {
          this.a = Ht, ee(this, Gt, t)
        }, t.Wb = function () {
          for (var t; t = re(this);) oe(this, t, this.a, this.i);
          this.h = !1
        };
        var se = Mt;

        function ue(t) {
          A.call(this, t)
        }

        function ce() {
          this.qa = this.qa, this.ja = this.ja
        }

        E(ue, A);
        var he = 0;

        function fe(t) {
          if (!t.qa && (t.qa = !0, t.va(), 0 != he)) t[e] || (t[e] = ++b)
        }

        function le(t) {
          return le[" "](t), t
        }

        ce.prototype.qa = !(ue.prototype.name = "cancel"), ce.prototype.va = function () {
          if (this.ja) for (; this.ja.length;) this.ja.shift()()
        }, le[" "] = d;
        var de, pe, ve = At("Opera"), me = At("Trident") || At("MSIE"), ge = At("Edge"), be = ge || me,
          ye = At("Gecko") && !(vt(It.toLowerCase(), "webkit") && !At("Edge")) && !(At("Trident") || At("MSIE")) && !At("Edge"),
          we = vt(It.toLowerCase(), "webkit") && !At("Edge");

        function Ie() {
          var t = h.document;
          return t ? t.documentMode : void 0
        }

        t:{
          var Te = "",
            ke = (pe = It, ye ? /rv:([^\);]+)(\)|;)/.exec(pe) : ge ? /Edge\/([\d\.]+)/.exec(pe) : me ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(pe) : we ? /WebKit\/(\S+)/.exec(pe) : ve ? /(?:Version)[ \/]?(\S+)/.exec(pe) : void 0);
          if (ke && (Te = ke ? ke[1] : ""), me) {
            var Ee = Ie();
            if (null != Ee && Ee > parseFloat(Te)) {
              de = String(Ee);
              break t
            }
          }
          de = Te
        }
        var Se, Ae = {};

        function Ne(s) {
          return function (t, e) {
            var n = Ae;
            return Object.prototype.hasOwnProperty.call(n, t) ? n[t] : n[t] = e(t)
          }(s, function () {
            for (var t = 0, e = st(String(de)).split("."), n = st(String(s)).split("."), i = Math.max(e.length, n.length), r = 0; 0 == t && r < i; r++) {
              var o = e[r] || "", a = n[r] || "";
              do {
                if (o = /(\d*)(\D*)(.*)/.exec(o) || ["", "", "", ""], a = /(\d*)(\D*)(.*)/.exec(a) || ["", "", "", ""], 0 == o[0].length && 0 == a[0].length) break;
                t = mt(0 == o[1].length ? 0 : parseInt(o[1], 10), 0 == a[1].length ? 0 : parseInt(a[1], 10)) || mt(0 == o[2].length, 0 == a[2].length) || mt(o[2], a[2]), o = o[3], a = a[3]
              } while (0 == t)
            }
            return 0 <= t
          })
        }

        Se = h.document && me ? Ie() : void 0;
        var Oe = Object.freeze || function (t) {
          return t
        }, _e = !me || 9 <= Number(Se), Pe = me && !Ne("9"), Ce = function () {
          if (!h.addEventListener || !Object.defineProperty) return !1;
          var t = !1, e = Object.defineProperty({}, "passive", {
            get: function () {
              t = !0
            }
          });
          try {
            h.addEventListener("test", d, e), h.removeEventListener("test", d, e)
          } catch (t) {
          }
          return t
        }();

        function Re(t, e) {
          this.type = t, this.b = this.target = e, this.Kb = !0
        }

        function De(t, e) {
          if (Re.call(this, t ? t.type : ""), this.relatedTarget = this.b = this.target = null, this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0, this.key = "", this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1, this.pointerId = 0, this.pointerType = "", this.a = null, t) {
            var n = this.type = t.type, i = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : null;
            if (this.target = t.target || t.srcElement, this.b = e, e = t.relatedTarget) {
              if (ye) {
                t:{
                  try {
                    le(e.nodeName);
                    var r = !0;
                    break t
                  } catch (t) {
                  }
                  r = !1
                }
                r || (e = null)
              }
            } else "mouseover" == n ? e = t.fromElement : "mouseout" == n && (e = t.toElement);
            this.relatedTarget = e, i ? (this.clientX = void 0 !== i.clientX ? i.clientX : i.pageX, this.clientY = void 0 !== i.clientY ? i.clientY : i.pageY, this.screenX = i.screenX || 0, this.screenY = i.screenY || 0) : (this.clientX = void 0 !== t.clientX ? t.clientX : t.pageX, this.clientY = void 0 !== t.clientY ? t.clientY : t.pageY, this.screenX = t.screenX || 0, this.screenY = t.screenY || 0), this.button = t.button, this.key = t.key || "", this.ctrlKey = t.ctrlKey, this.altKey = t.altKey, this.shiftKey = t.shiftKey, this.metaKey = t.metaKey, this.pointerId = t.pointerId || 0, this.pointerType = f(t.pointerType) ? t.pointerType : Le[t.pointerType] || "", (this.a = t).defaultPrevented && this.preventDefault()
          }
        }

        Re.prototype.preventDefault = function () {
          this.Kb = !1
        }, E(De, Re);
        var Le = Oe({2: "touch", 3: "pen", 4: "mouse"});
        De.prototype.preventDefault = function () {
          De.qb.preventDefault.call(this);
          var t = this.a;
          if (t.preventDefault) t.preventDefault(); else if (t.returnValue = !1, Pe) try {
            (t.ctrlKey || 112 <= t.keyCode && t.keyCode <= 123) && (t.keyCode = -1)
          } catch (t) {
          }
        }, De.prototype.f = function () {
          return this.a
        };
        var xe = "closure_listenable_" + (1e6 * Math.random() | 0), Me = 0;

        function je(t, e, n, i, r) {
          this.listener = t, this.proxy = null, this.src = e, this.type = n, this.capture = !!i, this.Na = r, this.key = ++Me, this.oa = this.Ia = !1
        }

        function Ue(t) {
          t.oa = !0, t.listener = null, t.proxy = null, t.src = null, t.Na = null
        }

        function Ve(t) {
          this.src = t, this.a = {}, this.b = 0
        }

        function Ke(t, e) {
          var n = e.type;
          n in t.a && K(t.a[n], e) && (Ue(e), 0 == t.a[n].length && (delete t.a[n], t.b--))
        }

        function Fe(t, e, n, i) {
          for (var r = 0; r < t.length; ++r) {
            var o = t[r];
            if (!o.oa && o.listener == e && o.capture == !!n && o.Na == i) return r
          }
          return -1
        }

        Ve.prototype.add = function (t, e, n, i, r) {
          var o = t.toString();
          (t = this.a[o]) || (t = this.a[o] = [], this.b++);
          var a = Fe(t, e, i, r);
          return -1 < a ? (e = t[a], n || (e.Ia = !1)) : ((e = new je(e, this.src, o, !!i, r)).Ia = n, t.push(e)), e
        };
        var qe = "closure_lm_" + (1e6 * Math.random() | 0), He = {};

        function Be(t, e, n, i, r) {
          if (i && i.once) We(t, e, n, i, r); else if (p(e)) for (var o = 0; o < e.length; o++) Be(t, e[o], n, i, r); else n = en(n), t && t[xe] ? rn(t, e, n, g(i) ? !!i.capture : !!i, r) : Ge(t, e, n, !1, i, r)
        }

        function Ge(t, e, n, i, r, o) {
          if (!e) throw Error("Invalid event type");
          var a = g(r) ? !!r.capture : !!r, s = Qe(t);
          if (s || (t[qe] = s = new Ve(t)), !(n = s.add(e, n, i, a, o)).proxy) if (i = function () {
            var e = Ze, n = _e ? function (t) {
              return e.call(n.src, n.listener, t)
            } : function (t) {
              if (!(t = e.call(n.src, n.listener, t))) return t
            };
            return n
          }(), (n.proxy = i).src = t, i.listener = n, t.addEventListener) Ce || (r = a), void 0 === r && (r = !1), t.addEventListener(e.toString(), i, r); else if (t.attachEvent) t.attachEvent(ze(e.toString()), i); else {
            if (!t.addListener || !t.removeListener) throw Error("addEventListener and attachEvent are unavailable.");
            t.addListener(i)
          }
        }

        function We(t, e, n, i, r) {
          if (p(e)) for (var o = 0; o < e.length; o++) We(t, e[o], n, i, r); else n = en(n), t && t[xe] ? on(t, e, n, g(i) ? !!i.capture : !!i, r) : Ge(t, e, n, !0, i, r)
        }

        function Xe(t, e, n, i, r) {
          if (p(e)) for (var o = 0; o < e.length; o++) Xe(t, e[o], n, i, r); else i = g(i) ? !!i.capture : !!i, n = en(n), t && t[xe] ? (t = t.m, (e = String(e).toString()) in t.a && (-1 < (n = Fe(o = t.a[e], n, i, r)) && (Ue(o[n]), Array.prototype.splice.call(o, n, 1), 0 == o.length && (delete t.a[e], t.b--)))) : (t = t && Qe(t)) && (e = t.a[e.toString()], t = -1, e && (t = Fe(e, n, i, r)), (n = -1 < t ? e[t] : null) && Je(n))
        }

        function Je(t) {
          if ("number" != typeof t && t && !t.oa) {
            var e = t.src;
            if (e && e[xe]) Ke(e.m, t); else {
              var n = t.type, i = t.proxy;
              e.removeEventListener ? e.removeEventListener(n, i, t.capture) : e.detachEvent ? e.detachEvent(ze(n), i) : e.addListener && e.removeListener && e.removeListener(i), (n = Qe(e)) ? (Ke(n, t), 0 == n.b && (n.src = null, e[qe] = null)) : Ue(t)
            }
          }
        }

        function ze(t) {
          return t in He ? He[t] : He[t] = "on" + t
        }

        function Ye(t, e, n, i) {
          var r = !0;
          if ((t = Qe(t)) && (e = t.a[e.toString()])) for (e = e.concat(), t = 0; t < e.length; t++) {
            var o = e[t];
            o && o.capture == n && !o.oa && (o = $e(o, i), r = r && !1 !== o)
          }
          return r
        }

        function $e(t, e) {
          var n = t.listener, i = t.Na || t.src;
          return t.Ia && Je(t), n.call(i, e)
        }

        function Ze(t, e) {
          if (t.oa) return !0;
          if (_e) return $e(t, new De(e, this));
          if (!e) t:{
            e = ["window", "event"];
            for (var n = h, i = 0; i < e.length; i++) if (null == (n = n[e[i]])) {
              e = null;
              break t
            }
            e = n
          }
          if (e = new De(i = e, this), n = !0, !(i.keyCode < 0 || null != i.returnValue)) {
            t:{
              var r = !1;
              if (0 == i.keyCode) try {
                i.keyCode = -1;
                break t
              } catch (t) {
                r = !0
              }
              !r && null != i.returnValue || (i.returnValue = !0)
            }
            for (i = [], r = e.b; r; r = r.parentNode) i.push(r);
            for (t = t.type, r = i.length - 1; 0 <= r; r--) {
              e.b = i[r];
              var o = Ye(i[r], t, !0, e);
              n = n && o
            }
            for (r = 0; r < i.length; r++) e.b = i[r], o = Ye(i[r], t, !1, e), n = n && o
          }
          return n
        }

        function Qe(t) {
          return (t = t[qe]) instanceof Ve ? t : null
        }

        var tn = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);

        function en(e) {
          return m(e) ? e : (e[tn] || (e[tn] = function (t) {
            return e.handleEvent(t)
          }), e[tn])
        }

        function nn() {
          ce.call(this), this.m = new Ve(this), (this.Pb = this).Wa = null
        }

        function rn(t, e, n, i, r) {
          t.m.add(String(e), n, !1, i, r)
        }

        function on(t, e, n, i, r) {
          t.m.add(String(e), n, !0, i, r)
        }

        function an(t, e, n, i) {
          if (!(e = t.m.a[String(e)])) return !0;
          e = e.concat();
          for (var r = !0, o = 0; o < e.length; ++o) {
            var a = e[o];
            if (a && !a.oa && a.capture == n) {
              var s = a.listener, u = a.Na || a.src;
              a.Ia && Ke(t.m, a), r = !1 !== s.call(u, i) && r
            }
          }
          return r && 0 != i.Kb
        }

        function sn(t, e, n) {
          if (m(t)) n && (t = I(t, n)); else {
            if (!t || "function" != typeof t.handleEvent) throw Error("Invalid listener argument");
            t = I(t.handleEvent, t)
          }
          return 2147483647 < Number(e) ? -1 : h.setTimeout(t, e || 0)
        }

        function un(n) {
          var i = null;
          return new qt(function (t, e) {
            -1 == (i = sn(function () {
              t(void 0)
            }, n)) && e(Error("Failed to schedule timer."))
          }).s(function (t) {
            throw h.clearTimeout(i), t
          })
        }

        function cn(t) {
          if (t.S && "function" == typeof t.S) return t.S();
          if (f(t)) return t.split("");
          if (v(t)) {
            for (var e = [], n = t.length, i = 0; i < n; i++) e.push(t[i]);
            return e
          }
          for (i in e = [], n = 0, t) e[n++] = t[i];
          return e
        }

        function hn(t) {
          if (t.U && "function" == typeof t.U) return t.U();
          if (!t.S || "function" != typeof t.S) {
            if (v(t) || f(t)) {
              var e = [];
              t = t.length;
              for (var n = 0; n < t; n++) e.push(n);
              return e
            }
            for (var i in e = [], n = 0, t) e[n++] = i;
            return e
          }
        }

        function fn(t, e) {
          this.b = {}, this.a = [], this.c = 0;
          var n = arguments.length;
          if (1 < n) {
            if (n % 2) throw Error("Uneven number of arguments");
            for (var i = 0; i < n; i += 2) this.set(arguments[i], arguments[i + 1])
          } else if (t) if (t instanceof fn) for (n = t.U(), i = 0; i < n.length; i++) this.set(n[i], t.get(n[i])); else for (i in t) this.set(i, t[i])
        }

        function ln(t) {
          if (t.c != t.a.length) {
            for (var e = 0, n = 0; e < t.a.length;) {
              var i = t.a[e];
              dn(t.b, i) && (t.a[n++] = i), e++
            }
            t.a.length = n
          }
          if (t.c != t.a.length) {
            var r = {};
            for (n = e = 0; e < t.a.length;) dn(r, i = t.a[e]) || (r[t.a[n++] = i] = 1), e++;
            t.a.length = n
          }
        }

        function dn(t, e) {
          return Object.prototype.hasOwnProperty.call(t, e)
        }

        E(nn, ce), nn.prototype[xe] = !0, nn.prototype.addEventListener = function (t, e, n, i) {
          Be(this, t, e, n, i)
        }, nn.prototype.removeEventListener = function (t, e, n, i) {
          Xe(this, t, e, n, i)
        }, nn.prototype.dispatchEvent = function (t) {
          var e, n = this.Wa;
          if (n) for (e = []; n; n = n.Wa) e.push(n);
          n = this.Pb;
          var i = t.type || t;
          if (f(t)) t = new Re(t, n); else if (t instanceof Re) t.target = t.target || n; else {
            var r = t;
            J(t = new Re(i, n), r)
          }
          if (r = !0, e) for (var o = e.length - 1; 0 <= o; o--) {
            var a = t.b = e[o];
            r = an(a, i, !0, t) && r
          }
          if (r = an(a = t.b = n, i, !0, t) && r, r = an(a, i, !1, t) && r, e) for (o = 0; o < e.length; o++) r = an(a = t.b = e[o], i, !1, t) && r;
          return r
        }, nn.prototype.va = function () {
          if (nn.qb.va.call(this), this.m) {
            var t, e = this.m;
            for (t in e.a) {
              for (var n = e.a[t], i = 0; i < n.length; i++) Ue(n[i]);
              delete e.a[t], e.b--
            }
          }
          this.Wa = null
        }, (t = fn.prototype).S = function () {
          ln(this);
          for (var t = [], e = 0; e < this.a.length; e++) t.push(this.b[this.a[e]]);
          return t
        }, t.U = function () {
          return ln(this), this.a.concat()
        }, t.clear = function () {
          this.b = {}, this.c = this.a.length = 0
        }, t.get = function (t, e) {
          return dn(this.b, t) ? this.b[t] : e
        }, t.set = function (t, e) {
          dn(this.b, t) || (this.c++, this.a.push(t)), this.b[t] = e
        }, t.forEach = function (t, e) {
          for (var n = this.U(), i = 0; i < n.length; i++) {
            var r = n[i], o = this.get(r);
            t.call(e, o, r, this)
          }
        };
        var pn = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;

        function vn(t, e) {
          var n;
          this.b = this.i = this.f = "", this.m = null, this.g = this.c = "", this.h = !1, t instanceof vn ? (this.h = void 0 !== e ? e : t.h, mn(this, t.f), this.i = t.i, this.b = t.b, gn(this, t.m), this.c = t.c, bn(this, jn(t.a)), this.g = t.g) : t && (n = String(t).match(pn)) ? (this.h = !!e, mn(this, n[1] || "", !0), this.i = kn(n[2] || ""), this.b = kn(n[3] || "", !0), gn(this, n[4]), this.c = kn(n[5] || "", !0), bn(this, n[6] || "", !0), this.g = kn(n[7] || "")) : (this.h = !!e, this.a = new Cn(null, this.h))
        }

        function mn(t, e, n) {
          t.f = n ? kn(e, !0) : e, t.f && (t.f = t.f.replace(/:$/, ""))
        }

        function gn(t, e) {
          if (e) {
            if (e = Number(e), isNaN(e) || e < 0) throw Error("Bad port number " + e);
            t.m = e
          } else t.m = null
        }

        function bn(t, e, n) {
          e instanceof Cn ? (t.a = e, function (t, e) {
            e && !t.f && (Rn(t), t.c = null, t.a.forEach(function (t, e) {
              var n = e.toLowerCase();
              e != n && (Ln(this, e), Mn(this, n, t))
            }, t)), t.f = e
          }(t.a, t.h)) : (n || (e = En(e, _n)), t.a = new Cn(e, t.h))
        }

        function yn(t, e, n) {
          t.a.set(e, n)
        }

        function wn(t, e) {
          return t.a.get(e)
        }

        function In(t) {
          return t instanceof vn ? new vn(t) : new vn(t, void 0)
        }

        function Tn(t, e) {
          var n = new vn(null, void 0);
          return mn(n, "https"), t && (n.b = t), e && (n.c = e), n
        }

        function kn(t, e) {
          return t ? e ? decodeURI(t.replace(/%25/g, "%2525")) : decodeURIComponent(t) : ""
        }

        function En(t, e, n) {
          return f(t) ? (t = encodeURI(t).replace(e, Sn), n && (t = t.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), t) : null
        }

        function Sn(t) {
          return "%" + ((t = t.charCodeAt(0)) >> 4 & 15).toString(16) + (15 & t).toString(16)
        }

        vn.prototype.toString = function () {
          var t = [], e = this.f;
          e && t.push(En(e, An, !0), ":");
          var n = this.b;
          return !n && "file" != e || (t.push("//"), (e = this.i) && t.push(En(e, An, !0), "@"), t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), null != (n = this.m) && t.push(":", String(n))), (n = this.c) && (this.b && "/" != n.charAt(0) && t.push("/"), t.push(En(n, "/" == n.charAt(0) ? On : Nn, !0))), (n = this.a.toString()) && t.push("?", n), (n = this.g) && t.push("#", En(n, Pn)), t.join("")
        }, vn.prototype.resolve = function (t) {
          var e = new vn(this), n = !!t.f;
          n ? mn(e, t.f) : n = !!t.i, n ? e.i = t.i : n = !!t.b, n ? e.b = t.b : n = null != t.m;
          var i = t.c;
          if (n) gn(e, t.m); else if (n = !!t.c) {
            if ("/" != i.charAt(0)) if (this.b && !this.c) i = "/" + i; else {
              var r = e.c.lastIndexOf("/");
              -1 != r && (i = e.c.substr(0, r + 1) + i)
            }
            if (".." == (r = i) || "." == r) i = ""; else if (vt(r, "./") || vt(r, "/.")) {
              i = 0 == r.lastIndexOf("/", 0), r = r.split("/");
              for (var o = [], a = 0; a < r.length;) {
                var s = r[a++];
                "." == s ? i && a == r.length && o.push("") : ".." == s ? ((1 < o.length || 1 == o.length && "" != o[0]) && o.pop(), i && a == r.length && o.push("")) : (o.push(s), i = !0)
              }
              i = o.join("/")
            } else i = r
          }
          return n ? e.c = i : n = "" !== t.a.toString(), n ? bn(e, jn(t.a)) : n = !!t.g, n && (e.g = t.g), e
        };
        var An = /[#\/\?@]/g, Nn = /[#\?:]/g, On = /[#\?]/g, _n = /[#\?@]/g, Pn = /#/g;

        function Cn(t, e) {
          this.b = this.a = null, this.c = t || null, this.f = !!e
        }

        function Rn(n) {
          n.a || (n.a = new fn, n.b = 0, n.c && function (t, e) {
            if (t) {
              t = t.split("&");
              for (var n = 0; n < t.length; n++) {
                var i = t[n].indexOf("="), r = null;
                if (0 <= i) {
                  var o = t[n].substring(0, i);
                  r = t[n].substring(i + 1)
                } else o = t[n];
                e(o, r ? decodeURIComponent(r.replace(/\+/g, " ")) : "")
              }
            }
          }(n.c, function (t, e) {
            n.add(decodeURIComponent(t.replace(/\+/g, " ")), e)
          }))
        }

        function Dn(t) {
          var e = hn(t);
          if (void 0 === e) throw Error("Keys are undefined");
          var n = new Cn(null, void 0);
          t = cn(t);
          for (var i = 0; i < e.length; i++) {
            var r = e[i], o = t[i];
            p(o) ? Mn(n, r, o) : n.add(r, o)
          }
          return n
        }

        function Ln(t, e) {
          Rn(t), e = Un(t, e), dn(t.a.b, e) && (t.c = null, t.b -= t.a.get(e).length, dn((t = t.a).b, e) && (delete t.b[e], t.c--, t.a.length > 2 * t.c && ln(t)))
        }

        function xn(t, e) {
          return Rn(t), e = Un(t, e), dn(t.a.b, e)
        }

        function Mn(t, e, n) {
          Ln(t, e), 0 < n.length && (t.c = null, t.a.set(Un(t, e), H(n)), t.b += n.length)
        }

        function jn(t) {
          var e = new Cn;
          return e.c = t.c, t.a && (e.a = new fn(t.a), e.b = t.b), e
        }

        function Un(t, e) {
          return e = String(e), t.f && (e = e.toLowerCase()), e
        }

        (t = Cn.prototype).add = function (t, e) {
          Rn(this), this.c = null, t = Un(this, t);
          var n = this.a.get(t);
          return n || this.a.set(t, n = []), n.push(e), this.b += 1, this
        }, t.clear = function () {
          this.a = this.c = null, this.b = 0
        }, t.forEach = function (n, i) {
          Rn(this), this.a.forEach(function (t, e) {
            M(t, function (t) {
              n.call(i, t, e, this)
            }, this)
          }, this)
        }, t.U = function () {
          Rn(this);
          for (var t = this.a.S(), e = this.a.U(), n = [], i = 0; i < e.length; i++) for (var r = t[i], o = 0; o < r.length; o++) n.push(e[i]);
          return n
        }, t.S = function (t) {
          Rn(this);
          var e = [];
          if (f(t)) xn(this, t) && (e = q(e, this.a.get(Un(this, t)))); else {
            t = this.a.S();
            for (var n = 0; n < t.length; n++) e = q(e, t[n])
          }
          return e
        }, t.set = function (t, e) {
          return Rn(this), this.c = null, xn(this, t = Un(this, t)) && (this.b -= this.a.get(t).length), this.a.set(t, [e]), this.b += 1, this
        }, t.get = function (t, e) {
          return t && 0 < (t = this.S(t)).length ? String(t[0]) : e
        }, t.toString = function () {
          if (this.c) return this.c;
          if (!this.a) return "";
          for (var t = [], e = this.a.U(), n = 0; n < e.length; n++) {
            var i = e[n], r = encodeURIComponent(String(i));
            i = this.S(i);
            for (var o = 0; o < i.length; o++) {
              var a = r;
              "" !== i[o] && (a += "=" + encodeURIComponent(String(i[o]))), t.push(a)
            }
          }
          return this.c = t.join("&")
        };
        var Vn = !me || 9 <= Number(Se);

        function Kn(t) {
          var e = document;
          return f(t) ? e.getElementById(t) : t
        }

        function Fn(n, t) {
          B(t, function (t, e) {
            t && "object" == typeof t && t.na && (t = t.ma()), "style" == e ? n.style.cssText = t : "class" == e ? n.className = t : "for" == e ? n.htmlFor = t : qn.hasOwnProperty(e) ? n.setAttribute(qn[e], t) : 0 == e.lastIndexOf("aria-", 0) || 0 == e.lastIndexOf("data-", 0) ? n.setAttribute(e, t) : n[e] = t
          })
        }

        var qn = {
          cellpadding: "cellPadding",
          cellspacing: "cellSpacing",
          colspan: "colSpan",
          frameborder: "frameBorder",
          height: "height",
          maxlength: "maxLength",
          nonce: "nonce",
          role: "role",
          rowspan: "rowSpan",
          type: "type",
          usemap: "useMap",
          valign: "vAlign",
          width: "width"
        };

        function Hn(t, e, n) {
          var i = arguments, r = document, o = String(i[0]), a = i[1];
          if (!Vn && a && (a.name || a.type)) {
            if (o = ["<", o], a.name && o.push(' name="', xt(a.name), '"'), a.type) {
              o.push(' type="', xt(a.type), '"');
              var s = {};
              J(s, a), delete s.type, a = s
            }
            o.push(">"), o = o.join("")
          }
          return o = r.createElement(o), a && (f(a) ? o.className = a : p(a) ? o.className = a.join(" ") : Fn(o, a)), 2 < i.length && function (e, n, t) {
            function i(t) {
              t && n.appendChild(f(t) ? e.createTextNode(t) : t)
            }

            for (var r = 2; r < t.length; r++) {
              var o = t[r];
              !v(o) || g(o) && 0 < o.nodeType ? i(o) : M(Bn(o) ? H(o) : o, i)
            }
          }(r, o, i), o
        }

        function Bn(t) {
          if (t && "number" == typeof t.length) {
            if (g(t)) return "function" == typeof t.item || "string" == typeof t.item;
            if (m(t)) return "function" == typeof t.item
          }
          return !1
        }

        function Gn(t) {
          var e = [];
          return function t(e, n, i) {
            if (null == n) i.push("null"); else {
              if ("object" == typeof n) {
                if (p(n)) {
                  var r = n;
                  n = r.length, i.push("[");
                  for (var o = "", a = 0; a < n; a++) i.push(o), t(e, r[a], i), o = ",";
                  return void i.push("]")
                }
                if (!(n instanceof String || n instanceof Number || n instanceof Boolean)) {
                  for (r in i.push("{"), o = "", n) Object.prototype.hasOwnProperty.call(n, r) && ("function" != typeof (a = n[r]) && (i.push(o), zn(r, i), i.push(":"), t(e, a, i), o = ","));
                  return void i.push("}")
                }
                n = n.valueOf()
              }
              switch (typeof n) {
                case"string":
                  zn(n, i);
                  break;
                case"number":
                  i.push(isFinite(n) && !isNaN(n) ? String(n) : "null");
                  break;
                case"boolean":
                  i.push(String(n));
                  break;
                case"function":
                  i.push("null");
                  break;
                default:
                  throw Error("Unknown type: " + typeof n)
              }
            }
          }(new Wn, t, e), e.join("")
        }

        function Wn() {
        }

        var Xn = {
          '"': '\\"',
          "\\": "\\\\",
          "/": "\\/",
          "\b": "\\b",
          "\f": "\\f",
          "\n": "\\n",
          "\r": "\\r",
          "\t": "\\t",
          "\v": "\\u000b"
        }, Jn = /\uffff/.test("￿") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g;

        function zn(t, e) {
          e.push('"', t.replace(Jn, function (t) {
            var e = Xn[t];
            return e || (e = "\\u" + (65536 | t.charCodeAt(0)).toString(16).substr(1), Xn[t] = e), e
          }), '"')
        }

        function Yn() {
          var t = vi();
          return me && !!Se && 11 == Se || /Edge\/\d+/.test(t)
        }

        function $n() {
          return h.window && h.window.location.href || self && self.location && self.location.href || ""
        }

        function Zn(t, e) {
          e = e || h.window;
          var n = "about:blank";
          t && (n = bt(wt(t)).toString()), e.location.href = n
        }

        function Qn(t) {
          return !!((t = (t || vi()).toLowerCase()).match(/android/) || t.match(/webos/) || t.match(/iphone|ipad|ipod/) || t.match(/blackberry/) || t.match(/windows phone/) || t.match(/iemobile/))
        }

        function ti(t) {
          t = t || h.window;
          try {
            t.close()
          } catch (t) {
          }
        }

        function ei(t, e, n) {
          var i = Math.floor(1e9 * Math.random()).toString();
          e = e || 500, n = n || 600;
          var r = (window.screen.availHeight - n) / 2, o = (window.screen.availWidth - e) / 2;
          for (a in e = {
            width: e,
            height: n,
            top: 0 < r ? r : 0,
            left: 0 < o ? o : 0,
            location: !0,
            resizable: !0,
            statusbar: !0,
            toolbar: !1
          }, n = vi().toLowerCase(), i && (e.target = i, vt(n, "crios/") && (e.target = "_blank")), li(vi()) == hi && (t = t || "http://localhost", e.scrollbars = !0), n = t || "", (t = e) || (t = {}), i = window, e = n instanceof gt ? n : wt(void 0 !== n.href ? n.href : String(n)), n = t.target || n.target, r = [], t) switch (a) {
            case"width":
            case"height":
            case"top":
            case"left":
              r.push(a + "=" + t[a]);
              break;
            case"target":
            case"noopener":
            case"noreferrer":
              break;
            default:
              r.push(a + "=" + (t[a] ? 1 : 0))
          }
          var a = r.join(",");
          if ((At("iPhone") && !At("iPod") && !At("iPad") || At("iPad") || At("iPod")) && i.navigator && i.navigator.standalone && n && "_self" != n ? (L(a = i.document.createElement("A"), "HTMLAnchorElement"), e instanceof gt || e instanceof gt || (e = "object" == typeof e && e.na ? e.ma() : String(e), yt.test(e) || (e = "about:invalid#zClosurez"), e = kt(e)), a.href = bt(e), a.setAttribute("target", n), t.noreferrer && a.setAttribute("rel", "noreferrer"), (t = document.createEvent("MouseEvent")).initMouseEvent("click", !0, !0, i, 1), a.dispatchEvent(t), a = {}) : t.noreferrer ? (a = i.open("", n, a), t = bt(e).toString(), a && (be && vt(t, ";") && (t = "'" + t.replace(/'/g, "%27") + "'"), a.opener = null, t = Pt('<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=' + xt(t) + '">'), a.document.write(Ot(t)), a.document.close())) : (a = i.open(bt(e).toString(), n, a)) && t.noopener && (a.opener = null), a) try {
            a.focus()
          } catch (t) {
          }
          return a
        }

        var ni = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, ii = /^[^@]+@[^@]+$/;

        function ri() {
          var e = null;
          return new qt(function (t) {
            "complete" == h.document.readyState ? t() : (e = function () {
              t()
            }, We(window, "load", e))
          }).s(function (t) {
            throw Xe(window, "load", e), t
          })
        }

        function oi(t) {
          return t = t || vi(), !("file:" !== wi() || !t.toLowerCase().match(/iphone|ipad|ipod|android/))
        }

        function ai() {
          var t = h.window;
          try {
            return !(!t || t == t.top)
          } catch (t) {
            return !1
          }
        }

        function si() {
          return void 0 !== h.WorkerGlobalScope && "function" == typeof h.importScripts
        }

        function ui() {
          return $h.INTERNAL.hasOwnProperty("reactNative") ? "ReactNative" : $h.INTERNAL.hasOwnProperty("node") ? "Node" : si() ? "Worker" : "Browser"
        }

        function ci() {
          var t = ui();
          return "ReactNative" === t || "Node" === t
        }

        var hi = "Firefox", fi = "Chrome";

        function li(t) {
          var e = t.toLowerCase();
          return vt(e, "opera/") || vt(e, "opr/") || vt(e, "opios/") ? "Opera" : vt(e, "iemobile") ? "IEMobile" : vt(e, "msie") || vt(e, "trident/") ? "IE" : vt(e, "edge/") ? "Edge" : vt(e, "firefox/") ? hi : vt(e, "silk/") ? "Silk" : vt(e, "blackberry") ? "Blackberry" : vt(e, "webos") ? "Webos" : !vt(e, "safari/") || vt(e, "chrome/") || vt(e, "crios/") || vt(e, "android") ? !vt(e, "chrome/") && !vt(e, "crios/") || vt(e, "edge/") ? vt(e, "android") ? "Android" : (t = t.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/)) && 2 == t.length ? t[1] : "Other" : fi : "Safari"
        }

        var di = {Sc: "FirebaseCore-web", Uc: "FirebaseUI-web"};

        function pi(t, e) {
          e = e || [];
          var n, i = [], r = {};
          for (n in di) r[di[n]] = !0;
          for (n = 0; n < e.length; n++) void 0 !== r[e[n]] && (delete r[e[n]], i.push(e[n]));
          return i.sort(), (e = i).length || (e = ["FirebaseCore-web"]), "Browser" === (i = ui()) ? i = li(r = vi()) : "Worker" === i && (i = li(r = vi()) + "-" + i), i + "/JsCore/" + t + "/" + e.join(",")
        }

        function vi() {
          return h.navigator && h.navigator.userAgent || ""
        }

        function mi(t, e) {
          t = t.split("."), e = e || h;
          for (var n = 0; n < t.length && "object" == typeof e && null != e; n++) e = e[t[n]];
          return n != t.length && (e = void 0), e
        }

        function gi() {
          try {
            var t = h.localStorage, e = Si();
            if (t) return t.setItem(e, "1"), t.removeItem(e), !Yn() || !!h.indexedDB
          } catch (t) {
            return si() && !!h.indexedDB
          }
          return !1
        }

        function bi() {
          return (yi() || "chrome-extension:" === wi() || oi()) && !ci() && gi() && !si()
        }

        function yi() {
          return "http:" === wi() || "https:" === wi()
        }

        function wi() {
          return h.location && h.location.protocol || null
        }

        function Ii(t) {
          return !Qn(t = t || vi()) && li(t) != hi
        }

        function Ti(t) {
          return void 0 === t ? null : Gn(t)
        }

        function ki(t) {
          var e, n = {};
          for (e in t) t.hasOwnProperty(e) && null !== t[e] && void 0 !== t[e] && (n[e] = t[e]);
          return n
        }

        function Ei(t) {
          if (null !== t) return JSON.parse(t)
        }

        function Si(t) {
          return t || Math.floor(1e9 * Math.random()).toString()
        }

        function Ai(t) {
          return "Safari" != li(t = t || vi()) && !t.toLowerCase().match(/iphone|ipad|ipod/)
        }

        function Ni() {
          var t = h.___jsl;
          if (t && t.H) for (var e in t.H) if (t.H[e].r = t.H[e].r || [], t.H[e].L = t.H[e].L || [], t.H[e].r = t.H[e].L.concat(), t.CP) for (var n = 0; n < t.CP.length; n++) t.CP[n] = null
        }

        function Oi(t, e) {
          if (e < t) throw Error("Short delay should be less than long delay!");
          this.a = t, this.c = e, t = vi(), e = ui(), this.b = Qn(t) || "ReactNative" === e
        }

        function _i() {
          var t = h.document;
          return !t || void 0 === t.visibilityState || "visible" == t.visibilityState
        }

        function Pi(t) {
          try {
            var e = new Date(parseInt(t, 10));
            if (!isNaN(e.getTime()) && !/[^0-9]/.test(t)) return e.toUTCString()
          } catch (t) {
          }
          return null
        }

        function Ci() {
          return !(!mi("fireauth.oauthhelper", h) && !mi("fireauth.iframe", h))
        }

        Oi.prototype.get = function () {
          var t = h.navigator;
          return !t || "boolean" != typeof t.onLine || !yi() && "chrome-extension:" !== wi() && void 0 === t.connection || t.onLine ? this.b ? this.c : this.a : Math.min(5e3, this.a)
        };
        var Ri, Di = {};

        function Li(t) {
          Di[t] || (Di[t] = !0, "undefined" != typeof console && "function" == typeof console.warn && console.warn(t))
        }

        try {
          var xi = {};
          Object.defineProperty(xi, "abcd", {
            configurable: !0,
            enumerable: !0,
            value: 1
          }), Object.defineProperty(xi, "abcd", {configurable: !0, enumerable: !0, value: 2}), Ri = 2 == xi.abcd
        } catch (t) {
          Ri = !1
        }

        function Mi(t, e, n) {
          Ri ? Object.defineProperty(t, e, {configurable: !0, enumerable: !0, value: n}) : t[e] = n
        }

        function ji(t, e) {
          if (e) for (var n in e) e.hasOwnProperty(n) && Mi(t, n, e[n])
        }

        function Ui(t) {
          var e = {};
          return ji(e, t), e
        }

        function Vi(t) {
          var e = t;
          if ("object" == typeof t && null != t) for (var n in e = "length" in t ? [] : {}, t) Mi(e, n, Vi(t[n]));
          return e
        }

        function Ki(t) {
          var e = {}, n = t[qi], i = t[Hi];
          if (!(t = t[Bi]) || t != Fi && !n) throw Error("Invalid provider user info!");
          e[Wi] = i || null, e[Gi] = n || null, Mi(this, Ji, t), Mi(this, Xi, Vi(e))
        }

        var Fi = "EMAIL_SIGNIN", qi = "email", Hi = "newEmail", Bi = "requestType", Gi = "email", Wi = "fromEmail",
          Xi = "data", Ji = "operation";

        function zi(t, e) {
          this.code = $i + t, this.message = e || Zi[t] || ""
        }

        function Yi(t) {
          var e = t && t.code;
          return e ? new zi(e.substring($i.length), t.message) : null
        }

        E(zi, Error), zi.prototype.w = function () {
          return {code: this.code, message: this.message}
        }, zi.prototype.toJSON = function () {
          return this.w()
        };
        var $i = "auth/", Zi = {
          "admin-restricted-operation": "This operation is restricted to administrators only.",
          "argument-error": "",
          "app-not-authorized": "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
          "app-not-installed": "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
          "captcha-check-failed": "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
          "code-expired": "The SMS code has expired. Please re-send the verification code to try again.",
          "cordova-not-ready": "Cordova framework is not ready.",
          "cors-unsupported": "This browser is not supported.",
          "credential-already-in-use": "This credential is already associated with a different user account.",
          "custom-token-mismatch": "The custom token corresponds to a different audience.",
          "requires-recent-login": "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
          "dynamic-link-not-activated": "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
          "email-already-in-use": "The email address is already in use by another account.",
          "expired-action-code": "The action code has expired. ",
          "cancelled-popup-request": "This operation has been cancelled due to another conflicting popup being opened.",
          "internal-error": "An internal error has occurred.",
          "invalid-app-credential": "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
          "invalid-app-id": "The mobile app identifier is not registed for the current project.",
          "invalid-user-token": "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
          "invalid-auth-event": "An internal error has occurred.",
          "invalid-verification-code": "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.",
          "invalid-continue-uri": "The continue URL provided in the request is invalid.",
          "invalid-cordova-configuration": "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
          "invalid-custom-token": "The custom token format is incorrect. Please check the documentation.",
          "invalid-dynamic-link-domain": "The provided dynamic link domain is not configured or authorized for the current project.",
          "invalid-email": "The email address is badly formatted.",
          "invalid-api-key": "Your API key is invalid, please check you have copied it correctly.",
          "invalid-cert-hash": "The SHA-1 certificate hash provided is invalid.",
          "invalid-credential": "The supplied auth credential is malformed or has expired.",
          "invalid-message-payload": "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
          "invalid-oauth-provider": "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
          "invalid-oauth-client-id": "The OAuth client ID provided is either invalid or does not match the specified API key.",
          "unauthorized-domain": "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
          "invalid-action-code": "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
          "wrong-password": "The password is invalid or the user does not have a password.",
          "invalid-persistence-type": "The specified persistence type is invalid. It can only be local, session or none.",
          "invalid-phone-number": "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
          "invalid-provider-id": "The specified provider ID is invalid.",
          "invalid-recipient-email": "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
          "invalid-sender": "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
          "invalid-verification-id": "The verification ID used to create the phone auth credential is invalid.",
          "missing-android-pkg-name": "An Android Package Name must be provided if the Android App is required to be installed.",
          "auth-domain-config-required": "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
          "missing-app-credential": "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
          "missing-verification-code": "The phone auth credential was created with an empty SMS verification code.",
          "missing-continue-uri": "A continue URL must be provided in the request.",
          "missing-iframe-start": "An internal error has occurred.",
          "missing-ios-bundle-id": "An iOS Bundle ID must be provided if an App Store ID is provided.",
          "missing-or-invalid-nonce": "The OIDC ID token requires a valid unhashed nonce.",
          "missing-phone-number": "To send verification codes, provide a phone number for the recipient.",
          "missing-verification-id": "The phone auth credential was created with an empty verification ID.",
          "app-deleted": "This instance of FirebaseApp has been deleted.",
          "account-exists-with-different-credential": "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
          "network-request-failed": "A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
          "no-auth-event": "An internal error has occurred.",
          "no-such-provider": "User was not linked to an account with the given provider.",
          "null-user": "A null user object was provided as the argument for an operation which requires a non-null user object.",
          "operation-not-allowed": "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
          "operation-not-supported-in-this-environment": 'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
          "popup-blocked": "Unable to establish a connection with the popup. It may have been blocked by the browser.",
          "popup-closed-by-user": "The popup has been closed by the user before finalizing the operation.",
          "provider-already-linked": "User can only be linked to one identity for the given provider.",
          "quota-exceeded": "The project's quota for this operation has been exceeded.",
          "redirect-cancelled-by-user": "The redirect operation has been cancelled by the user before finalizing.",
          "redirect-operation-pending": "A redirect sign-in operation is already pending.",
          "rejected-credential": "The request contains malformed or mismatching credentials.",
          timeout: "The operation has timed out.",
          "user-token-expired": "The user's credential is no longer valid. The user must sign in again.",
          "too-many-requests": "We have blocked all requests from this device due to unusual activity. Try again later.",
          "unauthorized-continue-uri": "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
          "unsupported-persistence-type": "The current environment does not support the specified persistence type.",
          "user-cancelled": "User did not grant your application the permissions it requested.",
          "user-not-found": "There is no user record corresponding to this identifier. The user may have been deleted.",
          "user-disabled": "The user account has been disabled by an administrator.",
          "user-mismatch": "The supplied credentials do not correspond to the previously signed in user.",
          "user-signed-out": "",
          "weak-password": "The password must be 6 characters long or more.",
          "web-storage-unsupported": "This browser is not supported or 3rd party cookies and data may be disabled."
        };

        function Qi(t) {
          var e = t[rr];
          if (void 0 === e) throw new zi("missing-continue-uri");
          if ("string" != typeof e || "string" == typeof e && !e.length) throw new zi("invalid-continue-uri");
          this.h = e, this.b = this.a = null, this.g = !1;
          var n = t[tr];
          if (n && "object" == typeof n) {
            e = n[sr];
            var i = n[or];
            if (n = n[ar], "string" == typeof e && e.length) {
              if (this.a = e, void 0 !== i && "boolean" != typeof i) throw new zi("argument-error", or + " property must be a boolean when specified.");
              if (this.g = !!i, void 0 !== n && ("string" != typeof n || "string" == typeof n && !n.length)) throw new zi("argument-error", ar + " property must be a non empty string when specified.");
              this.b = n || null
            } else {
              if (void 0 !== e) throw new zi("argument-error", sr + " property must be a non empty string when specified.");
              if (void 0 !== i || void 0 !== n) throw new zi("missing-android-pkg-name")
            }
          } else if (void 0 !== n) throw new zi("argument-error", tr + " property must be a non null object when specified.");
          if (this.f = null, (e = t[ir]) && "object" == typeof e) {
            if ("string" == typeof (e = e[ur]) && e.length) this.f = e; else if (void 0 !== e) throw new zi("argument-error", ur + " property must be a non empty string when specified.")
          } else if (void 0 !== e) throw new zi("argument-error", ir + " property must be a non null object when specified.");
          if (void 0 !== (e = t[nr]) && "boolean" != typeof e) throw new zi("argument-error", nr + " property must be a boolean when specified.");
          if (this.c = !!e, void 0 !== (t = t[er]) && ("string" != typeof t || "string" == typeof t && !t.length)) throw new zi("argument-error", er + " property must be a non empty string when specified.");
          this.i = t || null
        }

        var tr = "android", er = "dynamicLinkDomain", nr = "handleCodeInApp", ir = "iOS", rr = "url", or = "installApp",
          ar = "minimumVersion", sr = "packageName", ur = "bundleId";

        function cr(t) {
          var e = {};
          for (var n in e.continueUrl = t.h, e.canHandleCodeInApp = t.c, (e.androidPackageName = t.a) && (e.androidMinimumVersion = t.b, e.androidInstallApp = t.g), e.iOSBundleId = t.f, e.dynamicLinkDomain = t.i, e) null === e[n] && delete e[n];
          return e
        }

        var hr = null, fr = null;

        function lr(t) {
          var e = "";
          return function (i, t) {
            function e(t) {
              for (; r < i.length;) {
                var e = i.charAt(r++), n = fr[e];
                if (null != n) return n;
                if (!/^[\s\xa0]*$/.test(e)) throw Error("Unknown base64 encoding at char: " + e)
              }
              return t
            }

            !function () {
              if (!hr) {
                hr = {}, fr = {};
                for (var t = 0; t < 65; t++) hr[t] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(t), 62 <= (fr[hr[t]] = t) && (fr["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(t)] = t)
              }
            }();
            for (var r = 0; ;) {
              var n = e(-1), o = e(0), a = e(64), s = e(64);
              if (64 === s && -1 === n) break;
              t(n << 2 | o >> 4), 64 != a && (t(o << 4 & 240 | a >> 2), 64 != s && t(a << 6 & 192 | s))
            }
          }(t, function (t) {
            e += String.fromCharCode(t)
          }), e
        }

        function dr(t) {
          this.c = t.sub, this.a = t.provider_id || t.firebase && t.firebase.sign_in_provider || null, this.b = !!t.is_anonymous || "anonymous" == this.a
        }

        function pr(t) {
          return (t = vr(t)) && t.sub && t.iss && t.aud && t.exp ? new dr(t) : null
        }

        function vr(t) {
          if (!t) return null;
          if (3 != (t = t.split(".")).length) return null;
          for (var e = (4 - (t = t[1]).length % 4) % 4, n = 0; n < e; n++) t += ".";
          try {
            return JSON.parse(lr(t))
          } catch (t) {
          }
          return null
        }

        dr.prototype.f = function () {
          return this.b
        };
        var mr, gr = {
          Yc: {
            bb: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/",
            jb: "https://securetoken.googleapis.com/v1/token",
            id: "p"
          },
          $c: {
            bb: "https://staging-www.sandbox.googleapis.com/identitytoolkit/v3/relyingparty/",
            jb: "https://staging-securetoken.sandbox.googleapis.com/v1/token",
            id: "s"
          },
          ad: {
            bb: "https://www-googleapis-test.sandbox.google.com/identitytoolkit/v3/relyingparty/",
            jb: "https://test-securetoken.sandbox.googleapis.com/v1/token",
            id: "t"
          }
        };

        function br(t) {
          for (var e in gr) if (gr[e].id === t) return {firebaseEndpoint: (t = gr[e]).bb, secureTokenEndpoint: t.jb};
          return null
        }

        mr = br("__EID__") ? "__EID__" : void 0;
        var yr = "oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version".split(" "),
          wr = ["client_id", "response_type", "scope", "redirect_uri", "state"], Ir = {
            Tc: {Oa: "locale", Ba: 500, Aa: 600, Pa: "facebook.com", ib: wr},
            Vc: {Oa: null, Ba: 500, Aa: 620, Pa: "github.com", ib: wr},
            Wc: {Oa: "hl", Ba: 515, Aa: 680, Pa: "google.com", ib: wr},
            bd: {Oa: "lang", Ba: 485, Aa: 705, Pa: "twitter.com", ib: yr}
          };

        function Tr(t) {
          for (var e in Ir) if (Ir[e].Pa == t) return Ir[e];
          return null
        }

        function kr(t) {
          var e = {};
          e["facebook.com"] = Or, e["google.com"] = Pr, e["github.com"] = _r, e["twitter.com"] = Cr;
          var n = t && t[Sr];
          try {
            if (n) return e[n] ? new e[n](t) : new Nr(t);
            if (void 0 !== t[Er]) return new Ar(t)
          } catch (t) {
          }
          return null
        }

        var Er = "idToken", Sr = "providerId";

        function Ar(t) {
          var e = t[Sr];
          if (!e && t[Er]) {
            var n = pr(t[Er]);
            n && n.a && (e = n.a)
          }
          if (!e) throw Error("Invalid additional user info!");
          "anonymous" != e && "custom" != e || (e = null), n = !1, void 0 !== t.isNewUser ? n = !!t.isNewUser : "identitytoolkit#SignupNewUserResponse" === t.kind && (n = !0), Mi(this, "providerId", e), Mi(this, "isNewUser", n)
        }

        function Nr(t) {
          Ar.call(this, t), Mi(this, "profile", Vi((t = Ei(t.rawUserInfo || "{}")) || {}))
        }

        function Or(t) {
          if (Nr.call(this, t), "facebook.com" != this.providerId) throw Error("Invalid provider ID!")
        }

        function _r(t) {
          if (Nr.call(this, t), "github.com" != this.providerId) throw Error("Invalid provider ID!");
          Mi(this, "username", this.profile && this.profile.login || null)
        }

        function Pr(t) {
          if (Nr.call(this, t), "google.com" != this.providerId) throw Error("Invalid provider ID!")
        }

        function Cr(t) {
          if (Nr.call(this, t), "twitter.com" != this.providerId) throw Error("Invalid provider ID!");
          Mi(this, "username", t.screenName || null)
        }

        function Rr(t) {
          this.a = In(t)
        }

        function Dr(t) {
          var e = In(t), n = wn(e, "link"), i = wn(In(n), "link");
          return wn(In(e = wn(e, "deep_link_id")), "link") || e || i || n || t
        }

        function Lr() {
        }

        function xr(t, n) {
          return t.then(function (t) {
            if (t[Ea]) {
              var e = pr(t[Ea]);
              if (!e || n != e.c) throw new zi("user-mismatch");
              return t
            }
            throw new zi("user-mismatch")
          }).s(function (t) {
            throw t && t.code && t.code == $i + "user-not-found" ? new zi("user-mismatch") : t
          })
        }

        function Mr(t, e) {
          if (!e) throw new zi("internal-error", "failed to construct a credential");
          this.a = e, Mi(this, "providerId", t), Mi(this, "signInMethod", t)
        }

        function jr(t) {
          return {pendingToken: t.a, requestUri: "http://localhost"}
        }

        function Ur(t) {
          if (t && t.providerId && t.signInMethod && 0 == t.providerId.indexOf("saml.") && t.pendingToken) try {
            return new Mr(t.providerId, t.pendingToken)
          } catch (t) {
          }
          return null
        }

        function Vr(t, e, n) {
          if (this.a = null, e.idToken || e.accessToken) e.idToken && Mi(this, "idToken", e.idToken), e.accessToken && Mi(this, "accessToken", e.accessToken), e.nonce && !e.pendingToken && Mi(this, "nonce", e.nonce), e.pendingToken && (this.a = e.pendingToken); else {
            if (!e.oauthToken || !e.oauthTokenSecret) throw new zi("internal-error", "failed to construct a credential");
            Mi(this, "accessToken", e.oauthToken), Mi(this, "secret", e.oauthTokenSecret)
          }
          Mi(this, "providerId", t), Mi(this, "signInMethod", n)
        }

        function Kr(t) {
          var e = {};
          return t.idToken && (e.id_token = t.idToken), t.accessToken && (e.access_token = t.accessToken), t.secret && (e.oauth_token_secret = t.secret), e.providerId = t.providerId, t.nonce && !t.a && (e.nonce = t.nonce), e = {
            postBody: Dn(e).toString(),
            requestUri: "http://localhost"
          }, t.a && (delete e.postBody, e.pendingToken = t.a), e
        }

        function Fr(t) {
          if (t && t.providerId && t.signInMethod) {
            var e = {
              idToken: t.oauthIdToken,
              accessToken: t.oauthTokenSecret ? null : t.oauthAccessToken,
              oauthTokenSecret: t.oauthTokenSecret,
              oauthToken: t.oauthTokenSecret && t.oauthAccessToken,
              nonce: t.nonce,
              pendingToken: t.pendingToken
            };
            try {
              return new Vr(t.providerId, e, t.signInMethod)
            } catch (t) {
            }
          }
          return null
        }

        function qr(t, e) {
          this.Cc = e || [], ji(this, {
            providerId: t,
            isOAuthProvider: !0
          }), this.zb = {}, this.eb = (Tr(t) || {}).Oa || null, this.ab = null
        }

        function Hr(t) {
          if ("string" != typeof t || 0 != t.indexOf("saml.")) throw new zi("argument-error", 'SAML provider IDs must be prefixed with "saml."');
          qr.call(this, t, [])
        }

        function Br(t) {
          qr.call(this, t, wr), this.a = []
        }

        function Gr() {
          Br.call(this, "facebook.com")
        }

        function Wr(t) {
          if (!t) throw new zi("argument-error", "credential failed: expected 1 argument (the OAuth access token).");
          var e = t;
          return g(t) && (e = t.accessToken), (new Gr).credential({accessToken: e})
        }

        function Xr() {
          Br.call(this, "github.com")
        }

        function Jr(t) {
          if (!t) throw new zi("argument-error", "credential failed: expected 1 argument (the OAuth access token).");
          var e = t;
          return g(t) && (e = t.accessToken), (new Xr).credential({accessToken: e})
        }

        function zr() {
          Br.call(this, "google.com"), this.ua("profile")
        }

        function Yr(t, e) {
          var n = t;
          return g(t) && (n = t.idToken, e = t.accessToken), (new zr).credential({idToken: n, accessToken: e})
        }

        function $r() {
          qr.call(this, "twitter.com", yr)
        }

        function Zr(t, e) {
          var n = t;
          if (g(n) || (n = {
            oauthToken: t,
            oauthTokenSecret: e
          }), !n.oauthToken || !n.oauthTokenSecret) throw new zi("argument-error", "credential failed: expected 2 arguments (the OAuth access token and secret).");
          return new Vr("twitter.com", n, "twitter.com")
        }

        function Qr(t, e, n) {
          this.a = t, this.c = e, Mi(this, "providerId", "password"), Mi(this, "signInMethod", n === eo.EMAIL_LINK_SIGN_IN_METHOD ? eo.EMAIL_LINK_SIGN_IN_METHOD : eo.EMAIL_PASSWORD_SIGN_IN_METHOD)
        }

        function to(t) {
          return t && t.email && t.password ? new Qr(t.email, t.password, t.signInMethod) : null
        }

        function eo() {
          ji(this, {providerId: "password", isOAuthProvider: !1})
        }

        function no(t, e) {
          if (!(e = io(e))) throw new zi("argument-error", "Invalid email link!");
          return new Qr(t, e, eo.EMAIL_LINK_SIGN_IN_METHOD)
        }

        function io(t) {
          var e = wn((t = new Rr(t = Dr(t))).a, "oobCode") || null;
          return "signIn" === (wn(t.a, "mode") || null) && e ? e : null
        }

        function ro(t) {
          if (!(t.Ua && t.Ta || t.Fa && t.$)) throw new zi("internal-error");
          this.a = t, Mi(this, "providerId", "phone"), Mi(this, "signInMethod", "phone")
        }

        function oo(e) {
          if (e && "phone" === e.providerId && (e.verificationId && e.verificationCode || e.temporaryProof && e.phoneNumber)) {
            var n = {};
            return M(["verificationId", "verificationCode", "temporaryProof", "phoneNumber"], function (t) {
              e[t] && (n[t] = e[t])
            }), new ro(n)
          }
          return null
        }

        function ao(t) {
          return t.a.Fa && t.a.$ ? {temporaryProof: t.a.Fa, phoneNumber: t.a.$} : {sessionInfo: t.a.Ua, code: t.a.Ta}
        }

        function so(t) {
          try {
            this.a = t || $h.auth()
          } catch (t) {
            throw new zi("argument-error", "Either an instance of firebase.auth.Auth must be passed as an argument to the firebase.auth.PhoneAuthProvider constructor, or the default firebase App instance must be initialized via firebase.initializeApp().")
          }
          ji(this, {providerId: "phone", isOAuthProvider: !1})
        }

        function uo(t, e) {
          if (!t) throw new zi("missing-verification-id");
          if (!e) throw new zi("missing-verification-code");
          return new ro({Ua: t, Ta: e})
        }

        function co(t) {


          if (t.temporaryProof && t.phoneNumber) return new ro({Fa: t.temporaryProof, $: t.phoneNumber});
          var e = t && t.providerId;
          if (!e || "password" === e) return null;
          var n = t && t.oauthAccessToken, i = t && t.oauthTokenSecret, r = t && t.nonce, o = t && t.oauthIdToken,
            a = t && t.pendingToken;
          try {
            switch (e) {
              case"google.com":
                return Yr(o, n);
              case"facebook.com":
                return Wr(n);
              case"github.com":
                return Jr(n);
              case"twitter.com":
                return Zr(n, i);
              default:
                return n || i || o || a ? a ? 0 == e.indexOf("saml.") ? new Mr(e, a) : new Vr(e, {
                  pendingToken: a,
                  idToken: t.oauthIdToken,
                  accessToken: t.oauthAccessToken
                }, e) : new Br(e).credential({idToken: o, accessToken: n, rawNonce: r}) : null
            }
          } catch (t) {
            return null
          }
        }

        function ho(t) {
          if (!t.isOAuthProvider) throw new zi("invalid-oauth-provider")
        }

        function fo(t, e, n, i, r, o) {
          if (this.c = t, this.b = e || null, this.g = n || null, this.f = i || null, this.h = o || null, this.a = r || null, !this.g && !this.a) throw new zi("invalid-auth-event");
          if (this.g && this.a) throw new zi("invalid-auth-event");
          if (this.g && !this.f) throw new zi("invalid-auth-event")
        }

        function lo(t) {
          return (t = t || {}).type ? new fo(t.type, t.eventId, t.urlResponse, t.sessionId, t.error && Yi(t.error), t.postBody) : null
        }

        function po() {
          this.b = null, this.a = []
        }

        E(Nr, Ar), E(Or, Nr), E(_r, Nr), E(Pr, Nr), E(Cr, Nr), Mr.prototype.la = function (t) {
          return qa(t, jr(this))
        }, Mr.prototype.b = function (t, e) {
          var n = jr(this);
          return n.idToken = e, Ha(t, n)
        }, Mr.prototype.f = function (t, e) {
          return xr(Ba(t, jr(this)), e)
        }, Mr.prototype.w = function () {
          return {providerId: this.providerId, signInMethod: this.signInMethod, pendingToken: this.a}
        }, Vr.prototype.la = function (t) {
          return qa(t, Kr(this))
        }, Vr.prototype.b = function (t, e) {
          var n = Kr(this);
          return n.idToken = e, Ha(t, n)
        }, Vr.prototype.f = function (t, e) {
          return xr(Ba(t, Kr(this)), e)
        }, Vr.prototype.w = function () {
          var t = {providerId: this.providerId, signInMethod: this.signInMethod};
          return this.idToken && (t.oauthIdToken = this.idToken), this.accessToken && (t.oauthAccessToken = this.accessToken), this.secret && (t.oauthTokenSecret = this.secret), this.nonce && (t.nonce = this.nonce), this.a && (t.pendingToken = this.a), t
        }, qr.prototype.Da = function (t) {
          return this.zb = W(t), this
        }, E(Hr, qr), E(Br, qr), Br.prototype.ua = function (t) {
          return V(this.a, t) || this.a.push(t), this
        }, Br.prototype.Fb = function () {
          return H(this.a)
        }, Br.prototype.credential = function (t, e) {
          var n;
          if (!(n = g(t) ? {
            idToken: t.idToken || null,
            accessToken: t.accessToken || null,
            nonce: t.rawNonce || null
          } : {
            idToken: t || null,
            accessToken: e || null
          }).idToken && !n.accessToken) throw new zi("argument-error", "credential failed: must provide the ID token and/or the access token.");
          return new Vr(this.providerId, n, this.providerId)
        }, E(Gr, Br), Mi(Gr, "PROVIDER_ID", "facebook.com"), Mi(Gr, "FACEBOOK_SIGN_IN_METHOD", "facebook.com"), E(Xr, Br), Mi(Xr, "PROVIDER_ID", "github.com"), Mi(Xr, "GITHUB_SIGN_IN_METHOD", "github.com"), E(zr, Br), Mi(zr, "PROVIDER_ID", "google.com"), Mi(zr, "GOOGLE_SIGN_IN_METHOD", "google.com"), E($r, qr), Mi($r, "PROVIDER_ID", "twitter.com"), Mi($r, "TWITTER_SIGN_IN_METHOD", "twitter.com"), Qr.prototype.la = function (t) {
          return this.signInMethod == eo.EMAIL_LINK_SIGN_IN_METHOD ? ys(t, Za, {
            email: this.a,
            oobCode: this.c
          }) : ys(t, vs, {email: this.a, password: this.c})
        }, Qr.prototype.b = function (t, e) {
          return this.signInMethod == eo.EMAIL_LINK_SIGN_IN_METHOD ? ys(t, Qa, {
            idToken: e,
            email: this.a,
            oobCode: this.c
          }) : ys(t, cs, {idToken: e, email: this.a, password: this.c})
        }, Qr.prototype.f = function (t, e) {
          return xr(this.la(t), e)
        }, Qr.prototype.w = function () {
          return {email: this.a, password: this.c, signInMethod: this.signInMethod}
        }, ji(eo, {PROVIDER_ID: "password"}), ji(eo, {EMAIL_LINK_SIGN_IN_METHOD: "emailLink"}), ji(eo, {EMAIL_PASSWORD_SIGN_IN_METHOD: "password"}), ro.prototype.la = function (t) {
          return t.Va(ao(this))
        }, ro.prototype.b = function (t, e) {
          var n = ao(this);
          return n.idToken = e, ys(t, gs, n)
        }, ro.prototype.f = function (t, e) {
          var n = ao(this);
          return n.operation = "REAUTH", xr(t = ys(t, bs, n), e)
        }, ro.prototype.w = function () {
          var t = {providerId: "phone"};
          return this.a.Ua && (t.verificationId = this.a.Ua), this.a.Ta && (t.verificationCode = this.a.Ta), this.a.Fa && (t.temporaryProof = this.a.Fa), this.a.$ && (t.phoneNumber = this.a.$), t
        }, so.prototype.Va = function (e, n) {
          var i = this.a.c;
          return zt(n.verify()).then(function (t) {
            if (!f(t)) throw new zi("argument-error", "An implementation of firebase.auth.ApplicationVerifier.prototype.verify() must return a firebase.Promise that resolves with a string.");
            switch (n.type) {
              case"recaptcha":
                return function (t, e) {
                  return ys(t, ss, e)
                }(i, {phoneNumber: e, recaptchaToken: t}).then(function (t) {
                  return "function" == typeof n.reset && n.reset(), t
                }, function (t) {
                  throw"function" == typeof n.reset && n.reset(), t
                });
              default:
                throw new zi("argument-error", 'Only firebase.auth.ApplicationVerifiers with type="recaptcha" are currently supported.')
            }
          })
        }, ji(so, {PROVIDER_ID: "phone"}), ji(so, {PHONE_SIGN_IN_METHOD: "phone"}), fo.prototype.getUid = function () {
          var t = [];
          return t.push(this.c), this.b && t.push(this.b), this.f && t.push(this.f), this.i && t.push(this.i), t.join("-")
        }, fo.prototype.w = function () {
          return {
            type: this.c,
            eventId: this.b,
            urlResponse: this.g,
            sessionId: this.f,
            postBody: this.h,
            error: this.a && this.a.w()
          }
        };
        var vo, mo = null;

        function go(t) {
          var e = "unauthorized-domain", n = void 0, i = In(t);
          t = i.b, "chrome-extension" == (i = i.f) ? n = Lt("This chrome extension ID (chrome-extension://%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.", t) : "http" == i || "https" == i ? n = Lt("This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.", t) : e = "operation-not-supported-in-this-environment", zi.call(this, e, n)
        }

        function bo(t, e, n) {
          zi.call(this, t, n), (t = e || {}).Ab && Mi(this, "email", t.Ab), t.$ && Mi(this, "phoneNumber", t.$), t.credential && Mi(this, "credential", t.credential)
        }

        function yo(t) {
          if (t.code) {
            var e = t.code || "";
            0 == e.indexOf($i) && (e = e.substring($i.length));
            var n = {credential: co(t)};
            if (t.email) n.Ab = t.email; else if (t.phoneNumber) n.$ = t.phoneNumber; else if (!n.credential) return new zi(e, t.message || void 0);
            return new bo(e, n, t.message)
          }
          return null
        }

        function wo() {
        }

        function Io(t) {
          return t.c || (t.c = t.b())
        }

        function To() {
        }

        function ko(t) {
          if (t.f || "undefined" != typeof XMLHttpRequest || "undefined" == typeof ActiveXObject) return t.f;
          for (var e = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], n = 0; n < e.length; n++) {
            var i = e[n];
            try {
              return new ActiveXObject(i), t.f = i
            } catch (t) {
            }
          }
          throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed")
        }

        function Eo() {
        }

        function So() {
          this.a = new XDomainRequest, this.readyState = 0, this.onreadystatechange = null, this.responseType = this.responseText = this.response = "", this.status = -1, this.statusText = "", this.a.onload = I(this.cc, this), this.a.onerror = I(this.Gb, this), this.a.onprogress = I(this.dc, this), this.a.ontimeout = I(this.hc, this)
        }

        function Ao(t, e) {
          t.readyState = e, t.onreadystatechange && t.onreadystatechange()
        }

        function No(t, e, n) {
          this.reset(t, e, n, void 0, void 0)
        }

        function Oo(t) {
          this.f = t, this.b = this.c = this.a = null
        }

        function _o(t, e) {
          this.name = t, this.value = e
        }

        po.prototype.subscribe = function (t) {
          var n = this;
          this.a.push(t), this.b || (this.b = function (t) {
            for (var e = 0; e < n.a.length; e++) n.a[e](t)
          }, "function" == typeof (t = mi("universalLinks.subscribe", h)) && t(null, this.b))
        }, po.prototype.unsubscribe = function (e) {
          F(this.a, function (t) {
            return t == e
          })
        }, E(go, zi), E(bo, zi), bo.prototype.w = function () {
          var t = {code: this.code, message: this.message};
          this.email && (t.email = this.email), this.phoneNumber && (t.phoneNumber = this.phoneNumber);
          var e = this.credential && this.credential.w();
          return e && J(t, e), t
        }, bo.prototype.toJSON = function () {
          return this.w()
        }, wo.prototype.c = null, E(To, wo), To.prototype.a = function () {
          var t = ko(this);
          return t ? new ActiveXObject(t) : new XMLHttpRequest
        }, To.prototype.b = function () {
          var t = {};
          return ko(this) && (t[0] = !0, t[1] = !0), t
        }, vo = new To, E(Eo, wo), Eo.prototype.a = function () {
          var t = new XMLHttpRequest;
          if ("withCredentials" in t) return t;
          if ("undefined" != typeof XDomainRequest) return new So;
          throw Error("Unsupported browser")
        }, Eo.prototype.b = function () {
          return {}
        }, (t = So.prototype).open = function (t, e, n) {
          if (null != n && !n) throw Error("Only async requests are supported.");
          this.a.open(t, e)
        }, t.send = function (t) {
          if (t) {
            if ("string" != typeof t) throw Error("Only string data is supported");
            this.a.send(t)
          } else this.a.send()
        }, t.abort = function () {
          this.a.abort()
        }, t.setRequestHeader = function () {
        }, t.getResponseHeader = function (t) {
          return "content-type" == t.toLowerCase() ? this.a.contentType : ""
        }, t.cc = function () {
          this.status = 200, this.response = this.responseText = this.a.responseText, Ao(this, 4)
        }, t.Gb = function () {
          this.status = 500, this.response = this.responseText = "", Ao(this, 4)
        }, t.hc = function () {
          this.Gb()
        }, t.dc = function () {
          this.status = 200, Ao(this, 1)
        }, t.getAllResponseHeaders = function () {
          return "content-type: " + this.a.contentType
        }, No.prototype.a = null, No.prototype.reset = function (t, e, n, i, r) {
          delete this.a
        }, _o.prototype.toString = function () {
          return this.name
        };
        var Po = new _o("SEVERE", 1e3), Co = new _o("WARNING", 900), Ro = new _o("CONFIG", 700),
          Do = new _o("FINE", 500);
        Oo.prototype.log = function (t, e, n) {
          if (t.value >= function t(e) {
            return e.c ? e.c : e.a ? t(e.a) : (O("Root logger has no level set."), null)
          }(this).value) for (m(e) && (e = e()), t = new No(t, String(e), this.f), n && (t.a = n), n = this; n;) n = n.a
        };
        var Lo, xo = {}, Mo = null;

        function jo(t) {
          var e;
          if (Mo || (Mo = new Oo(""), (xo[""] = Mo).c = Ro), !(e = xo[t])) {
            e = new Oo(t);
            var n = t.lastIndexOf("."), i = t.substr(n + 1);
            (n = jo(t.substr(0, n))).b || (n.b = {}), (n.b[i] = e).a = n, xo[t] = e
          }
          return e
        }

        function Uo(t, e) {
          t && t.log(Do, e, void 0)
        }

        function Vo(t) {
          this.f = t
        }

        function Ko(t) {
          nn.call(this), this.u = t, this.readyState = Fo, this.status = 0, this.responseType = this.responseText = this.response = this.statusText = "", this.onreadystatechange = null, this.i = new Headers, this.b = null, this.o = "GET", this.g = "", this.a = !1, this.h = jo("goog.net.FetchXmlHttp"), this.l = this.c = this.f = null
        }

        E(Vo, wo), Vo.prototype.a = function () {
          return new Ko(this.f)
        }, Vo.prototype.b = (Lo = {}, function () {
          return Lo
        }), E(Ko, nn);
        var Fo = 0;

        function qo(t) {
          t.c.read().then(t.bc.bind(t)).catch(t.Ma.bind(t))
        }

        function Ho(t, e) {
          e && t.f && (t.status = t.f.status, t.statusText = t.f.statusText), t.readyState = 4, t.f = null, t.c = null, t.l = null, Bo(t)
        }

        function Bo(t) {
          t.onreadystatechange && t.onreadystatechange.call(t)
        }

        function Go(t) {
          nn.call(this), this.headers = new fn, this.D = t || null, this.c = !1, this.A = this.a = null, this.h = this.N = this.l = "", this.f = this.I = this.i = this.G = !1, this.g = 0, this.u = null, this.o = Wo, this.v = this.O = !1
        }

        (t = Ko.prototype).open = function (t, e) {
          if (this.readyState != Fo) throw this.abort(), Error("Error reopening a connection");
          this.o = t, this.g = e, this.readyState = 1, Bo(this)
        }, t.send = function (t) {
          if (1 != this.readyState) throw this.abort(), Error("need to call open() first. ");
          this.a = !0;
          var e = {headers: this.i, method: this.o, credentials: void 0, cache: void 0};
          t && (e.body = t), this.u.fetch(new Request(this.g, e)).then(this.gc.bind(this), this.Ma.bind(this))
        }, t.abort = function () {
          this.response = this.responseText = "", this.i = new Headers, this.status = 0, this.c && this.c.cancel("Request was aborted."), 1 <= this.readyState && this.a && 4 != this.readyState && (this.a = !1, Ho(this, !1)), this.readyState = Fo
        }, t.gc = function (t) {
          this.a && (this.f = t, this.b || (this.b = t.headers, this.readyState = 2, Bo(this)), this.a && (this.readyState = 3, Bo(this), this.a && ("arraybuffer" === this.responseType ? t.arrayBuffer().then(this.ec.bind(this), this.Ma.bind(this)) : void 0 !== h.ReadableStream && "body" in t ? (this.response = this.responseText = "", this.c = t.body.getReader(), this.l = new TextDecoder, qo(this)) : t.text().then(this.fc.bind(this), this.Ma.bind(this)))))
        }, t.bc = function (t) {
          if (this.a) {
            var e = this.l.decode(t.value ? t.value : new Uint8Array(0), {stream: !t.done});
            e && (this.response = this.responseText += e), t.done ? Ho(this, !0) : Bo(this), 3 == this.readyState && qo(this)
          }
        }, t.fc = function (t) {
          this.a && (this.response = this.responseText = t, Ho(this, !0))
        }, t.ec = function (t) {
          this.a && (this.response = t, Ho(this, !0))
        }, t.Ma = function (t) {
          var e = this.h;
          e && e.log(Co, "Failed to fetch url " + this.g, t instanceof Error ? t : Error(t)), this.a && Ho(this, !0)
        }, t.setRequestHeader = function (t, e) {
          this.i.append(t, e)
        }, t.getResponseHeader = function (t) {
          return this.b ? this.b.get(t.toLowerCase()) || "" : ((t = this.h) && t.log(Co, "Attempting to get response header but no headers have been received for url: " + this.g, void 0), "")
        }, t.getAllResponseHeaders = function () {
          if (!this.b) {
            var t = this.h;
            return t && t.log(Co, "Attempting to get all response headers but no headers have been received for url: " + this.g, void 0), ""
          }
          t = [];
          for (var e = this.b.entries(), n = e.next(); !n.done;) n = n.value, t.push(n[0] + ": " + n[1]), n = e.next();
          return t.join("\r\n")
        }, E(Go, nn);
        var Wo = "";
        Go.prototype.b = jo("goog.net.XhrIo");
        var Xo = /^https?$/i, Jo = ["POST", "PUT"];

        function zo(e, t, n, i, r) {
          if (e.a) throw Error("[goog.net.XhrIo] Object is active with another request=" + e.l + "; newUri=" + t);
          n = n ? n.toUpperCase() : "GET", e.l = t, e.h = "", e.N = n, e.G = !1, e.c = !0, e.a = e.D ? e.D.a() : vo.a(), e.A = e.D ? Io(e.D) : Io(vo), e.a.onreadystatechange = I(e.Jb, e);
          try {
            Uo(e.b, ra(e, "Opening Xhr")), e.I = !0, e.a.open(n, String(t), !0), e.I = !1
          } catch (t) {
            return Uo(e.b, ra(e, "Error opening Xhr: " + t.message)), void $o(e, t)
          }
          t = i || "";
          var o = new fn(e.headers);
          r && function (t, e) {
            if (t.forEach && "function" == typeof t.forEach) t.forEach(e, void 0); else if (v(t) || f(t)) M(t, e, void 0); else for (var n = hn(t), i = cn(t), r = i.length, o = 0; o < r; o++) e.call(void 0, i[o], n && n[o], t)
          }(r, function (t, e) {
            o.set(e, t)
          }), r = function (t) {
            t:{
              for (var e = Yo, n = t.length, i = f(t) ? t.split("") : t, r = 0; r < n; r++) if (r in i && e.call(void 0, i[r], r, t)) {
                e = r;
                break t
              }
              e = -1
            }
            return e < 0 ? null : f(t) ? t.charAt(e) : t[e]
          }(o.U()), i = h.FormData && t instanceof h.FormData, !V(Jo, n) || r || i || o.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"), o.forEach(function (t, e) {
            this.a.setRequestHeader(e, t)
          }, e), e.o && (e.a.responseType = e.o), "withCredentials" in e.a && e.a.withCredentials !== e.O && (e.a.withCredentials = e.O);
          try {
            ea(e), 0 < e.g && (e.v = function (t) {
              return me && Ne(9) && "number" == typeof t.timeout && void 0 !== t.ontimeout
            }(e.a), Uo(e.b, ra(e, "Will abort after " + e.g + "ms if incomplete, xhr2 " + e.v)), e.v ? (e.a.timeout = e.g, e.a.ontimeout = I(e.Ga, e)) : e.u = sn(e.Ga, e.g, e)), Uo(e.b, ra(e, "Sending request")), e.i = !0, e.a.send(t), e.i = !1
          } catch (t) {
            Uo(e.b, ra(e, "Send error: " + t.message)), $o(e, t)
          }
        }

        function Yo(t) {
          return "content-type" == t.toLowerCase()
        }

        function $o(t, e) {
          t.c = !1, t.a && (t.f = !0, t.a.abort(), t.f = !1), t.h = e, Zo(t), ta(t)
        }

        function Zo(t) {
          t.G || (t.G = !0, t.dispatchEvent("complete"), t.dispatchEvent("error"))
        }

        function Qo(e) {
          if (e.c && void 0 !== u) if (e.A[1] && 4 == na(e) && 2 == ia(e)) Uo(e.b, ra(e, "Local request error detected and ignored")); else if (e.i && 4 == na(e)) sn(e.Jb, 0, e); else if (e.dispatchEvent("readystatechange"), 4 == na(e)) {
            Uo(e.b, ra(e, "Request complete")), e.c = !1;
            try {
              var t, n = ia(e);
              t:switch (n) {
                case 200:
                case 201:
                case 202:
                case 204:
                case 206:
                case 304:
                case 1223:
                  var i = !0;
                  break t;
                default:
                  i = !1
              }
              if (!(t = i)) {
                var r;
                if (r = 0 === n) {
                  var o = String(e.l).match(pn)[1] || null;
                  if (!o && h.self && h.self.location) {
                    var a = h.self.location.protocol;
                    o = a.substr(0, a.length - 1)
                  }
                  r = !Xo.test(o ? o.toLowerCase() : "")
                }
                t = r
              }
              if (t) e.dispatchEvent("complete"), e.dispatchEvent("success"); else {
                try {
                  var s = 2 < na(e) ? e.a.statusText : ""
                } catch (t) {
                  Uo(e.b, "Can not get status: " + t.message), s = ""
                }
                e.h = s + " [" + ia(e) + "]", Zo(e)
              }
            } finally {
              ta(e)
            }
          }
        }

        function ta(e, t) {
          if (e.a) {
            ea(e);
            var n = e.a, i = e.A[0] ? d : null;
            e.a = null, e.A = null, t || e.dispatchEvent("ready");
            try {
              n.onreadystatechange = i
            } catch (t) {
              (e = e.b) && e.log(Po, "Problem encountered resetting onreadystatechange: " + t.message, void 0)
            }
          }
        }

        function ea(t) {
          t.a && t.v && (t.a.ontimeout = null), t.u && (h.clearTimeout(t.u), t.u = null)
        }

        function na(t) {
          return t.a ? t.a.readyState : 0
        }

        function ia(t) {
          try {
            return 2 < na(t) ? t.a.status : -1
          } catch (t) {
            return -1
          }
        }

        function ra(t, e) {
          return e + " [" + t.N + " " + t.l + " " + ia(t) + "]"
        }

        function oa(t) {
          var e = ma;
          this.g = [], this.v = e, this.u = t || null, this.f = this.a = !1, this.c = void 0, this.l = this.A = this.i = !1, this.h = 0, this.b = null, this.m = 0
        }

        function aa(t, e, n) {
          t.a = !0, t.c = n, t.f = !e, ha(t)
        }

        function sa(t) {
          if (t.a) {
            if (!t.l) throw new fa(t);
            t.l = !1
          }
        }

        function ua(t, e, n, i) {
          t.g.push([e, n, i]), t.a && ha(t)
        }

        function ca(t) {
          return U(t.g, function (t) {
            return m(t[1])
          })
        }

        function ha(e) {
          if (e.h && e.a && ca(e)) {
            var n = e.h, i = pa[n];
            i && (h.clearTimeout(i.a), delete pa[n]), e.h = 0
          }
          e.b && (e.b.m--, delete e.b), n = e.c;
          for (var t = i = !1; e.g.length && !e.i;) {
            var r = e.g.shift(), o = r[0], a = r[1];
            if (r = r[2], o = e.f ? a : o) try {
              var s = o.call(r || e.u, n);
              void 0 !== s && (e.f = e.f && (s == n || s instanceof Error), e.c = n = s), (S(n) || "function" == typeof h.Promise && n instanceof h.Promise) && (t = !0, e.i = !0)
            } catch (t) {
              n = t, e.f = !0, ca(e) || (i = !0)
            }
          }
          e.c = n, t && (s = I(e.o, e, !0), t = I(e.o, e, !1), n instanceof oa ? (ua(n, s, t), n.A = !0) : n.then(s, t)), i && (n = new da(n), pa[n.a] = n, e.h = n.a)
        }

        function fa() {
          A.call(this)
        }

        function la() {
          A.call(this)
        }

        function da(t) {
          this.a = h.setTimeout(I(this.c, this), 0), this.b = t
        }

        (t = Go.prototype).Ga = function () {
          void 0 !== u && this.a && (this.h = "Timed out after " + this.g + "ms, aborting", Uo(this.b, ra(this, this.h)), this.dispatchEvent("timeout"), this.abort(8))
        }, t.abort = function () {
          this.a && this.c && (Uo(this.b, ra(this, "Aborting")), this.c = !1, this.f = !0, this.a.abort(), this.f = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), ta(this))
        }, t.va = function () {
          this.a && (this.c && (this.c = !1, this.f = !0, this.a.abort(), this.f = !1), ta(this, !0)), Go.qb.va.call(this)
        }, t.Jb = function () {
          this.qa || (this.I || this.i || this.f ? Qo(this) : this.vc())
        }, t.vc = function () {
          Qo(this)
        }, t.getResponse = function () {
          try {
            if (!this.a) return null;
            if ("response" in this.a) return this.a.response;
            switch (this.o) {
              case Wo:
              case"text":
                return this.a.responseText;
              case"arraybuffer":
                if ("mozResponseArrayBuffer" in this.a) return this.a.mozResponseArrayBuffer
            }
            var t = this.b;
            return t && t.log(Po, "Response type " + this.o + " is not supported on this browser", void 0), null
          } catch (t) {
            return Uo(this.b, "Can not get response: " + t.message), null
          }
        }, oa.prototype.cancel = function (t) {
          if (this.a) this.c instanceof oa && this.c.cancel(); else {
            if (this.b) {
              var e = this.b;
              delete this.b, t ? e.cancel(t) : (e.m--, e.m <= 0 && e.cancel())
            }
            this.v ? this.v.call(this.u, this) : this.l = !0, this.a || (t = new la(this), sa(this), aa(this, !1, t))
          }
        }, oa.prototype.o = function (t, e) {
          this.i = !1, aa(this, t, e)
        }, oa.prototype.then = function (t, e, n) {
          var i, r, o = new qt(function (t, e) {
            i = t, r = e
          });
          return ua(this, i, function (t) {
            t instanceof la ? o.cancel() : r(t)
          }), o.then(t, e, n)
        }, oa.prototype.$goog_Thenable = !0, E(fa, A), fa.prototype.message = "Deferred has already fired", fa.prototype.name = "AlreadyCalledError", E(la, A), la.prototype.message = "Deferred was canceled", la.prototype.name = "CanceledError", da.prototype.c = function () {
          throw delete pa[this.a], this.b
        };
        var pa = {};

        function va(t) {
          var e, n = document, i = et(t).toString(), r = document.createElement("SCRIPT"), o = {Lb: r, Ga: void 0},
            a = new oa(o);
          return e = window.setTimeout(function () {
            ga(r, !0);
            var t = new wa(ya, "Timeout reached for loading script " + i);
            sa(a), aa(a, !1, t)
          }, 5e3), o.Ga = e, r.onload = r.onreadystatechange = function () {
            r.readyState && "loaded" != r.readyState && "complete" != r.readyState || (ga(r, !1, e), sa(a), aa(a, !0, null))
          }, r.onerror = function () {
            ga(r, !0, e);
            var t = new wa(ba, "Error while loading script " + i);
            sa(a), aa(a, !1, t)
          }, J(o = {}, {type: "text/javascript", charset: "UTF-8"}), Fn(r, o), function (t, e) {
            L(t, "HTMLScriptElement"), t.src = et(e), null === l && (l = (e = (e = h.document).querySelector && e.querySelector("script[nonce]")) && (e = e.nonce || e.getAttribute("nonce")) && s.test(e) ? e : ""), (e = l) && t.setAttribute("nonce", e)
          }(r, t), function (t) {
            var e;
            return (e = (t || document).getElementsByTagName("HEAD")) && 0 != e.length ? e[0] : t.documentElement
          }(n).appendChild(r), a
        }

        function ma() {
          if (this && this.Lb) {
            var t = this.Lb;
            t && "SCRIPT" == t.tagName && ga(t, !0, this.Ga)
          }
        }

        function ga(t, e, n) {
          null != n && h.clearTimeout(n), t.onload = d, t.onerror = d, t.onreadystatechange = d, e && window.setTimeout(function () {
            t && t.parentNode && t.parentNode.removeChild(t)
          }, 0)
        }

        var ba = 0, ya = 1;

        function wa(t, e) {
          var n = "Jsloader error (code #" + t + ")";
          e && (n += ": " + e), A.call(this, n), this.code = t
        }

        function Ia(t) {
          this.f = t
        }

        function Ta(t, e, n) {
          if (this.b = t, t = e || {}, this.i = t.secureTokenEndpoint || "https://securetoken.googleapis.com/v1/token", this.m = t.secureTokenTimeout || Sa, this.f = W(t.secureTokenHeaders || Aa), this.g = t.firebaseEndpoint || "https://www.googleapis.com/identitytoolkit/v3/relyingparty/", this.h = t.firebaseTimeout || Na, this.a = W(t.firebaseHeaders || Oa), n && (this.a["X-Client-Version"] = n, this.f["X-Client-Version"] = n), n = "Node" == ui(), !(n = h.XMLHttpRequest || n && $h.INTERNAL.node && $h.INTERNAL.node.XMLHttpRequest) && !si()) throw new zi("internal-error", "The XMLHttpRequest compatibility library was not found.");
          this.c = void 0, si() ? this.c = new Vo(self) : ci() ? this.c = new Ia(n) : this.c = new Eo
        }

        E(wa, A), E(Ia, wo), Ia.prototype.a = function () {
          return new this.f
        }, Ia.prototype.b = function () {
          return {}
        };
        var ka, Ea = "idToken", Sa = new Oi(3e4, 6e4), Aa = {"Content-Type": "application/x-www-form-urlencoded"},
          Na = new Oi(3e4, 6e4), Oa = {"Content-Type": "application/json"};

        function _a(t, e) {
          e ? t.a["X-Firebase-Locale"] = e : delete t.a["X-Firebase-Locale"]
        }

        function Pa(t, e) {
          e ? (t.a["X-Client-Version"] = e, t.f["X-Client-Version"] = e) : (delete t.a["X-Client-Version"], delete t.f["X-Client-Version"])
        }

        function Ca(t, e, n, i, r, o, a) {
          (t = function () {
            var t = vi();
            return !((t = li(t) != fi ? null : (t = t.match(/\sChrome\/(\d+)/i)) && 2 == t.length ? parseInt(t[1], 10) : null) && t < 30) && (!me || !Se || 9 < Se)
          }() || si() ? I(t.o, t) : (ka = ka || new qt(function (t, e) {
            !function (t, e) {
              if (((window.gapi || {}).client || {}).request) t(); else {
                h[Da] = function () {
                  ((window.gapi || {}).client || {}).request ? t() : e(Error("CORS_UNSUPPORTED"))
                }, function (t, e) {
                  ua(t, null, e, void 0)
                }(va(nt(Ra, {onload: Da})), function () {
                  e(Error("CORS_UNSUPPORTED"))
                })
              }
            }(t, e)
          }), I(t.l, t)))(e, n, i, r, o, a)
        }

        Ta.prototype.o = function (t, n, e, i, r, o) {
          if (si() && (void 0 === h.fetch || void 0 === h.Headers || void 0 === h.Request)) throw new zi("operation-not-supported-in-this-environment", "fetch, Headers and Request native APIs or equivalent Polyfills must be available to support HTTP requests from a Worker environment.");
          var a = new Go(this.c);
          if (o) {
            a.g = Math.max(0, o);
            var s = setTimeout(function () {
              a.dispatchEvent("timeout")
            }, o)
          }
          rn(a, "complete", function () {
            s && clearTimeout(s);
            var e = null;
            try {
              e = JSON.parse(function (e) {
                try {
                  return e.a ? e.a.responseText : ""
                } catch (t) {
                  return Uo(e.b, "Can not get responseText: " + t.message), ""
                }
              }(this)) || null
            } catch (t) {
              e = null
            }
            n && n(e)
          }), on(a, "ready", function () {
            s && clearTimeout(s), fe(this)
          }), on(a, "timeout", function () {
            s && clearTimeout(s), fe(this), n && n(null)
          }), zo(a, t, e, i, r)
        };
        var Ra = new z(Z, "/js/client.js"),
          Da = "__fcb" + Math.floor(1e6 * Math.random()).toString();

        function La(t) {
          if (!f(t = t.email) || !ii.test(t)) throw new zi("invalid-email")
        }

        function xa(t) {
          "email" in t && La(t)
        }

        function Ma(t) {
          if (!t[Ea]) throw new zi("internal-error")
        }

        function ja(t) {
          if (t.phoneNumber || t.temporaryProof) {
            if (!t.phoneNumber || !t.temporaryProof) throw new zi("internal-error")
          } else {
            if (!t.sessionInfo) throw new zi("missing-verification-id");
            if (!t.code) throw new zi("missing-verification-code")
          }
        }

        Ta.prototype.l = function (t, n, i, r, o) {
          var a = this;
          ka.then(function () {
            window.gapi.client.setApiKey(a.b);
            var e = window.gapi.auth.getToken();
            window.gapi.auth.setToken(null), window.gapi.client.request({
              path: t,
              method: i,
              body: r,
              headers: o,
              authType: "none",
              callback: function (t) {
                window.gapi.auth.setToken(e), n && n(t)
              }
            })
          }).s(function (t) {
            n && n({error: {message: t && t.message || "CORS_UNSUPPORTED"}})
          })
        }, Ta.prototype.ob = function () {
          return ys(this, hs, {})
        }, Ta.prototype.rb = function (t, e) {
          return ys(this, us, {idToken: t, email: e})
        }, Ta.prototype.sb = function (t, e) {
          return ys(this, cs, {idToken: t, password: e})
        };
        var Ua = {displayName: "DISPLAY_NAME", photoUrl: "PHOTO_URL"};

        function Va(t) {
          if (!t.requestUri || !t.sessionId && !t.postBody && !t.pendingToken) throw new zi("internal-error")
        }

        function Ka(t, e) {
          return e.oauthIdToken && e.providerId && 0 == e.providerId.indexOf("oidc.") && !e.pendingToken && (t.sessionId ? e.nonce = t.sessionId : t.postBody && (xn(t = new Cn(t.postBody), "nonce") && (e.nonce = t.get("nonce")))), e
        }

        function Fa(t) {
          var e = null;
          if (t.needConfirmation ? (t.code = "account-exists-with-different-credential", e = yo(t)) : "FEDERATED_USER_ID_ALREADY_LINKED" == t.errorMessage ? (t.code = "credential-already-in-use", e = yo(t)) : "EMAIL_EXISTS" == t.errorMessage ? (t.code = "email-already-in-use", e = yo(t)) : t.errorMessage && (e = ws(t.errorMessage)), e) throw e;
          if (!t[Ea]) throw new zi("internal-error")
        }

        function qa(t, e) {
          return e.returnIdpCredential = !0, ys(t, fs, e)
        }

        function Ha(t, e) {
          return e.returnIdpCredential = !0, ys(t, ds, e)
        }

        function Ba(t, e) {
          return e.returnIdpCredential = !0, e.autoCreate = !1, ys(t, ls, e)
        }

        function Ga(t) {
          if (!t.oobCode) throw new zi("invalid-action-code")
        }

        (t = Ta.prototype).tb = function (t, i) {
          var r = {idToken: t}, o = [];
          return B(Ua, function (t, e) {
            var n = i[e];
            null === n ? o.push(t) : e in i && (r[e] = n)
          }), o.length && (r.deleteAttribute = o), ys(this, us, r)
        }, t.lb = function (t, e) {
          return J(t = {requestType: "PASSWORD_RESET", email: t}, e), ys(this, is, t)
        }, t.mb = function (t, e) {
          return J(t = {requestType: "EMAIL_SIGNIN", email: t}, e), ys(this, es, t)
        }, t.kb = function (t, e) {
          return J(t = {requestType: "VERIFY_EMAIL", idToken: t}, e), ys(this, ns, t)
        }, t.Va = function (t) {
          return ys(this, ms, t)
        }, t.$a = function (t, e) {
          return ys(this, as, {oobCode: t, newPassword: e})
        }, t.Ka = function (t) {
          return ys(this, Xa, {oobCode: t})
        }, t.Xa = function (t) {
          return ys(this, Wa, {oobCode: t})
        };
        var Wa = {endpoint: "setAccountInfo", C: Ga, da: "email"}, Xa = {
            endpoint: "resetPassword", C: Ga, J: function (t) {
              var e = t.requestType;
              if (!e || !t.email && "EMAIL_SIGNIN" != e) throw new zi("internal-error")
            }
          }, Ja = {
            endpoint: "signupNewUser", C: function (t) {
              if (La(t), !t.password) throw new zi("weak-password")
            }, J: Ma, R: !0
          }, za = {endpoint: "createAuthUri"}, Ya = {endpoint: "deleteAccount", T: ["idToken"]}, $a = {
            endpoint: "setAccountInfo", T: ["idToken", "deleteProvider"], C: function (t) {
              if (!p(t.deleteProvider)) throw new zi("internal-error")
            }
          }, Za = {endpoint: "emailLinkSignin", T: ["email", "oobCode"], C: La, J: Ma, R: !0},
          Qa = {endpoint: "emailLinkSignin", T: ["idToken", "email", "oobCode"], C: La, J: Ma, R: !0},
          ts = {endpoint: "getAccountInfo"}, es = {
            endpoint: "getOobConfirmationCode", T: ["requestType"], C: function (t) {
              if ("EMAIL_SIGNIN" != t.requestType) throw new zi("internal-error");
              La(t)
            }, da: "email"
          }, ns = {
            endpoint: "getOobConfirmationCode", T: ["idToken", "requestType"], C: function (t) {
              if ("VERIFY_EMAIL" != t.requestType) throw new zi("internal-error")
            }, da: "email"
          }, is = {
            endpoint: "getOobConfirmationCode", T: ["requestType"], C: function (t) {
              if ("PASSWORD_RESET" != t.requestType) throw new zi("internal-error");
              La(t)
            }, da: "email"
          }, rs = {wb: !0, endpoint: "getProjectConfig", Ib: "GET"}, os = {
            wb: !0, endpoint: "getRecaptchaParam", Ib: "GET", J: function (t) {
              if (!t.recaptchaSiteKey) throw new zi("internal-error")
            }
          }, as = {endpoint: "resetPassword", C: Ga, da: "email"},
          ss = {endpoint: "sendVerificationCode", T: ["phoneNumber", "recaptchaToken"], da: "sessionInfo"},
          us = {endpoint: "setAccountInfo", T: ["idToken"], C: xa, R: !0}, cs = {
            endpoint: "setAccountInfo", T: ["idToken"], C: function (t) {
              if (xa(t), !t.password) throw new zi("weak-password")
            }, J: Ma, R: !0
          }, hs = {endpoint: "signupNewUser", J: Ma, R: !0},
          fs = {endpoint: "verifyAssertion", C: Va, Qa: Ka, J: Fa, R: !0}, ls = {
            endpoint: "verifyAssertion", C: Va, Qa: Ka, J: function (t) {
              if (t.errorMessage && "USER_NOT_FOUND" == t.errorMessage) throw new zi("user-not-found");
              if (t.errorMessage) throw ws(t.errorMessage);
              if (!t[Ea]) throw new zi("internal-error")
            }, R: !0
          }, ds = {
            endpoint: "verifyAssertion", C: function (t) {
              if (Va(t), !t.idToken) throw new zi("internal-error")
            }, Qa: Ka, J: Fa, R: !0
          }, ps = {
            endpoint: "verifyCustomToken", C: function (t) {
              if (!t.token) throw new zi("invalid-custom-token")
            }, J: Ma, R: !0
          }, vs = {
            endpoint: "verifyPassword", C: function (t) {
              if (La(t), !t.password) throw new zi("wrong-password")
            }, J: Ma, R: !0
          }, ms = {endpoint: "verifyPhoneNumber", C: ja, J: Ma}, gs = {
            endpoint: "verifyPhoneNumber", C: function (t) {
              if (!t.idToken) throw new zi("internal-error");
              ja(t)
            }, J: function (t) {
              if (t.temporaryProof) throw t.code = "credential-already-in-use", yo(t);
              Ma(t)
            }
          }, bs = {Vb: {USER_NOT_FOUND: "user-not-found"}, endpoint: "verifyPhoneNumber", C: ja, J: Ma};

        function ys(t, e, n) {
          if (!function (t, e) {
            if (!e || !e.length) return !0;
            if (!t) return !1;
            for (var n = 0; n < e.length; n++) {
              var i = t[e[n]];
              if (null == i || "" === i) return !1
            }
            return !0
          }(n, e.T)) return Yt(new zi("internal-error"));
          var i, r = e.Ib || "POST";
          return zt(n).then(e.C).then(function () {
            return e.R && (n.returnSecureToken = !0), function (t, e, i, r, o, n) {
              var a = In(t.g + e);
              yn(a, "key", t.b), n && yn(a, "cb", k().toString());
              var s = "GET" == i;
              if (s) for (var u in r) r.hasOwnProperty(u) && yn(a, u, r[u]);
              return new qt(function (e, n) {
                Ca(t, a.toString(), function (t) {
                  t ? t.error ? n(Is(t, o || {})) : e(t) : n(new zi("network-request-failed"))
                }, i, s ? void 0 : Gn(ki(r)), t.a, t.h.get())
              })
            }(t, e.endpoint, r, n, e.Vb, e.wb || !1)
          }).then(function (t) {
            return i = t, e.Qa ? e.Qa(n, i) : i
          }).then(e.J).then(function () {
            if (!e.da) return i;
            if (!(e.da in i)) throw new zi("internal-error");
            return i[e.da]
          })
        }

        function ws(t) {
          return Is({error: {errors: [{message: t}], code: 400, message: t}})
        }

        function Is(t, e) {
          var n = (t.error && t.error.errors && t.error.errors[0] || {}).reason || "",
            i = {keyInvalid: "invalid-api-key", ipRefererBlocked: "app-not-authorized"};
          if (n = i[n] ? new zi(i[n]) : null) return n;
          for (var r in n = t.error && t.error.message || "", J(i = {
            INVALID_CUSTOM_TOKEN: "invalid-custom-token",
            CREDENTIAL_MISMATCH: "custom-token-mismatch",
            MISSING_CUSTOM_TOKEN: "internal-error",
            INVALID_IDENTIFIER: "invalid-email",
            MISSING_CONTINUE_URI: "internal-error",
            INVALID_EMAIL: "invalid-email",
            INVALID_PASSWORD: "wrong-password",
            USER_DISABLED: "user-disabled",
            MISSING_PASSWORD: "internal-error",
            EMAIL_EXISTS: "email-already-in-use",
            PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
            INVALID_IDP_RESPONSE: "invalid-credential",
            INVALID_PENDING_TOKEN: "invalid-credential",
            FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
            MISSING_OR_INVALID_NONCE: "missing-or-invalid-nonce",
            INVALID_MESSAGE_PAYLOAD: "invalid-message-payload",
            INVALID_RECIPIENT_EMAIL: "invalid-recipient-email",
            INVALID_SENDER: "invalid-sender",
            EMAIL_NOT_FOUND: "user-not-found",
            RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
            EXPIRED_OOB_CODE: "expired-action-code",
            INVALID_OOB_CODE: "invalid-action-code",
            MISSING_OOB_CODE: "internal-error",
            INVALID_PROVIDER_ID: "invalid-provider-id",
            CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
            INVALID_ID_TOKEN: "invalid-user-token",
            TOKEN_EXPIRED: "user-token-expired",
            USER_NOT_FOUND: "user-token-expired",
            CORS_UNSUPPORTED: "cors-unsupported",
            DYNAMIC_LINK_NOT_ACTIVATED: "dynamic-link-not-activated",
            INVALID_APP_ID: "invalid-app-id",
            TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
            WEAK_PASSWORD: "weak-password",
            OPERATION_NOT_ALLOWED: "operation-not-allowed",
            USER_CANCELLED: "user-cancelled",
            CAPTCHA_CHECK_FAILED: "captcha-check-failed",
            INVALID_APP_CREDENTIAL: "invalid-app-credential",
            INVALID_CODE: "invalid-verification-code",
            INVALID_PHONE_NUMBER: "invalid-phone-number",
            INVALID_SESSION_INFO: "invalid-verification-id",
            INVALID_TEMPORARY_PROOF: "invalid-credential",
            MISSING_APP_CREDENTIAL: "missing-app-credential",
            MISSING_CODE: "missing-verification-code",
            MISSING_PHONE_NUMBER: "missing-phone-number",
            MISSING_SESSION_INFO: "missing-verification-id",
            QUOTA_EXCEEDED: "quota-exceeded",
            SESSION_EXPIRED: "code-expired",
            REJECTED_CREDENTIAL: "rejected-credential",
            INVALID_CONTINUE_URI: "invalid-continue-uri",
            MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
            MISSING_IOS_BUNDLE_ID: "missing-ios-bundle-id",
            UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
            INVALID_DYNAMIC_LINK_DOMAIN: "invalid-dynamic-link-domain",
            INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
            INVALID_CERT_HASH: "invalid-cert-hash",
            ADMIN_ONLY_OPERATION: "admin-restricted-operation"
          }, e || {}), e = (e = n.match(/^[^\s]+\s*:\s*(.*)$/)) && 1 < e.length ? e[1] : void 0, i) if (0 === n.indexOf(r)) return new zi(i[r], e);
          return !e && t && (e = Ti(t)), new zi("internal-error", e)
        }

        function Ts(t) {
          this.b = t, this.a = null, this.gb = function (o) {
            return (As = As || new qt(function (t, e) {
              function n() {
                Ni(), mi("gapi.load")("gapi.iframes", {
                  callback: t, ontimeout: function () {
                    Ni(), e(Error("Network Error"))
                  }, timeout: Es.get()
                })
              }

              if (mi("gapi.iframes.Iframe")) t(); else if (mi("gapi.load")) n(); else {
                var i = "__iframefcb" + Math.floor(1e6 * Math.random()).toString();
                h[i] = function () {
                  mi("gapi.load") ? n() : e(Error("Network Error"))
                }, zt(va(i = nt(ks, {onload: i}))).s(function () {
                  e(Error("Network Error"))
                })
              }
            }).s(function (t) {
              throw As = null, t
            })).then(function () {
              return new qt(function (i, r) {
                mi("gapi.iframes.getContext")().open({
                  where: document.body,
                  url: o.b,
                  messageHandlersFilter: mi("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"),
                  attributes: {style: {position: "absolute", top: "-100px", width: "1px", height: "1px"}},
                  dontclear: !0
                }, function (t) {
                  function e() {
                    clearTimeout(n), i()
                  }

                  o.a = t, o.a.restyle({setHideOnLeave: !1});
                  var n = setTimeout(function () {
                    r(Error("Network Error"))
                  }, Ss.get());
                  t.ping(e).then(e, function () {
                    r(Error("Network Error"))
                  })
                })
              })
            })
          }(this)
        }

        var ks = new z(Z, "/js/api.js"), Es = new Oi(3e4, 6e4),
          Ss = new Oi(5e3, 15e3), As = null;

        function Ns(t, e, n) {
          this.i = t, this.g = e, this.h = n, this.f = null, this.a = Tn(this.i, "/__/auth/iframe"), yn(this.a, "apiKey", this.g), yn(this.a, "appName", this.h), this.b = null, this.c = []
        }

        function Os(t, e, n, i, r) {
          this.o = t, this.l = e, this.c = n, this.m = i, this.h = this.g = this.i = null, this.a = r, this.f = null
        }

        function _s(t) {
          try {
            return $h.app(t).auth().ya()
          } catch (t) {
            return []
          }
        }

        function Ps(t, e, n, i, r) {
          this.l = t, this.f = e, this.b = n, this.c = i || null, this.h = r || null, this.o = this.u = this.v = null, this.g = [], this.m = this.a = null
        }

        function Cs(t) {
          var s = $n();
          return function (t) {
            return ys(t, rs, {}).then(function (t) {
              return t.authorizedDomains || []
            })
          }(t).then(function (t) {
            t:{
              var e = In(s), n = e.f;
              e = e.b;
              for (var i = 0; i < t.length; i++) {
                var r = t[i], o = e, a = n;
                if (o = 0 == r.indexOf("chrome-extension://") ? In(r).b == o && "chrome-extension" == a : ("http" == a || "https" == a) && (ni.test(r) ? o == r : (r = r.split(".").join("\\."), new RegExp("^(.+\\." + r + "|" + r + ")$", "i").test(o)))) {
                  t = !0;
                  break t
                }
              }
              t = !1
            }
            if (!t) throw new go($n())
          })
        }

        function Rs(r) {
          return r.m || (r.m = ri().then(function () {
            if (!r.u) {
              var t = r.c, e = r.h, n = _s(r.b), i = new Ns(r.l, r.f, r.b);
              i.f = t, i.b = e, i.c = H(n || []), r.u = i.toString()
            }
            r.i = new Ts(r.u), function (i) {
              if (!i.i) throw Error("IfcHandler must be initialized!");
              !function (t, e) {
                t.gb.then(function () {
                  t.a.register("authEvent", e, mi("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))
                })
              }(i.i, function (t) {
                var e = {};
                if (t && t.authEvent) {
                  var n = !1;
                  for (t = lo(t.authEvent), e = 0; e < i.g.length; e++) n = i.g[e](t) || n;
                  return (e = {}).status = n ? "ACK" : "ERROR", zt(e)
                }
                return e.status = "ERROR", zt(e)
              })
            }(r)
          })), r.m
        }

        function Ds(t) {
          return t.o || (t.v = t.c ? pi(t.c, _s(t.b)) : null, t.o = new Ta(t.f, br(t.h), t.v)), t.o
        }

        function Ls(t, e, n, i, r, o, a, s, u, c) {
          return (t = new Os(t, e, n, i, r)).i = o, t.g = a, t.h = s, t.b = W(u || null), t.f = c, t.toString()
        }

        function xs(t) {
          if (this.a = t || $h.INTERNAL.reactNative && $h.INTERNAL.reactNative.AsyncStorage, !this.a) throw new zi("internal-error", "The React Native compatibility library was not found.");
          this.type = "asyncStorage"
        }

        function Ms(t) {
          this.b = t, this.a = {}, this.c = I(this.f, this)
        }

        Ns.prototype.toString = function () {
          return this.f ? yn(this.a, "v", this.f) : Ln(this.a.a, "v"), this.b ? yn(this.a, "eid", this.b) : Ln(this.a.a, "eid"), this.c.length ? yn(this.a, "fw", this.c.join(",")) : Ln(this.a.a, "fw"), this.a.toString()
        }, Os.prototype.toString = function () {
          var t = Tn(this.o, "/__/auth/handler");
          if (yn(t, "apiKey", this.l), yn(t, "appName", this.c), yn(t, "authType", this.m), this.a.isOAuthProvider) {
            var e = this.a;
            try {
              var n = $h.app(this.c).auth().ea()
            } catch (t) {
              n = null
            }
            for (var i in e.ab = n, yn(t, "providerId", this.a.providerId), n = ki((e = this.a).zb)) n[i] = n[i].toString();
            i = e.Cc, n = W(n);
            for (var r = 0; r < i.length; r++) {
              var o = i[r];
              o in n && delete n[o]
            }
            e.eb && e.ab && !n[e.eb] && (n[e.eb] = e.ab), G(n) || yn(t, "customParameters", Ti(n))
          }
          if ("function" == typeof this.a.Fb && ((e = this.a.Fb()).length && yn(t, "scopes", e.join(","))), this.i ? yn(t, "redirectUrl", this.i) : Ln(t.a, "redirectUrl"), this.g ? yn(t, "eventId", this.g) : Ln(t.a, "eventId"), this.h ? yn(t, "v", this.h) : Ln(t.a, "v"), this.b) for (var a in this.b) this.b.hasOwnProperty(a) && !wn(t, a) && yn(t, a, this.b[a]);
          return this.f ? yn(t, "eid", this.f) : Ln(t.a, "eid"), (a = _s(this.c)).length && yn(t, "fw", a.join(",")), t.toString()
        }, (t = Ps.prototype).Ea = function (e, n, t) {
          var i = new zi("popup-closed-by-user"), r = new zi("web-storage-unsupported"), o = this, a = !1;
          return this.ga().then(function () {
            (function (t) {
              var e = {type: "webStorageSupport"};
              return Rs(t).then(function () {
                return function (e, n) {
                  return e.gb.then(function () {
                    return new qt(function (t) {
                      e.a.send(n.type, n, t, mi("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))
                    })
                  })
                }(t.i, e)
              }).then(function (t) {
                if (t && t.length && void 0 !== t[0].webStorageSupport) return t[0].webStorageSupport;
                throw Error()
              })
            })(o).then(function (t) {
              t || (e && ti(e), n(r), a = !0)
            })
          }).s(function () {
          }).then(function () {
            if (!a) return function (n) {
              return new qt(function (e) {
                return function t() {
                  un(2e3).then(function () {
                    if (n && !n.closed) return t();
                    e()
                  })
                }()
              })
            }(e)
          }).then(function () {
            if (!a) return un(t).then(function () {
              n(i)
            })
          })
        }, t.Mb = function () {
          var t = vi();
          return !Ii(t) && !Ai(t)
        }, t.Hb = function () {
          return !1
        }, t.Db = function (e, t, n, i, r, o, a) {
          if (!e) return Yt(new zi("popup-blocked"));
          if (a && !Ii()) return this.ga().s(function (t) {
            ti(e), r(t)
          }), i(), zt();
          this.a || (this.a = Cs(Ds(this)));
          var s = this;
          return this.a.then(function () {
            var t = s.ga().s(function (t) {
              throw ti(e), r(t), t
            });
            return i(), t
          }).then(function () {
            ho(n), a || Zn(Ls(s.l, s.f, s.b, t, n, null, o, s.c, void 0, s.h), e)
          }).s(function (t) {
            throw"auth/network-request-failed" == t.code && (s.a = null), t
          })
        }, t.Ca = function (t, e, n) {
          this.a || (this.a = Cs(Ds(this)));
          var i = this;
          return this.a.then(function () {
            ho(e), Zn(Ls(i.l, i.f, i.b, t, e, $n(), n, i.c, void 0, i.h))
          }).s(function (t) {
            throw"auth/network-request-failed" == t.code && (i.a = null), t
          })
        }, t.ga = function () {
          var t = this;
          return Rs(this).then(function () {
            return t.i.gb
          }).s(function () {
            throw t.a = null, new zi("network-request-failed")
          })
        }, t.Ob = function () {
          return !0
        }, t.wa = function (t) {
          this.g.push(t)
        }, t.La = function (e) {
          F(this.g, function (t) {
            return t == e
          })
        }, (t = xs.prototype).get = function (t) {
          return zt(this.a.getItem(t)).then(function (t) {
            return t && Ei(t)
          })
        }, t.set = function (t, e) {
          return zt(this.a.setItem(t, Ti(e)))
        }, t.P = function (t) {
          return zt(this.a.removeItem(t))
        }, t.Y = function () {
        }, t.ca = function () {
        };
        var js, Us = [];

        function Vs(t) {
          this.a = t
        }

        function Ks(t) {
          this.c = t, this.b = !1, this.a = []
        }

        function Fs(i, t, e, n) {
          var r, o, a, s, u = e || {}, c = null;
          if (i.b) return Yt(Error("connection_unavailable"));
          var h = n ? 800 : 50, f = "undefined" != typeof MessageChannel ? new MessageChannel : null;
          return new qt(function (e, n) {
            f ? (r = Math.floor(Math.random() * Math.pow(10, 20)).toString(), f.port1.start(), a = setTimeout(function () {
              n(Error("unsupported_event"))
            }, h), c = {
              messageChannel: f, onMessage: o = function (t) {
                t.data.eventId === r && ("ack" === t.data.status ? (clearTimeout(a), s = setTimeout(function () {
                  n(Error("timeout"))
                }, 3e3)) : "done" === t.data.status ? (clearTimeout(s), void 0 !== t.data.response ? e(t.data.response) : n(Error("unknown_error"))) : (clearTimeout(a), clearTimeout(s), n(Error("invalid_response"))))
              }
            }, i.a.push(c), f.port1.addEventListener("message", o), i.c.postMessage({
              eventType: t,
              eventId: r,
              data: u
            }, [f.port2])) : n(Error("connection_unavailable"))
          }).then(function (t) {
            return qs(i, c), t
          }).s(function (t) {
            throw qs(i, c), t
          })
        }

        function qs(t, e) {
          if (e) {
            var n = e.messageChannel, i = e.onMessage;
            n && (n.port1.removeEventListener("message", i), n.port1.close()), F(t.a, function (t) {
              return t == e
            })
          }
        }

        function Hs() {
          if (!Ws()) throw new zi("web-storage-unsupported");
          this.c = {}, this.a = [], this.b = 0, this.l = h.indexedDB, this.type = "indexedDB", this.g = this.m = this.f = this.i = null, this.u = !1, this.h = null;
          var i = this;
          si() && self ? (this.m = function () {
            var e = si() ? self : null;
            if (M(Us, function (t) {
              t.b == e && (n = t)
            }), !n) {
              var n = new Ms(e);
              Us.push(n)
            }
            return n
          }(), this.m.subscribe("keyChanged", function (t, n) {
            return $s(i).then(function (e) {
              return 0 < e.length && M(i.a, function (t) {
                t(e)
              }), {keyProcessed: V(e, n.key)}
            })
          }), this.m.subscribe("ping", function () {
            return zt(["keyChanged"])
          })) : function () {
            var t = h.navigator;
            return t && t.serviceWorker ? zt().then(function () {
              return t.serviceWorker.ready
            }).then(function (t) {
              return t.active || null
            }).s(function () {
              return null
            }) : zt(null)
          }().then(function (t) {
            (i.h = t) && (i.g = new Ks(new Vs(t)), Fs(i.g, "ping", null, !0).then(function (t) {
              t[0].fulfilled && V(t[0].value, "keyChanged") && (i.u = !0)
            }).s(function () {
            }))
          })
        }

        function Bs(i) {
          return new qt(function (e, n) {
            var t = i.l.open("firebaseLocalStorageDb", 1);
            t.onerror = function (t) {
              try {
                t.preventDefault()
              } catch (t) {
              }
              n(Error(t.target.error))
            }, t.onupgradeneeded = function (t) {
              t = t.target.result;
              try {
                t.createObjectStore("firebaseLocalStorage", {keyPath: "fbase_key"})
              } catch (t) {
                n(t)
              }
            }, t.onsuccess = function (t) {
              (t = t.target.result).objectStoreNames.contains("firebaseLocalStorage") ? e(t) : function (i) {
                return new qt(function (t, e) {
                  var n = i.l.deleteDatabase("firebaseLocalStorageDb");
                  n.onsuccess = function () {
                    t()
                  }, n.onerror = function (t) {
                    e(Error(t.target.error))
                  }
                })
              }(i).then(function () {
                return Bs(i)
              }).then(function (t) {
                e(t)
              }).s(function (t) {
                n(t)
              })
            }
          })
        }

        function Gs(t) {
          return t.o || (t.o = Bs(t)), t.o
        }

        function Ws() {
          try {
            return !!h.indexedDB
          } catch (t) {
            return !1
          }
        }

        function Xs(t) {
          return t.objectStore("firebaseLocalStorage")
        }

        function Js(t, e) {
          return t.transaction(["firebaseLocalStorage"], e ? "readwrite" : "readonly")
        }

        function zs(t) {
          return new qt(function (e, n) {
            t.onsuccess = function (t) {
              t && t.target ? e(t.target.result) : e()
            }, t.onerror = function (t) {
              n(t.target.error)
            }
          })
        }

        function Ys(t, e) {
          return t.g && t.h && function () {
            var t = h.navigator;
            return t && t.serviceWorker && t.serviceWorker.controller || null
          }() === t.h ? Fs(t.g, "keyChanged", {key: e}, t.u).then(function () {
          }).s(function () {
          }) : zt()
        }

        function $s(i) {
          return Gs(i).then(function (t) {
            var r = Xs(Js(t, !1));
            return r.getAll ? zs(r.getAll()) : new qt(function (e, n) {
              var i = [], t = r.openCursor();
              t.onsuccess = function (t) {
                (t = t.target.result) ? (i.push(t.value), t.continue()) : e(i)
              }, t.onerror = function (t) {
                n(t.target.error)
              }
            })
          }).then(function (t) {
            var e = {}, n = [];
            if (0 == i.b) {
              for (n = 0; n < t.length; n++) e[t[n].fbase_key] = t[n].value;
              n = function t(e, n) {
                var i, r = [];
                for (i in e) i in n ? typeof e[i] != typeof n[i] ? r.push(i) : "object" == typeof e[i] && null != e[i] && null != n[i] ? 0 < t(e[i], n[i]).length && r.push(i) : e[i] !== n[i] && r.push(i) : r.push(i);
                for (i in n) i in e || r.push(i);
                return r
              }(i.c, e), i.c = e
            }
            return n
          })
        }

        function Zs(t) {
          t.i && t.i.cancel("STOP_EVENT"), t.f && (clearTimeout(t.f), t.f = null)
        }

        function Qs(t) {
          var i = this, r = null;
          this.a = [], this.type = "indexedDB", this.c = t, this.b = zt().then(function () {
            if (Ws()) {
              var e = Si(), n = "__sak" + e;
              return js = js || new Hs, (r = js).set(n, e).then(function () {
                return r.get(n)
              }).then(function (t) {
                if (t !== e) throw Error("indexedDB not supported!");
                return r.P(n)
              }).then(function () {
                return r
              }).s(function () {
                return i.c
              })
            }
            return i.c
          }).then(function (t) {
            return i.type = t.type, t.Y(function (e) {
              M(i.a, function (t) {
                t(e)
              })
            }), t
          })
        }

        function tu() {
          this.a = {}, this.type = "inMemory"
        }

        function eu() {
          if (!function () {
            var t = "Node" == ui();
            if (!(t = nu() || t && $h.INTERNAL.node && $h.INTERNAL.node.localStorage)) return !1;
            try {
              return t.setItem("__sak", "1"), t.removeItem("__sak"), !0
            } catch (t) {
              return !1
            }
          }()) {
            if ("Node" == ui()) throw new zi("internal-error", "The LocalStorage compatibility library was not found.");
            throw new zi("web-storage-unsupported")
          }
          this.a = nu() || $h.INTERNAL.node.localStorage, this.type = "localStorage"
        }

        function nu() {
          try {
            var t = h.localStorage, e = Si();
            return t && (t.setItem(e, "1"), t.removeItem(e)), t
          } catch (t) {
            return null
          }
        }

        function iu() {
          this.type = "nullStorage"
        }

        function ru() {
          if (!function () {
            var t = "Node" == ui();
            if (!(t = ou() || t && $h.INTERNAL.node && $h.INTERNAL.node.sessionStorage)) return !1;
            try {
              return t.setItem("__sak", "1"), t.removeItem("__sak"), !0
            } catch (t) {
              return !1
            }
          }()) {
            if ("Node" == ui()) throw new zi("internal-error", "The SessionStorage compatibility library was not found.");
            throw new zi("web-storage-unsupported")
          }
          this.a = ou() || $h.INTERNAL.node.sessionStorage, this.type = "sessionStorage"
        }

        function ou() {
          try {
            var t = h.sessionStorage, e = Si();
            return t && (t.setItem(e, "1"), t.removeItem(e)), t
          } catch (t) {
            return null
          }
        }

        function au() {
          var t = {};
          t.Browser = cu, t.Node = hu, t.ReactNative = fu, t.Worker = lu, this.a = t[ui()]
        }

        Ms.prototype.f = function (n) {
          var i = n.data.eventType, r = n.data.eventId, t = this.a[i];
          if (t && 0 < t.length) {
            n.ports[0].postMessage({status: "ack", eventId: r, eventType: i, response: null});
            var e = [];
            M(t, function (t) {
              e.push(zt().then(function () {
                return t(n.origin, n.data.data)
              }))
            }), Zt(e).then(function (t) {
              var e = [];
              M(t, function (t) {
                e.push({fulfilled: t.Eb, value: t.value, reason: t.reason ? t.reason.message : void 0})
              }), M(e, function (t) {
                for (var e in t) void 0 === t[e] && delete t[e]
              }), n.ports[0].postMessage({status: "done", eventId: r, eventType: i, response: e})
            })
          }
        }, Ms.prototype.subscribe = function (t, e) {
          G(this.a) && this.b.addEventListener("message", this.c), void 0 === this.a[t] && (this.a[t] = []), this.a[t].push(e)
        }, Ms.prototype.unsubscribe = function (t, e) {
          void 0 !== this.a[t] && e ? (F(this.a[t], function (t) {
            return t == e
          }), 0 == this.a[t].length && delete this.a[t]) : e || delete this.a[t], G(this.a) && this.b.removeEventListener("message", this.c)
        }, Vs.prototype.postMessage = function (t, e) {
          this.a.postMessage(t, e)
        }, Ks.prototype.close = function () {
          for (; 0 < this.a.length;) qs(this, this.a[0]);
          this.b = !0
        }, (t = Hs.prototype).set = function (n, i) {
          var r, o = !1, a = this;
          return Gs(this).then(function (t) {
            return zs((t = Xs(Js(r = t, !0))).get(n))
          }).then(function (t) {
            var e = Xs(Js(r, !0));
            return t ? (t.value = i, zs(e.put(t))) : (a.b++, o = !0, (t = {}).fbase_key = n, t.value = i, zs(e.add(t)))
          }).then(function () {
            return a.c[n] = i, Ys(a, n)
          }).ia(function () {
            o && a.b--
          })
        }, t.get = function (e) {
          return Gs(this).then(function (t) {
            return zs(Xs(Js(t, !1)).get(e))
          }).then(function (t) {
            return t && t.value
          })
        }, t.P = function (e) {
          var n = !1, i = this;
          return Gs(this).then(function (t) {
            return n = !0, i.b++, zs(Xs(Js(t, !0)).delete(e))
          }).then(function () {
            return delete i.c[e], Ys(i, e)
          }).ia(function () {
            n && i.b--
          })
        }, t.Y = function (t) {
          0 == this.a.length && function (t) {
            Zs(t), function e() {
              t.f = setTimeout(function () {
                t.i = $s(t).then(function (e) {
                  0 < e.length && M(t.a, function (t) {
                    t(e)
                  })
                }).then(function () {
                  e()
                }).s(function (t) {
                  "STOP_EVENT" != t.message && e()
                })
              }, 800)
            }()
          }(this), this.a.push(t)
        }, t.ca = function (e) {
          F(this.a, function (t) {
            return t == e
          }), 0 == this.a.length && Zs(this)
        }, (t = Qs.prototype).get = function (e) {
          return this.b.then(function (t) {
            return t.get(e)
          })
        }, t.set = function (e, n) {
          return this.b.then(function (t) {
            return t.set(e, n)
          })
        }, t.P = function (e) {
          return this.b.then(function (t) {
            return t.P(e)
          })
        }, t.Y = function (t) {
          this.a.push(t)
        }, t.ca = function (e) {
          F(this.a, function (t) {
            return t == e
          })
        }, (t = tu.prototype).get = function (t) {
          return zt(this.a[t])
        }, t.set = function (t, e) {
          return this.a[t] = e, zt()
        }, t.P = function (t) {
          return delete this.a[t], zt()
        }, t.Y = function () {
        }, t.ca = function () {
        }, (t = eu.prototype).get = function (t) {
          var e = this;
          return zt().then(function () {
            return Ei(e.a.getItem(t))
          })
        }, t.set = function (e, n) {
          var i = this;
          return zt().then(function () {
            var t = Ti(n);
            null === t ? i.P(e) : i.a.setItem(e, t)
          })
        }, t.P = function (t) {
          var e = this;
          return zt().then(function () {
            e.a.removeItem(t)
          })
        }, t.Y = function (t) {
          h.window && Be(h.window, "storage", t)
        }, t.ca = function (t) {
          h.window && Xe(h.window, "storage", t)
        }, (t = iu.prototype).get = function () {
          return zt(null)
        }, t.set = function () {
          return zt()
        }, t.P = function () {
          return zt()
        }, t.Y = function () {
        }, t.ca = function () {
        }, (t = ru.prototype).get = function (t) {
          var e = this;
          return zt().then(function () {
            return Ei(e.a.getItem(t))
          })
        }, t.set = function (e, n) {
          var i = this;
          return zt().then(function () {
            var t = Ti(n);
            null === t ? i.P(e) : i.a.setItem(e, t)
          })
        }, t.P = function (t) {
          var e = this;
          return zt().then(function () {
            e.a.removeItem(t)
          })
        }, t.Y = function () {
        }, t.ca = function () {
        };
        var su, uu, cu = {B: eu, Sa: ru}, hu = {B: eu, Sa: ru}, fu = {B: xs, Sa: iu}, lu = {B: eu, Sa: iu},
          du = {Xc: "local", NONE: "none", Zc: "session"};

        function pu() {
          var t = !(Ai(vi()) || !ai()), e = Ii(), n = gi();
          this.o = t, this.h = e, this.m = n, this.a = {}, t = su = su || new au;
          try {
            this.g = !Yn() && Ci() || !h.indexedDB ? new t.a.B : new Qs(si() ? new tu : new t.a.B)
          } catch (t) {
            this.g = new tu, this.h = !0
          }
          try {
            this.i = new t.a.Sa
          } catch (t) {
            this.i = new tu
          }
          this.l = new tu, this.f = I(this.Nb, this), this.b = {}
        }

        function vu() {
          return uu = uu || new pu
        }

        function mu(t, e) {
          switch (e) {
            case"session":
              return t.i;
            case"none":
              return t.l;
            default:
              return t.g
          }
        }

        function gu(t, e) {
          return "firebase:" + t.name + (e ? ":" + e : "")
        }

        function bu(t, e, n) {
          return n = gu(e, n), "local" == e.B && (t.b[n] = null), mu(t, e.B).P(n)
        }

        function yu(t) {
          t.c && (clearInterval(t.c), t.c = null)
        }

        function wu(t) {
          this.a = t, this.b = vu()
        }

        (t = pu.prototype).get = function (t, e) {
          return mu(this, t.B).get(gu(t, e))
        }, t.set = function (e, t, n) {
          var i = gu(e, n), r = this, o = mu(this, e.B);
          return o.set(i, t).then(function () {
            return o.get(i)
          }).then(function (t) {
            "local" == e.B && (r.b[i] = t)
          })
        }, t.addListener = function (t, e, n) {
          t = gu(t, e), this.m && (this.b[t] = h.localStorage.getItem(t)), G(this.a) && (mu(this, "local").Y(this.f), this.h || (Yn() || !Ci()) && h.indexedDB || !this.m || function (i) {
            yu(i), i.c = setInterval(function () {
              for (var t in i.a) {
                var e = h.localStorage.getItem(t), n = i.b[t];
                e != n && (i.b[t] = e, e = new De({
                  type: "storage",
                  key: t,
                  target: window,
                  oldValue: n,
                  newValue: e,
                  a: !0
                }), i.Nb(e))
              }
            }, 1e3)
          }(this)), this.a[t] || (this.a[t] = []), this.a[t].push(n)
        }, t.removeListener = function (t, e, n) {
          t = gu(t, e), this.a[t] && (F(this.a[t], function (t) {
            return t == n
          }), 0 == this.a[t].length && delete this.a[t]), G(this.a) && (mu(this, "local").ca(this.f), yu(this))
        }, t.Nb = function (t) {
          if (t && t.f) {
            var e = t.a.key;
            if (null == e) for (var n in this.a) {
              var i = this.b[n];
              void 0 === i && (i = null);
              var r = h.localStorage.getItem(n);
              r !== i && (this.b[n] = r, this.Ya(n))
            } else if (0 == e.indexOf("firebase:") && this.a[e]) {
              if (void 0 !== t.a.a ? mu(this, "local").ca(this.f) : yu(this), this.o) if (n = h.localStorage.getItem(e), (i = t.a.newValue) !== n) null !== i ? h.localStorage.setItem(e, i) : h.localStorage.removeItem(e); else if (this.b[e] === i && void 0 === t.a.a) return;
              var o = this;
              n = function () {
                void 0 === t.a.a && o.b[e] === h.localStorage.getItem(e) || (o.b[e] = h.localStorage.getItem(e), o.Ya(e))
              }, me && Se && 10 == Se && h.localStorage.getItem(e) !== t.a.newValue && t.a.newValue !== t.a.oldValue ? setTimeout(n, 10) : n()
            }
          } else M(t, I(this.Ya, this))
        }, t.Ya = function (t) {
          this.a[t] && M(this.a[t], function (t) {
            t()
          })
        };
        var Iu, Tu = {name: "authEvent", B: "local"};

        function ku() {
          this.a = vu()
        }

        function Eu(t, e) {
          this.b = Su, this.f = h.Uint8Array ? new Uint8Array(this.b) : Array(this.b), this.g = this.c = 0, this.a = [], this.i = t, this.h = e, this.m = h.Int32Array ? new Int32Array(64) : Array(64), void 0 !== Iu || (Iu = h.Int32Array ? new Int32Array(Ru) : Ru), this.reset()
        }

        E(Eu, function () {
          this.b = -1
        });
        for (var Su = 64, Au = Su - 1, Nu = [], Ou = 0; Ou < Au; Ou++) Nu[Ou] = 0;
        var _u = q(128, Nu);

        function Pu(t) {
          for (var e = t.f, n = t.m, i = 0, r = 0; r < e.length;) n[i++] = e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3], r = 4 * i;
          for (e = 16; e < 64; e++) {
            r = 0 | n[e - 15], i = 0 | n[e - 2];
            var o = (0 | n[e - 16]) + ((r >>> 7 | r << 25) ^ (r >>> 18 | r << 14) ^ r >>> 3) | 0,
              a = (0 | n[e - 7]) + ((i >>> 17 | i << 15) ^ (i >>> 19 | i << 13) ^ i >>> 10) | 0;
            n[e] = o + a | 0
          }
          i = 0 | t.a[0], r = 0 | t.a[1];
          var s = 0 | t.a[2], u = 0 | t.a[3], c = 0 | t.a[4], h = 0 | t.a[5], f = 0 | t.a[6];
          for (o = 0 | t.a[7], e = 0; e < 64; e++) {
            var l = ((i >>> 2 | i << 30) ^ (i >>> 13 | i << 19) ^ (i >>> 22 | i << 10)) + (i & r ^ i & s ^ r & s) | 0;
            a = (o = o + ((c >>> 6 | c << 26) ^ (c >>> 11 | c << 21) ^ (c >>> 25 | c << 7)) | 0) + ((a = (a = c & h ^ ~c & f) + (0 | Iu[e]) | 0) + (0 | n[e]) | 0) | 0, o = f, f = h, h = c, c = u + a | 0, u = s, s = r, r = i, i = a + l | 0
          }
          t.a[0] = t.a[0] + i | 0, t.a[1] = t.a[1] + r | 0, t.a[2] = t.a[2] + s | 0, t.a[3] = t.a[3] + u | 0, t.a[4] = t.a[4] + c | 0, t.a[5] = t.a[5] + h | 0, t.a[6] = t.a[6] + f | 0, t.a[7] = t.a[7] + o | 0
        }

        function Cu(t, e, n) {
          void 0 === n && (n = e.length);
          var i = 0, r = t.c;
          if (f(e)) for (; i < n;) t.f[r++] = e.charCodeAt(i++), r == t.b && (Pu(t), r = 0); else {
            if (!v(e)) throw Error("message must be string or array");
            for (; i < n;) {
              var o = e[i++];
              if (!("number" == typeof o && 0 <= o && o <= 255 && o == (0 | o))) throw Error("message must be a byte array");
              t.f[r++] = o, r == t.b && (Pu(t), r = 0)
            }
          }
          t.c = r, t.g += n
        }

        Eu.prototype.reset = function () {
          this.g = this.c = 0, this.a = h.Int32Array ? new Int32Array(this.h) : H(this.h)
        };
        var Ru = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];

        function Du() {
          Eu.call(this, 8, Lu)
        }

        E(Du, Eu);
        var Lu = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];

        function xu(t, e, n, i, r) {
          this.l = t, this.i = e, this.m = n, this.o = i || null, this.u = r || null, this.h = e + ":" + n, this.v = new ku, this.g = new wu(this.h), this.f = null, this.b = [], this.a = this.c = null
        }

        function Mu(t) {
          return new zi("invalid-cordova-configuration", t)
        }

        function ju(t) {
          var e = new Du;
          Cu(e, t), t = [];
          var n = 8 * e.g;
          e.c < 56 ? Cu(e, _u, 56 - e.c) : Cu(e, _u, e.b - (e.c - 56));
          for (var i = 63; 56 <= i; i--) e.f[i] = 255 & n, n /= 256;
          for (Pu(e), i = n = 0; i < e.i; i++) for (var r = 24; 0 <= r; r -= 8) t[n++] = e.a[i] >> r & 255;
          return function (t) {
            return j(t, function (t) {
              return 1 < (t = t.toString(16)).length ? t : "0" + t
            }).join("")
          }(t)
        }

        function Uu(t, e) {
          for (var n = 0; n < t.b.length; n++) try {
            t.b[n](e)
          } catch (t) {
          }
        }

        function Vu(i) {
          return i.f || (i.f = i.ga().then(function () {
            return new qt(function (n) {
              i.wa(function t(e) {
                return n(e), i.La(t), !1
              }), function (r) {
                function e(i) {
                  t = !0, n && n.cancel(), Ku(r).then(function (t) {
                    var e = o;
                    if (t && i && i.url) {
                      var n = null;
                      -1 != (e = Dr(i.url)).indexOf("/__/auth/callback") && (n = (n = "object" == typeof (n = Ei(wn(n = In(e), "firebaseError") || null)) ? Yi(n) : null) ? new fo(t.c, t.b, null, null, n) : new fo(t.c, t.b, e, t.f)), e = n || o
                    }
                    Uu(r, e)
                  })
                }

                var o = new fo("unknown", null, null, null, new zi("no-auth-event")), t = !1,
                  n = un(500).then(function () {
                    return Ku(r).then(function () {
                      t || Uu(r, o)
                    })
                  }), i = h.handleOpenURL;
                h.handleOpenURL = function (t) {
                  if (0 == t.toLowerCase().indexOf(mi("BuildInfo.packageName", h).toLowerCase() + "://") && e({url: t}), "function" == typeof i) try {
                    i(t)
                  } catch (t) {
                    console.error(t)
                  }
                }, mo = mo || new po, mo.subscribe(e)
              }(i)
            })
          })), i.f
        }

        function Ku(e) {
          var n = null;
          return function (t) {
            return t.b.get(Tu, t.a).then(function (t) {
              return lo(t)
            })
          }(e.g).then(function (t) {
            return n = t, bu((t = e.g).b, Tu, t.a)
          }).then(function () {
            return n
          })
        }

        function Fu(t) {
          this.a = t, this.b = vu()
        }

        (t = xu.prototype).ga = function () {
          return this.za ? this.za : this.za = (oi(void 0) ? ri().then(function () {
            return new qt(function (t, e) {
              var n = h.document, i = setTimeout(function () {
                e(Error("Cordova framework is not ready."))
              }, 1e3);
              n.addEventListener("deviceready", function () {
                clearTimeout(i), t()
              }, !1)
            })
          }) : Yt(Error("Cordova must run in an Android or iOS file scheme."))).then(function () {
            if ("function" != typeof mi("universalLinks.subscribe", h)) throw Mu("cordova-universal-links-plugin-fix is not installed");
            if (void 0 === mi("BuildInfo.packageName", h)) throw Mu("cordova-plugin-buildinfo is not installed");
            if ("function" != typeof mi("cordova.plugins.browsertab.openUrl", h)) throw Mu("cordova-plugin-browsertab is not installed");
            if ("function" != typeof mi("cordova.InAppBrowser.open", h)) throw Mu("cordova-plugin-inappbrowser is not installed")
          }, function () {
            throw new zi("cordova-not-ready")
          })
        }, t.Ea = function (t, e) {
          return e(new zi("operation-not-supported-in-this-environment")), zt()
        }, t.Db = function () {
          return Yt(new zi("operation-not-supported-in-this-environment"))
        }, t.Ob = function () {
          return !1
        }, t.Mb = function () {
          return !0
        }, t.Hb = function () {
          return !0
        }, t.Ca = function (t, e, n) {
          if (this.c) return Yt(new zi("redirect-operation-pending"));
          var i = this, r = h.document, o = null, a = null, s = null, u = null;
          return this.c = zt().then(function () {
            return ho(e), Vu(i)
          }).then(function () {
            return function (n, t, e, i) {
              var r = function () {
                for (var t = 20, e = []; 0 < t;) e.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62 * Math.random()))), t--;
                return e.join("")
              }(), o = new fo(t, i, null, r, new zi("no-auth-event")), a = mi("BuildInfo.packageName", h);
              if ("string" != typeof a) throw new zi("invalid-cordova-configuration");
              var s = mi("BuildInfo.displayName", h), u = {};
              if (vi().toLowerCase().match(/iphone|ipad|ipod/)) u.ibi = a; else {
                if (!vi().toLowerCase().match(/android/)) return Yt(new zi("operation-not-supported-in-this-environment"));
                u.apn = a
              }
              s && (u.appDisplayName = s), r = ju(r), u.sessionId = r;
              var c = Ls(n.l, n.i, n.m, t, e, null, i, n.o, u, n.u);
              return n.ga().then(function () {
                var t = n.h;
                return n.v.a.set(Tu, o.w(), t)
              }).then(function () {
                var t = mi("cordova.plugins.browsertab.isAvailable", h);
                if ("function" != typeof t) throw new zi("invalid-cordova-configuration");
                var e = null;
                t(function (t) {
                  if (t) {
                    if ("function" != typeof (e = mi("cordova.plugins.browsertab.openUrl", h))) throw new zi("invalid-cordova-configuration");
                    e(c)
                  } else {
                    if ("function" != typeof (e = mi("cordova.InAppBrowser.open", h))) throw new zi("invalid-cordova-configuration");
                    t = vi(), n.a = e(c, t.match(/(iPad|iPhone|iPod).*OS 7_\d/i) || t.match(/(iPad|iPhone|iPod).*OS 8_\d/i) ? "_blank" : "_system", "location=yes")
                  }
                })
              })
            }(i, t, e, n)
          }).then(function () {
            return new qt(function (e, t) {
              a = function () {
                var t = mi("cordova.plugins.browsertab.close", h);
                return e(), "function" == typeof t && t(), i.a && "function" == typeof i.a.close && (i.a.close(), i.a = null), !1
              }, i.wa(a), s = function () {
                o = o || un(2e3).then(function () {
                  t(new zi("redirect-cancelled-by-user"))
                })
              }, u = function () {
                _i() && s()
              }, r.addEventListener("resume", s, !1), vi().toLowerCase().match(/android/) || r.addEventListener("visibilitychange", u, !1)
            }).s(function (t) {
              return Ku(i).then(function () {
                throw t
              })
            })
          }).ia(function () {
            s && r.removeEventListener("resume", s, !1), u && r.removeEventListener("visibilitychange", u, !1), o && o.cancel(), a && i.La(a), i.c = null
          })
        }, t.wa = function (e) {
          this.b.push(e), Vu(this).s(function (t) {
            "auth/invalid-cordova-configuration" === t.code && (t = new fo("unknown", null, null, null, new zi("no-auth-event")), e(t))
          })
        }, t.La = function (e) {
          F(this.b, function (t) {
            return t == e
          })
        };
        var qu = {name: "pendingRedirect", B: "session"};

        function Hu(t) {
          return bu(t.b, qu, t.a)
        }

        function Bu(t, e, n) {
          this.i = {}, this.u = 0, this.A = t, this.l = e, this.o = n, this.h = [], this.f = !1, this.m = I(this.cb, this), this.b = new tc, this.v = new rc, this.g = new Fu(this.l + ":" + this.o), this.c = {}, this.c.unknown = this.b, this.c.signInViaRedirect = this.b, this.c.linkViaRedirect = this.b, this.c.reauthViaRedirect = this.b, this.c.signInViaPopup = this.v, this.c.linkViaPopup = this.v, this.c.reauthViaPopup = this.v, this.a = Gu(this.A, this.l, this.o, mr)
        }

        function Gu(t, e, n, i) {
          var r = $h.SDK_VERSION || null;
          return oi() ? new xu(t, e, n, r, i) : new Ps(t, e, n, r, i)
        }

        function Wu(e) {
          e.f || (e.f = !0, e.a.wa(e.m));
          var n = e.a;
          return e.a.ga().s(function (t) {
            throw e.a == n && e.reset(), t
          })
        }

        function Xu(n) {
          n.a.Mb() && Wu(n).s(function (t) {
            var e = new fo("unknown", null, null, null, new zi("operation-not-supported-in-this-environment"));
            $u(t) && n.cb(e)
          }), n.a.Hb() || ec(n.b)
        }

        (t = Bu.prototype).reset = function () {
          this.f = !1, this.a.La(this.m), this.a = Gu(this.A, this.l, this.o), this.i = {}
        }, t.Za = function () {
          this.b.Za()
        }, t.subscribe = function (t) {
          if (V(this.h, t) || this.h.push(t), !this.f) {
            var n = this;
            (function (t) {
              return t.b.get(qu, t.a).then(function (t) {
                return "pending" == t
              })
            })(this.g).then(function (t) {
              t ? Hu(n.g).then(function () {
                Wu(n).s(function (t) {
                  var e = new fo("unknown", null, null, null, new zi("operation-not-supported-in-this-environment"));
                  $u(t) && n.cb(e)
                })
              }) : Xu(n)
            }).s(function () {
              Xu(n)
            })
          }
        }, t.unsubscribe = function (e) {
          F(this.h, function (t) {
            return t == e
          })
        }, t.cb = function (t) {
          if (!t) throw new zi("invalid-auth-event");
          if (6e5 <= k() - this.u && (this.i = {}, this.u = 0), t && t.getUid() && this.i.hasOwnProperty(t.getUid())) return !1;
          for (var e = !1, n = 0; n < this.h.length; n++) {
            var i = this.h[n];
            if (i.xb(t.c, t.b)) {
              (e = this.c[t.c]) && (e.h(t, i), t && (t.f || t.b) && (this.i[t.getUid()] = !0, this.u = k())), e = !0;
              break
            }
          }
          return ec(this.b), e
        };
        var Ju = new Oi(2e3, 1e4), zu = new Oi(3e4, 6e4);

        function Yu(t, e, n, i, r, o) {
          return t.a.Db(e, n, i, function () {
            t.f || (t.f = !0, t.a.wa(t.m))
          }, function () {
            t.reset()
          }, r, o)
        }

        function $u(t) {
          return !(!t || "auth/cordova-not-ready" != t.code)
        }

        Bu.prototype.fa = function () {
          return this.b.fa()
        }, Bu.prototype.Ca = function (t, e, n) {
          var i, r = this;
          return function (t) {
            return t.b.set(qu, "pending", t.a)
          }(this.g).then(function () {
            return r.a.Ca(t, e, n).s(function (t) {
              if ($u(t)) throw new zi("operation-not-supported-in-this-environment");
              return i = t, Hu(r.g).then(function () {
                throw i
              })
            }).then(function () {
              return r.a.Ob() ? new qt(function () {
              }) : Hu(r.g).then(function () {
                return r.fa()
              }).then(function () {
              }).s(function () {
              })
            })
          })
        }, Bu.prototype.Ea = function (e, n, t, i) {
          return this.a.Ea(t, function (t) {
            e.ha(n, null, t, i)
          }, Ju.get())
        };
        var Zu = {};

        function Qu(t, e, n) {
          var i = e + ":" + n;
          return Zu[i] || (Zu[i] = new Bu(t, e, n)), Zu[i]
        }

        function tc() {
          this.b = null, this.f = [], this.c = [], this.a = null, this.i = this.g = !1
        }

        function ec(t) {
          t.g || (t.g = !0, ic(t, !1, null, null))
        }

        function nc(t, e) {
          if (t.b = function () {
            return zt(e)
          }, t.f.length) for (var n = 0; n < t.f.length; n++) t.f[n](e)
        }

        function ic(t, e, n, i) {
          e ? i ? function (t, e) {
            if (t.b = function () {
              return Yt(e)
            }, t.c.length) for (var n = 0; n < t.c.length; n++) t.c[n](e)
          }(t, i) : nc(t, n) : nc(t, {user: null}), t.f = [], t.c = []
        }

        function rc() {
        }

        function oc() {
          this.ub = !1, Object.defineProperty(this, "appVerificationDisabled", {
            get: function () {
              return this.ub
            }, set: function (t) {
              this.ub = t
            }, enumerable: !1
          })
        }

        function ac(t, e) {
          this.a = e, Mi(this, "verificationId", t)
        }

        function sc(t, e, n, i) {
          return new so(t).Va(e, n).then(function (t) {
            return new ac(t, i)
          })
        }

        function uc(t) {
          var e = vr(t);
          if (!(e && e.exp && e.auth_time && e.iat)) throw new zi("internal-error", "An internal error occurred. The token obtained by Firebase appears to be malformed. Please retry the operation.");
          ji(this, {
            token: t,
            expirationTime: Pi(1e3 * e.exp),
            authTime: Pi(1e3 * e.auth_time),
            issuedAtTime: Pi(1e3 * e.iat),
            signInProvider: e.firebase && e.firebase.sign_in_provider ? e.firebase.sign_in_provider : null,
            claims: e
          })
        }

        function cc(t, e, n) {
          if (this.h = t, this.i = e, this.g = n, this.c = 3e4, this.f = 96e4, this.b = null, this.a = this.c, this.f < this.c) throw Error("Proactive refresh lower bound greater than upper bound!")
        }

        function hc(t, e) {
          return e ? (t.a = t.c, t.g()) : (e = t.a, t.a *= 2, t.a > t.f && (t.a = t.f), e)
        }

        function fc(t) {
          this.f = t, this.b = this.a = null, this.c = 0
        }

        function lc(t, e) {
          var n = e[Ea], i = e.refreshToken;
          e = dc(e.expiresIn), t.b = n, t.c = e, t.a = i
        }

        function dc(t) {
          return k() + 1e3 * parseInt(t, 10)
        }

        function pc(e, t) {
          return function (t, i) {
            return new qt(function (e, n) {
              "refresh_token" == i.grant_type && i.refresh_token || "authorization_code" == i.grant_type && i.code ? Ca(t, t.i + "?key=" + encodeURIComponent(t.b), function (t) {
                t ? t.error ? n(Is(t)) : t.access_token && t.refresh_token ? e(t) : n(new zi("internal-error")) : n(new zi("network-request-failed"))
              }, "POST", Dn(i).toString(), t.f, t.m.get()) : n(new zi("internal-error"))
            })
          }(e.f, t).then(function (t) {
            return e.b = t.access_token, e.c = dc(t.expires_in), e.a = t.refresh_token, {
              accessToken: e.b,
              expirationTime: e.c,
              refreshToken: e.a
            }
          }).s(function (t) {
            throw"auth/user-token-expired" == t.code && (e.a = null), t
          })
        }

        function vc(t, e) {
          this.a = t || null, this.b = e || null, ji(this, {lastSignInTime: Pi(e || null), creationTime: Pi(t || null)})
        }

        function mc(t, e, n, i, r, o) {
          ji(this, {
            uid: t,
            displayName: i || null,
            photoURL: r || null,
            email: n || null,
            phoneNumber: o || null,
            providerId: e
          })
        }

        function gc(t, e) {
          for (var n in Re.call(this, t), e) this[n] = e[n]
        }

        function bc(t, e, n) {
          this.G = [], this.l = t.apiKey, this.o = t.appName, this.u = t.authDomain || null, t = $h.SDK_VERSION ? pi($h.SDK_VERSION) : null, this.c = new Ta(this.l, br(mr), t), this.h = new fc(this.c), Sc(this, e[Ea]), lc(this.h, e), Mi(this, "refreshToken", this.h.a), Oc(this, n || {}), nn.call(this), this.I = !1, this.u && bi() && (this.a = Qu(this.u, this.l, this.o)), this.N = [], this.i = null, this.A = function (e) {
            return new cc(function () {
              return e.F(!0)
            }, function (t) {
              return !(!t || "auth/network-request-failed" != t.code)
            }, function () {
              var t = e.h.c - k() - 3e5;
              return 0 < t ? t : 0
            })
          }(this), this.V = I(this.Ha, this);
          var i = this;
          this.ka = null, this.ta = function (t) {
            i.pa(t.g)
          }, this.X = null, this.O = [], this.sa = function (t) {
            wc(i, t.c)
          }, this.W = null
        }

        function yc(t, e) {
          t.X && Xe(t.X, "languageCodeChanged", t.ta), (t.X = e) && Be(e, "languageCodeChanged", t.ta)
        }

        function wc(t, e) {
          t.O = e, Pa(t.c, $h.SDK_VERSION ? pi($h.SDK_VERSION, t.O) : null)
        }

        function Ic(t, e) {
          t.W && Xe(t.W, "frameworkChanged", t.sa), (t.W = e) && Be(e, "frameworkChanged", t.sa)
        }

        function Tc(e) {
          try {
            return $h.app(e.o).auth()
          } catch (t) {
            throw new zi("internal-error", "No firebase.auth.Auth instance is available for the Firebase App '" + e.o + "'!")
          }
        }

        function kc(t) {
          t.D || t.A.b || (t.A.start(), Xe(t, "tokenChanged", t.V), Be(t, "tokenChanged", t.V))
        }

        function Ec(t) {
          Xe(t, "tokenChanged", t.V), t.A.stop()
        }

        function Sc(t, e) {
          t.ra = e, Mi(t, "_lat", e)
        }

        function Ac(t) {
          for (var e = [], n = 0; n < t.N.length; n++) e.push(t.N[n](t));
          return Zt(e).then(function () {
            return t
          })
        }

        function Nc(t) {
          t.a && !t.I && (t.I = !0, t.a.subscribe(t))
        }

        function Oc(t, e) {
          ji(t, {
            uid: e.uid,
            displayName: e.displayName || null,
            photoURL: e.photoURL || null,
            email: e.email || null,
            emailVerified: e.emailVerified || !1,
            phoneNumber: e.phoneNumber || null,
            isAnonymous: e.isAnonymous || !1,
            metadata: new vc(e.createdAt, e.lastLoginAt),
            providerData: []
          })
        }

        function _c() {
        }

        function Pc(t) {
          return zt().then(function () {
            if (t.D) throw new zi("app-deleted")
          })
        }

        function Cc(t) {
          return j(t.providerData, function (t) {
            return t.providerId
          })
        }

        function Rc(t, e) {
          e && (Dc(t, e.providerId), t.providerData.push(e))
        }

        function Dc(t, e) {
          F(t.providerData, function (t) {
            return t.providerId == e
          })
        }

        function Lc(t, e, n) {
          ("uid" != e || n) && t.hasOwnProperty(e) && Mi(t, e, n)
        }

        function xc(e, t) {
          e != t && (ji(e, {
            uid: t.uid,
            displayName: t.displayName,
            photoURL: t.photoURL,
            email: t.email,
            emailVerified: t.emailVerified,
            phoneNumber: t.phoneNumber,
            isAnonymous: t.isAnonymous,
            providerData: []
          }), t.metadata ? Mi(e, "metadata", function (t) {
            return new vc(t.a, t.b)
          }(t.metadata)) : Mi(e, "metadata", new vc), M(t.providerData, function (t) {
            Rc(e, t)
          }), function (t, e) {
            t.b = e.b, t.a = e.a, t.c = e.c
          }(e.h, t.h), Mi(e, "refreshToken", e.h.a))
        }

        function Mc(n) {
          return n.F().then(function (t) {
            var e = n.isAnonymous;
            return function (t, e) {
              return ys(t.c, ts, {idToken: e}).then(I(t.wc, t))
            }(n, t).then(function () {
              return e || Lc(n, "isAnonymous", !1), t
            })
          })
        }

        function jc(t, e) {
          e[Ea] && t.ra != e[Ea] && (lc(t.h, e), t.dispatchEvent(new gc("tokenChanged")), Sc(t, e[Ea]), Lc(t, "refreshToken", t.h.a))
        }

        function Uc(t, e) {
          return Mc(t).then(function () {
            if (V(Cc(t), e)) return Ac(t).then(function () {
              throw new zi("provider-already-linked")
            })
          })
        }

        function Vc(t, e, n) {
          return Ui({user: t, credential: co(e), additionalUserInfo: e = kr(e), operationType: n})
        }

        function Kc(t, e) {
          return jc(t, e), t.reload().then(function () {
            return t
          })
        }

        function Fc(n, i, t, e, r) {
          if (!bi()) return Yt(new zi("operation-not-supported-in-this-environment"));
          if (n.i && !r) return Yt(n.i);
          var o = Tr(t.providerId), a = Si(n.uid + ":::"), s = null;
          (!Ii() || ai()) && n.u && t.isOAuthProvider && (s = Ls(n.u, n.l, n.o, i, t, null, a, $h.SDK_VERSION || null));
          var u = ei(s, o && o.Ba, o && o.Aa);
          return e = e().then(function () {
            if (Hc(n), !r) return n.F().then(function () {
            })
          }).then(function () {
            return Yu(n.a, u, i, t, a, !!s)
          }).then(function () {
            return new qt(function (t, e) {
              n.ha(i, null, new zi("cancelled-popup-request"), n.g || null), n.f = t, n.v = e, n.g = a, n.b = n.a.Ea(n, i, u, a)
            })
          }).then(function (t) {
            return u && ti(u), t ? Ui(t) : null
          }).s(function (t) {
            throw u && ti(u), t
          }), Bc(n, e, r)
        }

        function qc(e, t, n, i, r) {
          if (!bi()) return Yt(new zi("operation-not-supported-in-this-environment"));
          if (e.i && !r) return Yt(e.i);
          var o = null, a = Si(e.uid + ":::");
          return i = i().then(function () {
            if (Hc(e), !r) return e.F().then(function () {
            })
          }).then(function () {
            return e.aa = a, Ac(e)
          }).then(function (t) {
            return e.ba && (t = (t = e.ba).b.set(Xc, e.w(), t.a)), t
          }).then(function () {
            return e.a.Ca(t, n, a)
          }).s(function (t) {
            if (o = t, e.ba) return Jc(e.ba);
            throw o
          }).then(function () {
            if (o) throw o
          }), Bc(e, i, r)
        }

        function Hc(t) {
          if (!t.a || !t.I) {
            if (t.a && !t.I) throw new zi("internal-error");
            throw new zi("auth-domain-config-required")
          }
        }

        function Bc(t, e, n) {
          var i = function (e, t, n) {
            return e.i && !n ? (t.cancel(), Yt(e.i)) : t.s(function (t) {
              throw!t || "auth/user-disabled" != t.code && "auth/user-token-expired" != t.code || (e.i || e.dispatchEvent(new gc("userInvalidated")), e.i = t), t
            })
          }(t, e, n);
          return t.G.push(i), i.ia(function () {
            K(t.G, i)
          }), i
        }

        function Gc(t) {
          if (!t.apiKey) return null;
          var e = {apiKey: t.apiKey, authDomain: t.authDomain, appName: t.appName}, n = {};
          if (!(t.stsTokenManager && t.stsTokenManager.accessToken && t.stsTokenManager.expirationTime)) return null;
          n[Ea] = t.stsTokenManager.accessToken, n.refreshToken = t.stsTokenManager.refreshToken || null, n.expiresIn = (t.stsTokenManager.expirationTime - k()) / 1e3;
          var i = new bc(e, n, t);
          return t.providerData && M(t.providerData, function (t) {
            t && Rc(i, Ui(t))
          }), t.redirectEventId && (i.aa = t.redirectEventId), i
        }

        function Wc(t) {
          this.a = t, this.b = vu()
        }

        tc.prototype.reset = function () {
          this.b = null, this.a && (this.a.cancel(), this.a = null)
        }, tc.prototype.h = function (t, e) {
          if (t) {
            this.reset(), this.g = !0;
            var n = t.c, i = t.b, r = t.a && "auth/web-storage-unsupported" == t.a.code,
              o = t.a && "auth/operation-not-supported-in-this-environment" == t.a.code;
            this.i = !(!r && !o), "unknown" != n || r || o ? t.a ? (ic(this, !0, null, t.a), zt()) : e.xa(n, i) ? function (e, t, n) {
              n = n.xa(t.c, t.b);
              var i = t.g, r = t.f, o = t.h, a = !!t.c.match(/Redirect$/);
              n(i, r, o).then(function (t) {
                ic(e, a, t, null)
              }).s(function (t) {
                ic(e, a, null, t)
              })
            }(this, t, e) : Yt(new zi("invalid-auth-event")) : (ic(this, !1, null, null), zt())
          } else Yt(new zi("invalid-auth-event"))
        }, tc.prototype.Za = function () {
          this.g && !this.i && ic(this, !1, null, null)
        }, tc.prototype.fa = function () {
          var n = this;
          return new qt(function (t, e) {
            n.b ? n.b().then(t, e) : (n.f.push(t), n.c.push(e), function (t) {
              var e = new zi("timeout");
              t.a && t.a.cancel(), t.a = un(zu.get()).then(function () {
                t.b || (t.g = !0, ic(t, !0, null, e))
              })
            }(n))
          })
        }, rc.prototype.h = function (t, e) {
          if (t) {
            var n = t.c, i = t.b;
            t.a ? (e.ha(t.c, null, t.a, t.b), zt()) : e.xa(n, i) ? function (t, e) {
              var n = t.b, i = t.c;
              e.xa(i, n)(t.g, t.f, t.h).then(function (t) {
                e.ha(i, t, null, n)
              }).s(function (t) {
                e.ha(i, null, t, n)
              })
            }(t, e) : Yt(new zi("invalid-auth-event"))
          } else Yt(new zi("invalid-auth-event"))
        }, ac.prototype.confirm = function (t) {
          return t = uo(this.verificationId, t), this.a(t)
        }, cc.prototype.start = function () {
          this.a = this.c, function e(n, t) {
            n.stop();
            n.b = un(hc(n, t)).then(function () {
              return e = h.document, n = null, _i() || !e ? zt() : new qt(function (t) {
                n = function () {
                  _i() && (e.removeEventListener("visibilitychange", n, !1), t())
                }, e.addEventListener("visibilitychange", n, !1)
              }).s(function (t) {
                throw e.removeEventListener("visibilitychange", n, !1), t
              });
              var e, n
            }).then(function () {
              return n.h()
            }).then(function () {
              e(n, !0)
            }).s(function (t) {
              n.i(t) && e(n, !1)
            })
          }(this, !0)
        }, cc.prototype.stop = function () {
          this.b && (this.b.cancel(), this.b = null)
        }, fc.prototype.w = function () {
          return {apiKey: this.f.b, refreshToken: this.a, accessToken: this.b, expirationTime: this.c}
        }, fc.prototype.getToken = function (t) {
          return t = !!t, this.b && !this.a ? Yt(new zi("user-token-expired")) : t || !this.b || k() > this.c - 3e4 ? this.a ? pc(this, {
            grant_type: "refresh_token",
            refresh_token: this.a
          }) : zt(null) : zt({accessToken: this.b, expirationTime: this.c, refreshToken: this.a})
        }, vc.prototype.w = function () {
          return {lastLoginAt: this.b, createdAt: this.a}
        }, E(gc, Re), E(bc, nn), bc.prototype.pa = function (t) {
          this.ka = t, _a(this.c, t)
        }, bc.prototype.ea = function () {
          return this.ka
        }, bc.prototype.ya = function () {
          return H(this.O)
        }, bc.prototype.Ha = function () {
          this.A.b && (this.A.stop(), this.A.start())
        }, Mi(bc.prototype, "providerId", "firebase"), (t = bc.prototype).reload = function () {
          var t = this;
          return Bc(this, Pc(this).then(function () {
            return Mc(t).then(function () {
              return Ac(t)
            }).then(_c)
          }))
        }, t.ac = function (t) {
          return this.F(t).then(function (t) {
            return new uc(t)
          })
        }, t.F = function (t) {
          var e = this;
          return Bc(this, Pc(this).then(function () {
            return e.h.getToken(t)
          }).then(function (t) {
            if (!t) throw new zi("internal-error");
            return t.accessToken != e.ra && (Sc(e, t.accessToken), e.dispatchEvent(new gc("tokenChanged"))), Lc(e, "refreshToken", t.refreshToken), t.accessToken
          }))
        }, t.wc = function (t) {
          if (!(t = t.users) || !t.length) throw new zi("internal-error");
          Oc(this, {
            uid: (t = t[0]).localId,
            displayName: t.displayName,
            photoURL: t.photoUrl,
            email: t.email,
            emailVerified: !!t.emailVerified,
            phoneNumber: t.phoneNumber,
            lastLoginAt: t.lastLoginAt,
            createdAt: t.createdAt
          });
          for (var e = function (t) {
            return (t = t.providerUserInfo) && t.length ? j(t, function (t) {
              return new mc(t.rawId, t.providerId, t.email, t.displayName, t.photoUrl, t.phoneNumber)
            }) : []
          }(t), n = 0; n < e.length; n++) Rc(this, e[n]);
          Lc(this, "isAnonymous", !(this.email && t.passwordHash || this.providerData && this.providerData.length))
        }, t.xc = function (t) {
          return Li("firebase.User.prototype.reauthenticateAndRetrieveDataWithCredential is deprecated. Please use firebase.User.prototype.reauthenticateWithCredential instead."), this.hb(t)
        }, t.hb = function (t) {
          var e = this, n = null;
          return Bc(this, t.f(this.c, this.uid).then(function (t) {
            return jc(e, t), n = Vc(e, t, "reauthenticate"), e.i = null, e.reload()
          }).then(function () {
            return n
          }), !0)
        }, t.oc = function (t) {
          return Li("firebase.User.prototype.linkAndRetrieveDataWithCredential is deprecated. Please use firebase.User.prototype.linkWithCredential instead."), this.fb(t)
        }, t.fb = function (e) {
          var n = this, i = null;
          return Bc(this, Uc(this, e.providerId).then(function () {
            return n.F()
          }).then(function (t) {
            return e.b(n.c, t)
          }).then(function (t) {
            return i = Vc(n, t, "link"), Kc(n, t)
          }).then(function () {
            return i
          }))
        }, t.pc = function (t, e) {
          var n = this;
          return Bc(this, Uc(this, "phone").then(function () {
            return sc(Tc(n), t, e, I(n.fb, n))
          }))
        }, t.yc = function (t, e) {
          var n = this;
          return Bc(this, zt().then(function () {
            return sc(Tc(n), t, e, I(n.hb, n))
          }), !0)
        }, t.rb = function (e) {
          var n = this;
          return Bc(this, this.F().then(function (t) {
            return n.c.rb(t, e)
          }).then(function (t) {
            return jc(n, t), n.reload()
          }))
        }, t.Pc = function (e) {
          var n = this;
          return Bc(this, this.F().then(function (t) {
            return e.b(n.c, t)
          }).then(function (t) {
            return jc(n, t), n.reload()
          }))
        }, t.sb = function (e) {
          var n = this;
          return Bc(this, this.F().then(function (t) {
            return n.c.sb(t, e)
          }).then(function (t) {
            return jc(n, t), n.reload()
          }))
        }, t.tb = function (e) {
          if (void 0 === e.displayName && void 0 === e.photoURL) return Pc(this);
          var n = this;
          return Bc(this, this.F().then(function (t) {
            return n.c.tb(t, {displayName: e.displayName, photoUrl: e.photoURL})
          }).then(function (t) {
            return jc(n, t), Lc(n, "displayName", t.displayName || null), Lc(n, "photoURL", t.photoUrl || null), M(n.providerData, function (t) {
              "password" === t.providerId && (Mi(t, "displayName", n.displayName), Mi(t, "photoURL", n.photoURL))
            }), Ac(n)
          }).then(_c))
        }, t.Nc = function (e) {
          var n = this;
          return Bc(this, Mc(this).then(function (t) {
            return V(Cc(n), e) ? function (t, e, n) {
              return ys(t, $a, {idToken: e, deleteProvider: n})
            }(n.c, t, [e]).then(function (t) {
              var e = {};
              return M(t.providerUserInfo || [], function (t) {
                e[t.providerId] = !0
              }), M(Cc(n), function (t) {
                e[t] || Dc(n, t)
              }), e[so.PROVIDER_ID] || Mi(n, "phoneNumber", null), Ac(n)
            }) : Ac(n).then(function () {
              throw new zi("no-such-provider")
            })
          }))
        }, t.delete = function () {
          var e = this;
          return Bc(this, this.F().then(function (t) {
            return ys(e.c, Ya, {idToken: t})
          }).then(function () {
            e.dispatchEvent(new gc("userDeleted"))
          })).then(function () {
            for (var t = 0; t < e.G.length; t++) e.G[t].cancel("app-deleted");
            yc(e, null), Ic(e, null), e.G = [], e.D = !0, Ec(e), Mi(e, "refreshToken", null), e.a && e.a.unsubscribe(e)
          })
        }, t.xb = function (t, e) {
          return !!("linkViaPopup" == t && (this.g || null) == e && this.f || "reauthViaPopup" == t && (this.g || null) == e && this.f || "linkViaRedirect" == t && (this.aa || null) == e || "reauthViaRedirect" == t && (this.aa || null) == e)
        }, t.ha = function (t, e, n, i) {
          "linkViaPopup" != t && "reauthViaPopup" != t || i != (this.g || null) || (n && this.v ? this.v(n) : e && !n && this.f && this.f(e), this.b && (this.b.cancel(), this.b = null), delete this.f, delete this.v)
        }, t.xa = function (t, e) {
          return "linkViaPopup" == t && e == (this.g || null) ? I(this.Bb, this) : "reauthViaPopup" == t && e == (this.g || null) ? I(this.Cb, this) : "linkViaRedirect" == t && (this.aa || null) == e ? I(this.Bb, this) : "reauthViaRedirect" == t && (this.aa || null) == e ? I(this.Cb, this) : null
        }, t.qc = function (t) {
          var e = this;
          return Fc(this, "linkViaPopup", t, function () {
            return Uc(e, t.providerId).then(function () {
              return Ac(e)
            })
          }, !1)
        }, t.zc = function (t) {
          return Fc(this, "reauthViaPopup", t, function () {
            return zt()
          }, !0)
        }, t.rc = function (t) {
          var e = this;
          return qc(this, "linkViaRedirect", t, function () {
            return Uc(e, t.providerId)
          }, !1)
        }, t.Ac = function (t) {
          return qc(this, "reauthViaRedirect", t, function () {
            return zt()
          }, !0)
        }, t.Bb = function (e, n, i) {
          var r = this;
          this.b && (this.b.cancel(), this.b = null);
          var o = null, t = this.F().then(function (t) {
            return Ha(r.c, {requestUri: e, postBody: i, sessionId: n, idToken: t})
          }).then(function (t) {
            return o = Vc(r, t, "link"), Kc(r, t)
          }).then(function () {
            return o
          });
          return Bc(this, t)
        }, t.Cb = function (t, e, n) {
          var i = this;
          this.b && (this.b.cancel(), this.b = null);
          var r = null;
          return Bc(this, zt().then(function () {
            return xr(Ba(i.c, {requestUri: t, sessionId: e, postBody: n}), i.uid)
          }).then(function (t) {
            return r = Vc(i, t, "reauthenticate"), jc(i, t), i.i = null, i.reload()
          }).then(function () {
            return r
          }), !0)
        }, t.kb = function (e) {
          var n = this, i = null;
          return Bc(this, this.F().then(function (t) {
            return i = t, void 0 === e || G(e) ? {} : cr(new Qi(e))
          }).then(function (t) {
            return n.c.kb(i, t)
          }).then(function (t) {
            if (n.email != t) return n.reload()
          }).then(function () {
          }))
        }, t.toJSON = function () {
          return this.w()
        }, t.w = function () {
          var e = {
            uid: this.uid,
            displayName: this.displayName,
            photoURL: this.photoURL,
            email: this.email,
            emailVerified: this.emailVerified,
            phoneNumber: this.phoneNumber,
            isAnonymous: this.isAnonymous,
            providerData: [],
            apiKey: this.l,
            appName: this.o,
            authDomain: this.u,
            stsTokenManager: this.h.w(),
            redirectEventId: this.aa || null
          };
          return this.metadata && J(e, this.metadata.w()), M(this.providerData, function (t) {
            e.providerData.push(function (t) {
              var e, n = {};
              for (e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
              return n
            }(t))
          }), e
        };
        var Xc = {name: "redirectUser", B: "session"};

        function Jc(t) {
          return bu(t.b, Xc, t.a)
        }

        function zc(t) {
          this.a = t, this.b = vu(), this.c = null, this.f = function (e) {
            var n = Zc("local"), i = Zc("session"), r = Zc("none");
            return function (n, i, r) {
              var o = gu(i, r), a = mu(n, i.B);
              return n.get(i, r).then(function (t) {
                var e = null;
                try {
                  e = Ei(h.localStorage.getItem(o))
                } catch (t) {
                }
                if (e && !t) return h.localStorage.removeItem(o), n.set(i, e, r);
                e && t && "localStorage" != a.type && h.localStorage.removeItem(o)
              })
            }(e.b, n, e.a).then(function () {
              return e.b.get(i, e.a)
            }).then(function (t) {
              return t ? i : e.b.get(r, e.a).then(function (t) {
                return t ? r : e.b.get(n, e.a).then(function (t) {
                  return t ? n : e.b.get($c, e.a).then(function (t) {
                    return t ? Zc(t) : n
                  })
                })
              })
            }).then(function (t) {
              return e.c = t, Yc(e, t.B)
            }).s(function () {
              e.c || (e.c = n)
            })
          }(this), this.b.addListener(Zc("local"), this.a, I(this.g, this))
        }

        function Yc(t, e) {
          var n, i = [];
          for (n in du) du[n] !== e && i.push(bu(t.b, Zc(du[n]), t.a));
          return i.push(bu(t.b, $c, t.a)), function (s) {
            return new qt(function (n, e) {
              var i = s.length, r = [];
              if (i) for (var t = function (t, e) {
                i--, r[t] = e, 0 == i && n(r)
              }, o = function (t) {
                e(t)
              }, a = 0; a < s.length; a++) $t(s[a], T(t, a), o); else n(r)
            })
          }(i)
        }

        zc.prototype.g = function () {
          var e = this, n = Zc("local");
          nh(this, function () {
            return zt().then(function () {
              return e.c && "local" != e.c.B ? e.b.get(n, e.a) : null
            }).then(function (t) {
              if (t) return Yc(e, "local").then(function () {
                e.c = n
              })
            })
          })
        };
        var $c = {name: "persistence", B: "session"};

        function Zc(t) {
          return {name: "authUser", B: t}
        }

        function Qc(t, e) {
          return nh(t, function () {
            return t.b.set(t.c, e.w(), t.a)
          })
        }

        function th(t) {
          return nh(t, function () {
            return bu(t.b, t.c, t.a)
          })
        }

        function eh(t, e) {
          return nh(t, function () {
            return t.b.get(t.c, t.a).then(function (t) {
              return t && e && (t.authDomain = e), Gc(t || {})
            })
          })
        }

        function nh(t, e) {
          return t.f = t.f.then(e, e), t.f
        }

        function ih(t) {
          if (this.l = !1, Mi(this, "settings", new oc), Mi(this, "app", t), !hh(this).options || !hh(this).options.apiKey) throw new zi("invalid-api-key");
          t = $h.SDK_VERSION ? pi($h.SDK_VERSION) : null, this.c = new Ta(hh(this).options && hh(this).options.apiKey, br(mr), t), this.N = [], this.o = [], this.I = [], this.Rb = $h.INTERNAL.createSubscribe(I(this.kc, this)), this.O = void 0, this.Sb = $h.INTERNAL.createSubscribe(I(this.mc, this)), uh(this, null), this.h = new zc(hh(this).options.apiKey + ":" + hh(this).name), this.A = new Wc(hh(this).options.apiKey + ":" + hh(this).name), this.V = ph(this, function (n) {
            var t = hh(n).options.authDomain, e = function (e) {
              var t = function (t, e) {
                return t.b.get(Xc, t.a).then(function (t) {
                  return t && e && (t.authDomain = e), Gc(t || {})
                })
              }(e.A, hh(e).options.authDomain).then(function (t) {
                return (e.D = t) && (t.ba = e.A), Jc(e.A)
              });
              return ph(e, t)
            }(n).then(function () {
              return eh(n.h, t)
            }).then(function (e) {
              return e ? (e.ba = n.A, n.D && (n.D.aa || null) == (e.aa || null) ? e : e.reload().then(function () {
                return Qc(n.h, e).then(function () {
                  return e
                })
              }).s(function (t) {
                return "auth/network-request-failed" == t.code ? e : th(n.h)
              })) : null
            }).then(function (t) {
              uh(n, t || null)
            });
            return ph(n, e)
          }(this)), this.i = ph(this, function (e) {
            return e.V.then(function () {
              return e.fa()
            }).s(function () {
            }).then(function () {
              if (!e.l) return e.ka()
            }).s(function () {
            }).then(function () {
              if (!e.l) {
                e.X = !0;
                var t = e.h;
                t.b.addListener(Zc("local"), t.a, e.ka)
              }
            })
          }(this)), this.X = !1, this.ka = I(this.Kc, this), this.Ha = I(this.Z, this), this.ra = I(this.Zb, this), this.sa = I(this.ic, this), this.ta = I(this.jc, this), function (e) {
            var n = hh(e).options.authDomain, i = hh(e).options.apiKey;
            n && bi() && (e.Qb = e.V.then(function () {
              if (!e.l) {
                if (e.a = Qu(n, i, hh(e).name), e.a.subscribe(e), fh(e) && Nc(fh(e)), e.D) {
                  Nc(e.D);
                  var t = e.D;
                  t.pa(e.ea()), yc(t, e), wc(t = e.D, e.G), Ic(t, e), e.D = null
                }
                return e.a
              }
            }))
          }(this), this.INTERNAL = {}, this.INTERNAL.delete = I(this.delete, this), this.INTERNAL.logFramework = I(this.sc, this), this.u = 0, nn.call(this), function (t) {
            Object.defineProperty(t, "lc", {
              get: function () {
                return this.ea()
              }, set: function (t) {
                this.pa(t)
              }, enumerable: !1
            }), t.W = null
          }(this), this.G = []
        }

        function rh(t) {
          Re.call(this, "languageCodeChanged"), this.g = t
        }

        function oh(t) {
          Re.call(this, "frameworkChanged"), this.c = t
        }

        function ah(t) {
          return t.Qb || Yt(new zi("auth-domain-config-required"))
        }

        function sh(e, t) {
          var n = {};
          return n.apiKey = hh(e).options.apiKey, n.authDomain = hh(e).options.authDomain, n.appName = hh(e).name, e.V.then(function () {
            return function (t, e, n, i) {
              var r = new bc(t, e);
              return n && (r.ba = n), i && wc(r, i), r.reload().then(function () {
                return r
              })
            }(n, t, e.A, e.ya())
          }).then(function (t) {
            return fh(e) && t.uid == fh(e).uid ? xc(fh(e), t) : (uh(e, t), Nc(t)), e.Z(t)
          }).then(function () {
            dh(e)
          })
        }

        function uh(t, e) {
          fh(t) && (function (t, e) {
            F(t.N, function (t) {
              return t == e
            })
          }(fh(t), t.Ha), Xe(fh(t), "tokenChanged", t.ra), Xe(fh(t), "userDeleted", t.sa), Xe(fh(t), "userInvalidated", t.ta), Ec(fh(t))), e && (e.N.push(t.Ha), Be(e, "tokenChanged", t.ra), Be(e, "userDeleted", t.sa), Be(e, "userInvalidated", t.ta), 0 < t.u && kc(e)), Mi(t, "currentUser", e), e && (e.pa(t.ea()), yc(e, t), wc(e, t.G), Ic(e, t))
        }

        function ch(e, t) {
          var n = null, i = null;
          return ph(e, t.then(function (t) {
            return n = co(t), i = kr(t), sh(e, t)
          }).then(function () {
            return Ui({user: fh(e), credential: n, additionalUserInfo: i, operationType: "signIn"})
          }))
        }

        function hh(t) {
          return t.app
        }

        function fh(t) {
          return t.currentUser
        }

        function lh(t) {
          return fh(t) && fh(t)._lat || null
        }

        function dh(t) {
          if (t.X) {
            for (var e = 0; e < t.o.length; e++) t.o[e] && t.o[e](lh(t));
            if (t.O !== t.getUid() && t.I.length) for (t.O = t.getUid(), e = 0; e < t.I.length; e++) t.I[e] && t.I[e](lh(t))
          }
        }

        function ph(t, e) {
          return t.N.push(e), e.ia(function () {
            K(t.N, e)
          }), e
        }

        function vh() {
        }

        function mh() {
          this.a = {}, this.b = 1e12
        }

        zc.prototype.nb = function (e) {
          var n = null, i = this;
          return function (t) {
            var e = new zi("invalid-persistence-type"), n = new zi("unsupported-persistence-type");
            t:{
              for (i in du) if (du[i] == t) {
                var i = !0;
                break t
              }
              i = !1
            }
            if (!i || "string" != typeof t) throw e;
            switch (ui()) {
              case"ReactNative":
                if ("session" === t) throw n;
                break;
              case"Node":
                if ("none" !== t) throw n;
                break;
              default:
                if (!gi() && "none" !== t) throw n
            }
          }(e), nh(this, function () {
            return e != i.c.B ? i.b.get(i.c, i.a).then(function (t) {
              return n = t, Yc(i, e)
            }).then(function () {
              if (i.c = Zc(e), n) return i.b.set(i.c, n, i.a)
            }) : zt()
          })
        }, E(ih, nn), E(rh, Re), E(oh, Re), (t = ih.prototype).nb = function (t) {
          return t = this.h.nb(t), ph(this, t)
        }, t.pa = function (t) {
          this.W === t || this.l || (this.W = t, _a(this.c, this.W), this.dispatchEvent(new rh(this.ea())))
        }, t.ea = function () {
          return this.W
        }, t.Qc = function () {
          var t = h.navigator;
          this.pa(t && (t.languages && t.languages[0] || t.language || t.userLanguage) || null)
        }, t.sc = function (t) {
          this.G.push(t), Pa(this.c, $h.SDK_VERSION ? pi($h.SDK_VERSION, this.G) : null), this.dispatchEvent(new oh(this.G))
        }, t.ya = function () {
          return H(this.G)
        }, t.toJSON = function () {
          return {
            apiKey: hh(this).options.apiKey,
            authDomain: hh(this).options.authDomain,
            appName: hh(this).name,
            currentUser: fh(this) && fh(this).w()
          }
        }, t.xb = function (t, e) {
          switch (t) {
            case"unknown":
            case"signInViaRedirect":
              return !0;
            case"signInViaPopup":
              return this.g == e && !!this.f;
            default:
              return !1
          }
        }, t.ha = function (t, e, n, i) {
          "signInViaPopup" == t && this.g == i && (n && this.v ? this.v(n) : e && !n && this.f && this.f(e), this.b && (this.b.cancel(), this.b = null), delete this.f, delete this.v)
        }, t.xa = function (t, e) {
          return "signInViaRedirect" == t || "signInViaPopup" == t && this.g == e && this.f ? I(this.Yb, this) : null
        }, t.Yb = function (t, e, n) {
          var i = this;
          t = {requestUri: t, postBody: n, sessionId: e}, this.b && (this.b.cancel(), this.b = null);
          var r = null, o = null, a = qa(i.c, t).then(function (t) {
            return r = co(t), o = kr(t), t
          });
          return ph(this, t = i.V.then(function () {
            return a
          }).then(function (t) {
            return sh(i, t)
          }).then(function () {
            return Ui({user: fh(i), credential: r, additionalUserInfo: o, operationType: "signIn"})
          }))
        }, t.Ic = function (e) {
          if (!bi()) return Yt(new zi("operation-not-supported-in-this-environment"));
          var n = this, t = Tr(e.providerId), i = Si(), r = null;
          (!Ii() || ai()) && hh(this).options.authDomain && e.isOAuthProvider && (r = Ls(hh(this).options.authDomain, hh(this).options.apiKey, hh(this).name, "signInViaPopup", e, null, i, $h.SDK_VERSION || null));
          var o = ei(r, t && t.Ba, t && t.Aa);
          return ph(this, t = ah(this).then(function (t) {
            return Yu(t, o, "signInViaPopup", e, i, !!r)
          }).then(function () {
            return new qt(function (t, e) {
              n.ha("signInViaPopup", null, new zi("cancelled-popup-request"), n.g), n.f = t, n.v = e, n.g = i, n.b = n.a.Ea(n, "signInViaPopup", o, i)
            })
          }).then(function (t) {
            return o && ti(o), t ? Ui(t) : null
          }).s(function (t) {
            throw o && ti(o), t
          }))
        }, t.Jc = function (t) {
          if (!bi()) return Yt(new zi("operation-not-supported-in-this-environment"));
          var e = this;
          return ph(this, ah(this).then(function () {
            return function (t) {
              return nh(t, function () {
                return t.b.set($c, t.c.B, t.a)
              })
            }(e.h)
          }).then(function () {
            return e.a.Ca("signInViaRedirect", t)
          }))
        }, t.fa = function () {
          if (!bi()) return Yt(new zi("operation-not-supported-in-this-environment"));
          var t = this;
          return ph(this, ah(this).then(function () {
            return t.a.fa()
          }).then(function (t) {
            return t ? Ui(t) : null
          }))
        }, t.Oc = function (t) {
          if (!t) return Yt(new zi("null-user"));
          var e = this, n = {};
          n.apiKey = hh(this).options.apiKey, n.authDomain = hh(this).options.authDomain, n.appName = hh(this).name;
          var i = function (t, e, n, i) {
            e = e || {apiKey: t.l, authDomain: t.u, appName: t.o};
            var r = t.h, o = {};
            return o[Ea] = r.b, o.refreshToken = r.a, o.expiresIn = (r.c - k()) / 1e3, e = new bc(e, o), n && (e.ba = n), i && wc(e, i), xc(e, t), e
          }(t, n, e.A, e.ya());
          return ph(this, this.i.then(function () {
            if (hh(e).options.apiKey != t.l) return i.reload()
          }).then(function () {
            return fh(e) && t.uid == fh(e).uid ? (xc(fh(e), t), e.Z(t)) : (uh(e, i), Nc(i), e.Z(i))
          }).then(function () {
            dh(e)
          }))
        }, t.pb = function () {
          var t = this, e = this.i.then(function () {
            return fh(t) ? (uh(t, null), th(t.h).then(function () {
              dh(t)
            })) : zt()
          });
          return ph(this, e)
        }, t.Kc = function () {
          var i = this;
          return eh(this.h, hh(this).options.authDomain).then(function (t) {
            if (!i.l) {
              var e;
              if (e = fh(i) && t) {
                e = fh(i).uid;
                var n = t.uid;
                e = null != e && "" !== e && null != n && "" !== n && e == n
              }
              if (e) return xc(fh(i), t), fh(i).F();
              (fh(i) || t) && (uh(i, t), t && (Nc(t), t.ba = i.A), i.a && i.a.subscribe(i), dh(i))
            }
          })
        }, t.Z = function (t) {
          return Qc(this.h, t)
        }, t.Zb = function () {
          dh(this), this.Z(fh(this))
        }, t.ic = function () {
          this.pb()
        }, t.jc = function () {
          this.pb()
        }, t.kc = function (t) {
          var e = this;
          this.addAuthTokenListener(function () {
            t.next(fh(e))
          })
        }, t.mc = function (t) {
          var e = this;
          !function (t, e) {
            t.I.push(e), ph(t, t.i.then(function () {
              !t.l && V(t.I, e) && t.O !== t.getUid() && (t.O = t.getUid(), e(lh(t)))
            }))
          }(this, function () {
            t.next(fh(e))
          })
        }, t.uc = function (t, e, n) {
          var i = this;
          return this.X && Promise.resolve().then(function () {
            m(t) ? t(fh(i)) : m(t.next) && t.next(fh(i))
          }), this.Rb(t, e, n)
        }, t.tc = function (t, e, n) {
          var i = this;
          return this.X && Promise.resolve().then(function () {
            i.O = i.getUid(), m(t) ? t(fh(i)) : m(t.next) && t.next(fh(i))
          }), this.Sb(t, e, n)
        }, t.$b = function (t) {
          var e = this, n = this.i.then(function () {
            return fh(e) ? fh(e).F(t).then(function (t) {
              return {accessToken: t}
            }) : null
          });
          return ph(this, n)
        }, t.Ec = function (t) {
          var n = this;
          return this.i.then(function () {
            return ch(n, ys(n.c, ps, {token: t}))
          }).then(function (t) {
            var e = t.user;
            return Lc(e, "isAnonymous", !1), n.Z(e), t
          })
        }, t.Fc = function (t, e) {
          var n = this;
          return this.i.then(function () {
            return ch(n, ys(n.c, vs, {email: t, password: e}))
          })
        }, t.Ub = function (t, e) {
          var n = this;
          return this.i.then(function () {
            return ch(n, ys(n.c, Ja, {email: t, password: e}))
          })
        }, t.Ra = function (t) {
          var e = this;
          return this.i.then(function () {
            return ch(e, t.la(e.c))
          })
        }, t.Dc = function (t) {
          return Li("firebase.auth.Auth.prototype.signInAndRetrieveDataWithCredential is deprecated. Please use firebase.auth.Auth.prototype.signInWithCredential instead."), this.Ra(t)
        }, t.ob = function () {
          var n = this;
          return this.i.then(function () {
            var t = fh(n);
            return t && t.isAnonymous ? Ui({
              user: t,
              credential: null,
              additionalUserInfo: Ui({providerId: null, isNewUser: !1}),
              operationType: "signIn"
            }) : ch(n, n.c.ob()).then(function (t) {
              var e = t.user;
              return Lc(e, "isAnonymous", !0), n.Z(e), t
            })
          })
        }, t.getUid = function () {
          return fh(this) && fh(this).uid || null
        }, t.Tb = function (t) {
          this.addAuthTokenListener(t), this.u++, 0 < this.u && fh(this) && kc(fh(this))
        }, t.Bc = function (e) {
          var n = this;
          M(this.o, function (t) {
            t == e && n.u--
          }), this.u < 0 && (this.u = 0), 0 == this.u && fh(this) && Ec(fh(this)), this.removeAuthTokenListener(e)
        }, t.addAuthTokenListener = function (t) {
          var e = this;
          this.o.push(t), ph(this, this.i.then(function () {
            e.l || V(e.o, t) && t(lh(e))
          }))
        }, t.removeAuthTokenListener = function (e) {
          F(this.o, function (t) {
            return t == e
          })
        }, t.delete = function () {
          this.l = !0;
          for (var t = 0; t < this.N.length; t++) this.N[t].cancel("app-deleted");
          return this.N = [], this.h && (t = this.h).b.removeListener(Zc("local"), t.a, this.ka), this.a && (this.a.unsubscribe(this), this.a.Za()), Promise.resolve()
        }, t.Xb = function (t) {
          return ph(this, function (t, e) {
            return ys(t, za, {identifier: e, continueUri: yi() ? $n() : "http://localhost"}).then(function (t) {
              return t.signinMethods || []
            })
          }(this.c, t))
        }, t.nc = function (t) {
          return !!io(t)
        }, t.mb = function (e, n) {
          var i = this;
          return ph(this, zt().then(function () {
            var t = new Qi(n);
            if (!t.c) throw new zi("argument-error", nr + " must be true when sending sign in link to email");
            return cr(t)
          }).then(function (t) {
            return i.c.mb(e, t)
          }).then(function () {
          }))
        }, t.Rc = function (t) {
          return this.Ka(t).then(function (t) {
            return t.data.email
          })
        }, t.$a = function (t, e) {
          return ph(this, this.c.$a(t, e).then(function () {
          }))
        }, t.Ka = function (t) {
          return ph(this, this.c.Ka(t).then(function (t) {
            return new Ki(t)
          }))
        }, t.Xa = function (t) {
          return ph(this, this.c.Xa(t).then(function () {
          }))
        }, t.lb = function (e, t) {
          var n = this;
          return ph(this, zt().then(function () {
            return void 0 === t || G(t) ? {} : cr(new Qi(t))
          }).then(function (t) {
            return n.c.lb(e, t)
          }).then(function () {
          }))
        }, t.Hc = function (t, e) {
          return ph(this, sc(this, t, e, I(this.Ra, this)))
        }, t.Gc = function (e, n) {
          var i = this;
          return ph(this, zt().then(function () {
            var t = no(e, n || $n());
            return i.Ra(t)
          }))
        }, vh.prototype.render = function () {
        }, vh.prototype.reset = function () {
        }, vh.prototype.getResponse = function () {
        }, vh.prototype.execute = function () {
        };
        var gh = null;

        function bh(t, e) {
          return (e = yh(e)) && t.a[e] || null
        }

        function yh(t) {
          return (t = void 0 === t ? 1e12 : t) ? t.toString() : null
        }

        function wh(t, e) {
          this.g = !1, this.c = e, this.a = this.b = null, this.h = "invisible" !== this.c.size, this.f = Kn(t);
          var n = this;
          this.i = function () {
            n.execute()
          }, this.h ? this.execute() : Be(this.f, "click", this.i)
        }

        function Ih(t) {
          if (t.g) throw Error("reCAPTCHA mock was already deleted!")
        }

        function Th() {
        }

        mh.prototype.render = function (t, e) {
          return this.a[this.b.toString()] = new wh(t, e), this.b++
        }, mh.prototype.reset = function (t) {
          var e = bh(this, t);
          t = yh(t), e && t && (e.delete(), delete this.a[t])
        }, mh.prototype.getResponse = function (t) {
          return (t = bh(this, t)) ? t.getResponse() : null
        }, mh.prototype.execute = function (t) {
          (t = bh(this, t)) && t.execute()
        }, wh.prototype.getResponse = function () {
          return Ih(this), this.b
        }, wh.prototype.execute = function () {
          Ih(this);
          var n = this;
          this.a || (this.a = setTimeout(function () {
            n.b = function () {
              for (var t = 50, e = []; 0 < t;) e.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62 * Math.random()))), t--;
              return e.join("")
            }();
            var t = n.c.callback, e = n.c["expired-callback"];
            if (t) try {
              t(n.b)
            } catch (t) {
            }
            n.a = setTimeout(function () {
              if (n.a = null, n.b = null, e) try {
                e()
              } catch (t) {
              }
              n.h && n.execute()
            }, 6e4)
          }, 500))
        }, wh.prototype.delete = function () {
          Ih(this), this.g = !0, clearTimeout(this.a), this.a = null, Xe(this.f, "click", this.i)
        }, Th.prototype.g = function () {
          return zt(gh = gh || new mh)
        }, Th.prototype.c = function () {
        };
        var kh = null;

        function Eh() {
          this.b = h.grecaptcha ? 1 / 0 : 0, this.f = null, this.a = "__rcb" + Math.floor(1e6 * Math.random()).toString()
        }

        var Sh = new z(Z, "/api.js"),
          Ah = new Oi(3e4, 6e4);
        Eh.prototype.g = function (r) {
          var o = this;
          return new qt(function (t, e) {
            var i = setTimeout(function () {
              e(new zi("network-request-failed"))
            }, Ah.get());
            !h.grecaptcha || r !== o.f && !o.b ? (h[o.a] = function () {
              if (h.grecaptcha) {
                o.f = r;
                var n = h.grecaptcha.render;
                h.grecaptcha.render = function (t, e) {
                  return t = n(t, e), o.b++, t
                }, clearTimeout(i), t(h.grecaptcha)
              } else clearTimeout(i), e(new zi("internal-error"));
              delete h[o.a]
            }, zt(va(nt(Sh, {onload: o.a, hl: r || ""}))).s(function () {
              clearTimeout(i), e(new zi("internal-error", "Unable to load external reCAPTCHA dependencies!"))
            })) : (clearTimeout(i), t(h.grecaptcha))
          })
        }, Eh.prototype.c = function () {
          this.b--
        };
        var Nh = null;

        function Oh(t, e, n, i, r, o, a) {
          if (Mi(this, "type", "recaptcha"), this.c = this.f = null, this.D = !1, this.l = e, this.g = null, a = a ? kh = kh || new Th : Nh = Nh || new Eh, this.o = a, this.a = n || {
            theme: "light",
            type: "image"
          }, this.h = [], this.a[Ch]) throw new zi("argument-error", "sitekey should not be provided for reCAPTCHA as one is automatically provisioned for the current project.");
          if (this.i = "invisible" === this.a[Rh], !h.document) throw new zi("operation-not-supported-in-this-environment", "RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment with DOM support.");
          if (!Kn(e) || !this.i && Kn(e).hasChildNodes()) throw new zi("argument-error", "reCAPTCHA container is either not found or already contains inner elements!");
          this.u = new Ta(t, o || null, r || null), this.v = i || function () {
            return null
          };
          var s = this;
          this.m = [];
          var u = this.a[_h];
          this.a[_h] = function (t) {
            if (Dh(s, t), "function" == typeof u) u(t); else if ("string" == typeof u) {
              var e = mi(u, h);
              "function" == typeof e && e(t)
            }
          };
          var c = this.a[Ph];
          this.a[Ph] = function () {
            if (Dh(s, null), "function" == typeof c) c(); else if ("string" == typeof c) {
              var t = mi(c, h);
              "function" == typeof t && t()
            }
          }
        }

        var _h = "callback", Ph = "expired-callback", Ch = "sitekey", Rh = "size";

        function Dh(t, e) {
          for (var n = 0; n < t.m.length; n++) try {
            t.m[n](e)
          } catch (t) {
          }
        }

        function Lh(t, e) {
          return t.h.push(e), e.ia(function () {
            K(t.h, e)
          }), e
        }

        function xh(t) {
          if (t.D) throw new zi("internal-error", "RecaptchaVerifier instance has been destroyed.")
        }

        function Mh(t, e, n) {
          var i = !1;
          try {
            this.b = n || $h.app()
          } catch (t) {
            throw new zi("argument-error", "No firebase.app.App instance is currently initialized.")
          }
          if (!this.b.options || !this.b.options.apiKey) throw new zi("invalid-api-key");
          n = this.b.options.apiKey;
          var r = this, o = null;
          try {
            o = this.b.auth().ya()
          } catch (t) {
          }
          try {
            i = this.b.auth().settings.appVerificationDisabledForTesting
          } catch (t) {
          }
          o = $h.SDK_VERSION ? pi($h.SDK_VERSION, o) : null, Oh.call(this, n, t, e, function () {
            try {
              var e = r.b.auth().ea()
            } catch (t) {
              e = null
            }
            return e
          }, o, br(mr), i)
        }

        function jh(t, e, n, i) {
          t:{
            n = Array.prototype.slice.call(n);
            for (var r = 0, o = !1, a = 0; a < e.length; a++) if (e[a].optional) o = !0; else {
              if (o) throw new zi("internal-error", "Argument validator encountered a required argument after an optional argument.");
              r++
            }
            if (o = e.length, n.length < r || o < n.length) i = "Expected " + (r == o ? 1 == r ? "1 argument" : r + " arguments" : r + "-" + o + " arguments") + " but got " + n.length + "."; else {
              for (r = 0; r < n.length; r++) if (o = e[r].optional && void 0 === n[r], !e[r].M(n[r]) && !o) {
                if (e = e[r], r < 0 || r >= Uh.length) throw new zi("internal-error", "Argument validator received an unsupported number of arguments.");
                n = Uh[r], i = (i ? "" : n + " argument ") + (e.name ? '"' + e.name + '" ' : "") + "must be " + e.K + ".";
                break t
              }
              i = null
            }
          }
          if (i) throw new zi("argument-error", t + " failed: " + i)
        }

        (t = Oh.prototype).za = function () {
          var e = this;
          return this.f ? this.f : this.f = Lh(this, zt().then(function () {
            if (yi() && !si()) return ri();
            throw new zi("operation-not-supported-in-this-environment", "RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment.")
          }).then(function () {
            return e.o.g(e.v())
          }).then(function (t) {
            return e.g = t, ys(e.u, os, {})
          }).then(function (t) {
            e.a[Ch] = t.recaptchaSiteKey
          }).s(function (t) {
            throw e.f = null, t
          }))
        }, t.render = function () {
          xh(this);
          var n = this;
          return Lh(this, this.za().then(function () {
            if (null === n.c) {
              var t = n.l;
              if (!n.i) {
                var e = Kn(t);
                t = Hn("DIV"), e.appendChild(t)
              }
              n.c = n.g.render(t, n.a)
            }
            return n.c
          }))
        }, t.verify = function () {
          xh(this);
          var r = this;
          return Lh(this, this.render().then(function (i) {
            return new qt(function (e) {
              var t = r.g.getResponse(i);
              if (t) e(t); else {
                var n = function (t) {
                  t && (function (t, e) {
                    F(t.m, function (t) {
                      return t == e
                    })
                  }(r, n), e(t))
                };
                r.m.push(n), r.i && r.g.execute(r.c)
              }
            })
          }))
        }, t.reset = function () {
          xh(this), null !== this.c && this.g.reset(this.c)
        }, t.clear = function () {
          xh(this), this.D = !0, this.o.c();
          for (var t = 0; t < this.h.length; t++) this.h[t].cancel("RecaptchaVerifier instance has been destroyed.");
          if (!this.i) {
            t = Kn(this.l);
            for (var e; e = t.firstChild;) t.removeChild(e)
          }
        }, E(Mh, Oh);
        var Uh = "First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" ");

        function Vh(t, e) {
          return {name: t || "", K: "a valid string", optional: !!e, M: f}
        }

        function Kh(t, e) {
          return {name: t || "", K: "a boolean", optional: !!e, M: n}
        }

        function Fh(t, e) {
          return {name: t || "", K: "a valid object", optional: !!e, M: g}
        }

        function qh(t, e) {
          return {name: t || "", K: "a function", optional: !!e, M: m}
        }

        function Hh(t, e) {
          return {name: t || "", K: "null", optional: !!e, M: r}
        }

        function Bh(n) {
          return {
            name: n ? n + "Credential" : "credential",
            K: n ? "a valid " + n + " credential" : "a valid credential",
            optional: !1,
            M: function (t) {
              if (!t) return !1;
              var e = !n || t.providerId === n;
              return !(!t.la || !e)
            }
          }
        }

        function Gh() {
          return {
            name: "applicationVerifier",
            K: "an implementation of firebase.auth.ApplicationVerifier",
            optional: !1,
            M: function (t) {
              return !!(t && f(t.type) && m(t.verify))
            }
          }
        }

        function Wh(e, n, t, i) {
          return {
            name: t || "", K: e.K + " or " + n.K, optional: !!i, M: function (t) {
              return e.M(t) || n.M(t)
            }
          }
        }

        function Xh(t, e) {
          for (var n in e) {
            var i = e[n].name;
            t[i] = Yh(i, t[n], e[n].j)
          }
        }

        function Jh(t, e) {
          for (var n in e) {
            var i = e[n].name;
            i !== n && Object.defineProperty(t, i, {
              get: T(function (t) {
                return this[t]
              }, n), set: T(function (t, e, n, i) {
                jh(t, [n], [i], !0), this[e] = i
              }, i, n, e[n].vb), enumerable: !0
            })
          }
        }

        function zh(t, e, n, i) {
          t[e] = Yh(e, n, i)
        }

        function Yh(t, e, n) {
          function i() {
            var t = Array.prototype.slice.call(arguments);
            return jh(o, n, t), e.apply(this, t)
          }

          if (!n) return e;
          var r, o = function (t) {
            return (t = t.split("."))[t.length - 1]
          }(t);
          for (r in e) i[r] = e[r];
          for (r in e.prototype) i.prototype[r] = e.prototype[r];
          return i
        }

        Xh(ih.prototype, {
          Xa: {name: "applyActionCode", j: [Vh("code")]},
          Ka: {name: "checkActionCode", j: [Vh("code")]},
          $a: {name: "confirmPasswordReset", j: [Vh("code"), Vh("newPassword")]},
          Ub: {name: "createUserWithEmailAndPassword", j: [Vh("email"), Vh("password")]},
          Xb: {name: "fetchSignInMethodsForEmail", j: [Vh("email")]},
          fa: {name: "getRedirectResult", j: []},
          nc: {name: "isSignInWithEmailLink", j: [Vh("emailLink")]},
          tc: {
            name: "onAuthStateChanged",
            j: [Wh(Fh(), qh(), "nextOrObserver"), qh("opt_error", !0), qh("opt_completed", !0)]
          },
          uc: {
            name: "onIdTokenChanged",
            j: [Wh(Fh(), qh(), "nextOrObserver"), qh("opt_error", !0), qh("opt_completed", !0)]
          },
          lb: {
            name: "sendPasswordResetEmail",
            j: [Vh("email"), Wh(Fh("opt_actionCodeSettings", !0), Hh(null, !0), "opt_actionCodeSettings", !0)]
          },
          mb: {name: "sendSignInLinkToEmail", j: [Vh("email"), Fh("actionCodeSettings")]},
          nb: {name: "setPersistence", j: [Vh("persistence")]},
          Dc: {name: "signInAndRetrieveDataWithCredential", j: [Bh()]},
          ob: {name: "signInAnonymously", j: []},
          Ra: {name: "signInWithCredential", j: [Bh()]},
          Ec: {name: "signInWithCustomToken", j: [Vh("token")]},
          Fc: {name: "signInWithEmailAndPassword", j: [Vh("email"), Vh("password")]},
          Gc: {name: "signInWithEmailLink", j: [Vh("email"), Vh("emailLink", !0)]},
          Hc: {name: "signInWithPhoneNumber", j: [Vh("phoneNumber"), Gh()]},
          Ic: {
            name: "signInWithPopup",
            j: [{
              name: "authProvider", K: "a valid Auth provider", optional: !1, M: function (t) {
                return !!(t && t.providerId && t.hasOwnProperty && t.hasOwnProperty("isOAuthProvider"))
              }
            }]
          },
          Jc: {
            name: "signInWithRedirect",
            j: [{
              name: "authProvider", K: "a valid Auth provider", optional: !1, M: function (t) {
                return !!(t && t.providerId && t.hasOwnProperty && t.hasOwnProperty("isOAuthProvider"))
              }
            }]
          },
          Oc: {
            name: "updateCurrentUser",
            j: [Wh({
              name: "user", K: "an instance of Firebase User", optional: !1, M: function (t) {
                return !!(t && t instanceof bc)
              }
            }, Hh(), "user")]
          },
          pb: {name: "signOut", j: []},
          toJSON: {name: "toJSON", j: [Vh(null, !0)]},
          Qc: {name: "useDeviceLanguage", j: []},
          Rc: {name: "verifyPasswordResetCode", j: [Vh("code")]}
        }), Jh(ih.prototype, {
          lc: {
            name: "languageCode",
            vb: Wh(Vh(), Hh(), "languageCode")
          }
        }), (ih.Persistence = du).LOCAL = "local", ih.Persistence.SESSION = "session", ih.Persistence.NONE = "none", Xh(bc.prototype, {
          delete: {name: "delete", j: []},
          ac: {name: "getIdTokenResult", j: [Kh("opt_forceRefresh", !0)]},
          F: {name: "getIdToken", j: [Kh("opt_forceRefresh", !0)]},
          oc: {name: "linkAndRetrieveDataWithCredential", j: [Bh()]},
          fb: {name: "linkWithCredential", j: [Bh()]},
          pc: {name: "linkWithPhoneNumber", j: [Vh("phoneNumber"), Gh()]},
          qc: {
            name: "linkWithPopup",
            j: [{
              name: "authProvider", K: "a valid Auth provider", optional: !1, M: function (t) {
                return !!(t && t.providerId && t.hasOwnProperty && t.hasOwnProperty("isOAuthProvider"))
              }
            }]
          },
          rc: {
            name: "linkWithRedirect",
            j: [{
              name: "authProvider", K: "a valid Auth provider", optional: !1, M: function (t) {
                return !!(t && t.providerId && t.hasOwnProperty && t.hasOwnProperty("isOAuthProvider"))
              }
            }]
          },
          xc: {name: "reauthenticateAndRetrieveDataWithCredential", j: [Bh()]},
          hb: {name: "reauthenticateWithCredential", j: [Bh()]},
          yc: {name: "reauthenticateWithPhoneNumber", j: [Vh("phoneNumber"), Gh()]},
          zc: {
            name: "reauthenticateWithPopup",
            j: [{
              name: "authProvider", K: "a valid Auth provider", optional: !1, M: function (t) {
                return !!(t && t.providerId && t.hasOwnProperty && t.hasOwnProperty("isOAuthProvider"))
              }
            }]
          },
          Ac: {
            name: "reauthenticateWithRedirect",
            j: [{
              name: "authProvider", K: "a valid Auth provider", optional: !1, M: function (t) {
                return !!(t && t.providerId && t.hasOwnProperty && t.hasOwnProperty("isOAuthProvider"))
              }
            }]
          },
          reload: {name: "reload", j: []},
          kb: {
            name: "sendEmailVerification",
            j: [Wh(Fh("opt_actionCodeSettings", !0), Hh(null, !0), "opt_actionCodeSettings", !0)]
          },
          toJSON: {name: "toJSON", j: [Vh(null, !0)]},
          Nc: {name: "unlink", j: [Vh("provider")]},
          rb: {name: "updateEmail", j: [Vh("email")]},
          sb: {name: "updatePassword", j: [Vh("password")]},
          Pc: {name: "updatePhoneNumber", j: [Bh("phone")]},
          tb: {name: "updateProfile", j: [Fh("profile")]}
        }), Xh(mh.prototype, {
          execute: {name: "execute"},
          render: {name: "render"},
          reset: {name: "reset"},
          getResponse: {name: "getResponse"}
        }), Xh(vh.prototype, {
          execute: {name: "execute"},
          render: {name: "render"},
          reset: {name: "reset"},
          getResponse: {name: "getResponse"}
        }), Xh(qt.prototype, {
          ia: {name: "finally"},
          s: {name: "catch"},
          then: {name: "then"}
        }), Jh(oc.prototype, {
          appVerificationDisabled: {
            name: "appVerificationDisabledForTesting",
            vb: Kh("appVerificationDisabledForTesting")
          }
        }), Xh(ac.prototype, {
          confirm: {
            name: "confirm",
            j: [Vh("verificationCode")]
          }
        }), zh(Lr, "fromJSON", function (t) {
          t = f(t) ? JSON.parse(t) : t;
          for (var e, n = [Fr, to, oo, Ur], i = 0; i < n.length; i++) if (e = n[i](t)) return e;
          return null
        }, [Wh(Vh(), Fh(), "json")]), zh(eo, "credential", function (t, e) {
          return new Qr(t, e)
        }, [Vh("email"), Vh("password")]), Xh(Qr.prototype, {
          w: {
            name: "toJSON",
            j: [Vh(null, !0)]
          }
        }), Xh(Gr.prototype, {
          ua: {name: "addScope", j: [Vh("scope")]},
          Da: {name: "setCustomParameters", j: [Fh("customOAuthParameters")]}
        }), zh(Gr, "credential", Wr, [Wh(Vh(), Fh(), "token")]), zh(eo, "credentialWithLink", no, [Vh("email"), Vh("emailLink")]), Xh(Xr.prototype, {
          ua: {
            name: "addScope",
            j: [Vh("scope")]
          }, Da: {name: "setCustomParameters", j: [Fh("customOAuthParameters")]}
        }), zh(Xr, "credential", Jr, [Wh(Vh(), Fh(), "token")]), Xh(zr.prototype, {
          ua: {
            name: "addScope",
            j: [Vh("scope")]
          }, Da: {name: "setCustomParameters", j: [Fh("customOAuthParameters")]}
        }), zh(zr, "credential", Yr, [Wh(Vh(), Wh(Fh(), Hh()), "idToken"), Wh(Vh(), Hh(), "accessToken", !0)]), Xh($r.prototype, {
          Da: {
            name: "setCustomParameters",
            j: [Fh("customOAuthParameters")]
          }
        }), zh($r, "credential", Zr, [Wh(Vh(), Fh(), "token"), Vh("secret", !0)]), Xh(Br.prototype, {
          ua: {
            name: "addScope",
            j: [Vh("scope")]
          },
          credential: {
            name: "credential",
            j: [Wh(Vh(), Wh(Fh(), Hh()), "optionsOrIdToken"), Wh(Vh(), Hh(), "accessToken", !0)]
          },
          Da: {name: "setCustomParameters", j: [Fh("customOAuthParameters")]}
        }), Xh(Vr.prototype, {w: {name: "toJSON", j: [Vh(null, !0)]}}), Xh(Mr.prototype, {
          w: {
            name: "toJSON",
            j: [Vh(null, !0)]
          }
        }), zh(so, "credential", uo, [Vh("verificationId"), Vh("verificationCode")]), Xh(so.prototype, {
          Va: {
            name: "verifyPhoneNumber",
            j: [Vh("phoneNumber"), Gh()]
          }
        }), Xh(ro.prototype, {w: {name: "toJSON", j: [Vh(null, !0)]}}), Xh(zi.prototype, {
          toJSON: {
            name: "toJSON",
            j: [Vh(null, !0)]
          }
        }), Xh(bo.prototype, {toJSON: {name: "toJSON", j: [Vh(null, !0)]}}), Xh(go.prototype, {
          toJSON: {
            name: "toJSON",
            j: [Vh(null, !0)]
          }
        }), Xh(Mh.prototype, {
          clear: {name: "clear", j: []},
          render: {name: "render", j: []},
          verify: {name: "verify", j: []}
        }), function () {
          if (void 0 === $h || !$h.INTERNAL || !$h.INTERNAL.registerService) throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");
          var t = {Auth: ih, AuthCredential: Lr, Error: zi};
          zh(t, "EmailAuthProvider", eo, []), zh(t, "FacebookAuthProvider", Gr, []), zh(t, "GithubAuthProvider", Xr, []), zh(t, "GoogleAuthProvider", zr, []), zh(t, "TwitterAuthProvider", $r, []), zh(t, "OAuthProvider", Br, [Vh("providerId")]), zh(t, "SAMLAuthProvider", Hr, [Vh("providerId")]), zh(t, "PhoneAuthProvider", so, [{
            name: "auth",
            K: "an instance of Firebase Auth",
            optional: !0,
            M: function (t) {
              return !!(t && t instanceof ih)
            }
          }]), zh(t, "RecaptchaVerifier", Mh, [Wh(Vh(), {
            name: "", K: "an HTML element", optional: !1, M: function (t) {
              return !!(t && t instanceof Element)
            }
          }, "recaptchaContainer"), Fh("recaptchaParameters", !0), {
            name: "app",
            K: "an instance of Firebase App",
            optional: !0,
            M: function (t) {
              return !!(t && t instanceof $h.app.App)
            }
          }]), $h.INTERNAL.registerService("auth", function (t, e) {
            return e({
              INTERNAL: {
                getUid: I((t = new ih(t)).getUid, t),
                getToken: I(t.$b, t),
                addAuthTokenListener: I(t.Tb, t),
                removeAuthTokenListener: I(t.Bc, t)
              }
            }), t
          }, t, function (t, e) {
            if ("create" === t) try {
              e.auth()
            } catch (t) {
            }
          }), $h.INTERNAL.extendNamespace({User: bc})
        }()
      }.apply("undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }).apply(this, arguments)
  } catch (t) {
    throw console.error(t), new Error("Cannot instantiate firebase-auth - be sure to load firebase-app.js first.")
  }
});
//# sourceMappingURL=firebase-auth.js.map
!function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(require("@firebase/app")) : "function" == typeof define && define.amd ? define(["@firebase/app"], e) : e((t = t || self).firebase)
}(this, function (Ld) {
  "use strict";
  try {
    (function () {
      var o, t;
      Ld = Ld && Ld.hasOwnProperty("default") ? Ld.default : Ld, (t = o = o || {})[t.DEBUG = 0] = "DEBUG", t[t.VERBOSE = 1] = "VERBOSE", t[t.INFO = 2] = "INFO", t[t.WARN = 3] = "WARN", t[t.ERROR = 4] = "ERROR", t[t.SILENT = 5] = "SILENT";

      function e(t, e) {
        for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
        if (!(e < t.logLevel)) {
          var i = (new Date).toISOString();
          switch (e) {
            case o.DEBUG:
            case o.VERBOSE:
              console.log.apply(console, ["[" + i + "]  " + t.name + ":"].concat(n));
              break;
            case o.INFO:
              console.info.apply(console, ["[" + i + "]  " + t.name + ":"].concat(n));
              break;
            case o.WARN:
              console.warn.apply(console, ["[" + i + "]  " + t.name + ":"].concat(n));
              break;
            case o.ERROR:
              console.error.apply(console, ["[" + i + "]  " + t.name + ":"].concat(n));
              break;
            default:
              throw new Error("Attempted to log a message with an invalid logType (value: " + e + ")")
          }
        }
      }

      var n = o.INFO, r = (Object.defineProperty(i.prototype, "logLevel", {
        get: function () {
          return this._logLevel
        }, set: function (t) {
          if (!(t in o)) throw new TypeError("Invalid value assigned to `logLevel`");
          this._logLevel = t
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(i.prototype, "logHandler", {
        get: function () {
          return this._logHandler
        }, set: function (t) {
          if ("function" != typeof t) throw new TypeError("Value assigned to `logHandler` must be a function");
          this._logHandler = t
        }, enumerable: !0, configurable: !0
      }), i.prototype.debug = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        this._logHandler.apply(this, [this, o.DEBUG].concat(t))
      }, i.prototype.log = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        this._logHandler.apply(this, [this, o.VERBOSE].concat(t))
      }, i.prototype.info = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        this._logHandler.apply(this, [this, o.INFO].concat(t))
      }, i.prototype.warn = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        this._logHandler.apply(this, [this, o.WARN].concat(t))
      }, i.prototype.error = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        this._logHandler.apply(this, [this, o.ERROR].concat(t))
      }, i);

      function i(t) {
        this.name = t, this._logLevel = n, this._logHandler = e
      }

      var a = function (t, e) {
        return (a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
          t.__proto__ = e
        } || function (t, e) {
          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
        })(t, e)
      };

      function s(t, e) {
        function n() {
          this.constructor = t
        }

        a(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
      }

      function p(o, a, s, u) {
        return new (s = s || Promise)(function (t, e) {
          function n(t) {
            try {
              i(u.next(t))
            } catch (t) {
              e(t)
            }
          }

          function r(t) {
            try {
              i(u.throw(t))
            } catch (t) {
              e(t)
            }
          }

          function i(e) {
            e.done ? t(e.value) : new s(function (t) {
              t(e.value)
            }).then(n, r)
          }

          i((u = u.apply(o, a || [])).next())
        })
      }

      function d(n, r) {
        var i, o, a, t, s = {
          label: 0, sent: function () {
            if (1 & a[0]) throw a[1];
            return a[1]
          }, trys: [], ops: []
        };
        return t = {
          next: e(0),
          throw: e(1),
          return: e(2)
        }, "function" == typeof Symbol && (t[Symbol.iterator] = function () {
          return this
        }), t;

        function e(e) {
          return function (t) {
            return function (e) {
              if (i) throw new TypeError("Generator is already executing.");
              for (; s;) try {
                if (i = 1, o && (a = 2 & e[0] ? o.return : e[0] ? o.throw || ((a = o.return) && a.call(o), 0) : o.next) && !(a = a.call(o, e[1])).done) return a;
                switch (o = 0, a && (e = [2 & e[0], a.value]), e[0]) {
                  case 0:
                  case 1:
                    a = e;
                    break;
                  case 4:
                    return s.label++, {value: e[1], done: !1};
                  case 5:
                    s.label++, o = e[1], e = [0];
                    continue;
                  case 7:
                    e = s.ops.pop(), s.trys.pop();
                    continue;
                  default:
                    if (!(a = 0 < (a = s.trys).length && a[a.length - 1]) && (6 === e[0] || 2 === e[0])) {
                      s = 0;
                      continue
                    }
                    if (3 === e[0] && (!a || e[1] > a[0] && e[1] < a[3])) {
                      s.label = e[1];
                      break
                    }
                    if (6 === e[0] && s.label < a[1]) {
                      s.label = a[1], a = e;
                      break
                    }
                    if (a && s.label < a[2]) {
                      s.label = a[2], s.ops.push(e);
                      break
                    }
                    a[2] && s.ops.pop(), s.trys.pop();
                    continue
                }
                e = r.call(n, s)
              } catch (t) {
                e = [6, t], o = 0
              } finally {
                i = a = 0
              }
              if (5 & e[0]) throw e[1];
              return {value: e[0] ? e[1] : void 0, done: !0}
            }([e, t])
          }
        }
      }

      function u() {
        return "undefined" != typeof navigator && "string" == typeof navigator.userAgent ? navigator.userAgent : ""
      }

      var c, f = (s(h, c = Error), h);

      function h(t, e) {
        var n = c.call(this, e) || this;
        return n.code = t, n.name = "FirebaseError", Object.setPrototypeOf(n, h.prototype), Error.captureStackTrace && Error.captureStackTrace(n, l.prototype.create), n
      }

      var l = (m.prototype.create = function (t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        for (var r = e[0] || {}, i = this.service + "/" + t, o = this.errors[t], a = o ? function (t, r) {
          return t.replace(g, function (t, e) {
            var n = r[e];
            return null != n ? n.toString() : "<" + e + "?>"
          })
        }(o, r) : "Error", s = this.serviceName + ": " + a + " (" + i + ").", u = new f(i, s), c = 0, h = Object.keys(r); c < h.length; c++) {
          var l = h[c];
          "_" !== l.slice(-1) && (l in u && console.warn('Overwriting FirebaseError base field "' + l + '" can cause unexpected behavior.'), u[l] = r[l])
        }
        return u
      }, m);

      function m(t, e, n) {
        this.service = t, this.serviceName = e, this.errors = n
      }

      var y, g = /\{\$([^}]+)}/g,
        v = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
        b = b || {}, w = v;

      function E(t) {
        return "string" == typeof t
      }

      function S(t) {
        return "number" == typeof t
      }

      function T(t, e) {
        t = t.split("."), e = e || w;
        for (var n = 0; n < t.length; n++) if (null == (e = e[t[n]])) return null;
        return e
      }

      function I() {
      }

      function C(t) {
        var e = typeof t;
        if ("object" == e) {
          if (!t) return "null";
          if (t instanceof Array) return "array";
          if (t instanceof Object) return e;
          var n = Object.prototype.toString.call(t);
          if ("[object Window]" == n) return "object";
          if ("[object Array]" == n || "number" == typeof t.length && void 0 !== t.splice && void 0 !== t.propertyIsEnumerable && !t.propertyIsEnumerable("splice")) return "array";
          if ("[object Function]" == n || void 0 !== t.call && void 0 !== t.propertyIsEnumerable && !t.propertyIsEnumerable("call")) return "function"
        } else if ("function" == e && void 0 === t.call) return "object";
        return e
      }

      function D(t) {
        return "array" == C(t)
      }

      function N(t) {
        var e = C(t);
        return "array" == e || "object" == e && "number" == typeof t.length
      }

      function A(t) {
        var e = typeof t;
        return "object" == e && null != t || "function" == e
      }

      var k = "closure_uid_" + (1e9 * Math.random() >>> 0), R = 0;

      function M(t, e, n) {
        return t.call.apply(t.bind, arguments)
      }

      function _(e, n, t) {
        if (!e) throw Error();
        if (2 < arguments.length) {
          var r = Array.prototype.slice.call(arguments, 2);
          return function () {
            var t = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(t, r), e.apply(n, t)
          }
        }
        return function () {
          return e.apply(n, arguments)
        }
      }

      function O(t, e, n) {
        return (O = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? M : _).apply(null, arguments)
      }

      function L(e, t) {
        var n = Array.prototype.slice.call(arguments, 1);
        return function () {
          var t = n.slice();
          return t.push.apply(t, arguments), e.apply(this, t)
        }
      }

      var P = Date.now || function () {
        return +new Date
      };

      function x(t, o) {
        function e() {
        }

        e.prototype = o.prototype, t.N = o.prototype, t.prototype = new e, (t.prototype.constructor = t).yb = function (t, e, n) {
          for (var r = Array(arguments.length - 2), i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
          return o.prototype[e].apply(t, r)
        }
      }

      function q() {
        this.j = this.j, this.i = this.i
      }

      q.prototype.j = !1, q.prototype.la = function () {
        if (!this.j && (this.j = !0, this.G(), 0)) this[k] || (this[k] = ++R)
      }, q.prototype.G = function () {
        if (this.i) for (; this.i.length;) this.i.shift()()
      };
      var F = Array.prototype.indexOf ? function (t, e) {
        return Array.prototype.indexOf.call(t, e, void 0)
      } : function (t, e) {
        if (E(t)) return E(e) && 1 == e.length ? t.indexOf(e, 0) : -1;
        for (var n = 0; n < t.length; n++) if (n in t && t[n] === e) return n;
        return -1
      }, V = Array.prototype.forEach ? function (t, e, n) {
        Array.prototype.forEach.call(t, e, n)
      } : function (t, e, n) {
        for (var r = t.length, i = E(t) ? t.split("") : t, o = 0; o < r; o++) o in i && e.call(n, i[o], o, t)
      };

      function B(t) {
        return Array.prototype.concat.apply([], arguments)
      }

      function U(t) {
        var e = t.length;
        if (0 < e) {
          for (var n = Array(e), r = 0; r < e; r++) n[r] = t[r];
          return n
        }
        return []
      }

      function Q(t) {
        return /^[\s\xa0]*$/.test(t)
      }

      var K, G = String.prototype.trim ? function (t) {
        return t.trim()
      } : function (t) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]
      };

      function j(t, e) {
        return -1 != t.indexOf(e)
      }

      function W(t, e) {
        return t < e ? -1 : e < t ? 1 : 0
      }

      t:{
        var z = w.navigator;
        if (z) {
          var H = z.userAgent;
          if (H) {
            K = H;
            break t
          }
        }
        K = ""
      }

      function Y(t, e, n) {
        for (var r in t) e.call(n, t[r], r, t)
      }

      function X(t) {
        var e, n = {};
        for (e in t) n[e] = t[e];
        return n
      }

      var J = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

      function $(t, e) {
        for (var n, r, i = 1; i < arguments.length; i++) {
          for (n in r = arguments[i]) t[n] = r[n];
          for (var o = 0; o < J.length; o++) n = J[o], Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
        }
      }

      function Z(t) {
        return Z[" "](t), t
      }

      Z[" "] = I;
      var tt, et, nt = j(K, "Opera"), rt = j(K, "Trident") || j(K, "MSIE"), it = j(K, "Edge"), ot = it || rt,
        at = j(K, "Gecko") && !(j(K.toLowerCase(), "webkit") && !j(K, "Edge")) && !(j(K, "Trident") || j(K, "MSIE")) && !j(K, "Edge"),
        st = j(K.toLowerCase(), "webkit") && !j(K, "Edge");

      function ut() {
        var t = w.document;
        return t ? t.documentMode : void 0
      }

      t:{
        var ct = "",
          ht = (et = K, at ? /rv:([^\);]+)(\)|;)/.exec(et) : it ? /Edge\/([\d\.]+)/.exec(et) : rt ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(et) : st ? /WebKit\/(\S+)/.exec(et) : nt ? /(?:Version)[ \/]?(\S+)/.exec(et) : void 0);
        if (ht && (ct = ht ? ht[1] : ""), rt) {
          var lt = ut();
          if (null != lt && lt > parseFloat(ct)) {
            tt = String(lt);
            break t
          }
        }
        tt = ct
      }
      var ft, pt = {};

      function dt(s) {
        return function (t, e) {
          var n = pt;
          return Object.prototype.hasOwnProperty.call(n, t) ? n[t] : n[t] = e(t)
        }(s, function () {
          for (var t = 0, e = G(String(tt)).split("."), n = G(String(s)).split("."), r = Math.max(e.length, n.length), i = 0; 0 == t && i < r; i++) {
            var o = e[i] || "", a = n[i] || "";
            do {
              if (o = /(\d*)(\D*)(.*)/.exec(o) || ["", "", "", ""], a = /(\d*)(\D*)(.*)/.exec(a) || ["", "", "", ""], 0 == o[0].length && 0 == a[0].length) break;
              t = W(0 == o[1].length ? 0 : parseInt(o[1], 10), 0 == a[1].length ? 0 : parseInt(a[1], 10)) || W(0 == o[2].length, 0 == a[2].length) || W(o[2], a[2]), o = o[3], a = a[3]
            } while (0 == t)
          }
          return 0 <= t
        })
      }

      var mt = w.document;
      ft = mt && rt ? ut() || ("CSS1Compat" == mt.compatMode ? parseInt(tt, 10) : 5) : void 0;
      var yt = !rt || 9 <= Number(ft), gt = rt && !dt("9"), vt = function () {
        if (!w.addEventListener || !Object.defineProperty) return !1;
        var t = !1, e = Object.defineProperty({}, "passive", {
          get: function () {
            t = !0
          }
        });
        try {
          w.addEventListener("test", I, e), w.removeEventListener("test", I, e)
        } catch (t) {
        }
        return t
      }();

      function bt(t, e) {
        this.type = t, this.a = this.target = e, this.Ja = !0
      }

      function wt(t, e) {
        if (bt.call(this, t ? t.type : ""), this.relatedTarget = this.a = this.target = null, this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0, this.key = "", this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1, this.pointerId = 0, this.pointerType = "", this.c = null, t) {
          var n = this.type = t.type, r = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : null;
          if (this.target = t.target || t.srcElement, this.a = e, e = t.relatedTarget) {
            if (at) {
              t:{
                try {
                  Z(e.nodeName);
                  var i = !0;
                  break t
                } catch (t) {
                }
                i = !1
              }
              i || (e = null)
            }
          } else "mouseover" == n ? e = t.fromElement : "mouseout" == n && (e = t.toElement);
          this.relatedTarget = e, r ? (this.clientX = void 0 !== r.clientX ? r.clientX : r.pageX, this.clientY = void 0 !== r.clientY ? r.clientY : r.pageY, this.screenX = r.screenX || 0, this.screenY = r.screenY || 0) : (this.clientX = void 0 !== t.clientX ? t.clientX : t.pageX, this.clientY = void 0 !== t.clientY ? t.clientY : t.pageY, this.screenX = t.screenX || 0, this.screenY = t.screenY || 0), this.button = t.button, this.key = t.key || "", this.ctrlKey = t.ctrlKey, this.altKey = t.altKey, this.shiftKey = t.shiftKey, this.metaKey = t.metaKey, this.pointerId = t.pointerId || 0, this.pointerType = E(t.pointerType) ? t.pointerType : Et[t.pointerType] || "", (this.c = t).defaultPrevented && this.b()
        }
      }

      bt.prototype.b = function () {
        this.Ja = !1
      }, x(wt, bt);
      var Et = {2: "touch", 3: "pen", 4: "mouse"};
      wt.prototype.b = function () {
        wt.N.b.call(this);
        var t = this.c;
        if (t.preventDefault) t.preventDefault(); else if (t.returnValue = !1, gt) try {
          (t.ctrlKey || 112 <= t.keyCode && t.keyCode <= 123) && (t.keyCode = -1)
        } catch (t) {
        }
      };
      var St = "closure_listenable_" + (1e6 * Math.random() | 0), Tt = 0;

      function It(t, e, n, r, i) {
        this.listener = t, this.proxy = null, this.src = e, this.type = n, this.capture = !!r, this.da = i, this.key = ++Tt, this.X = this.Z = !1
      }

      function Ct(t) {
        t.X = !0, t.listener = null, t.proxy = null, t.src = null, t.da = null
      }

      function Dt(t) {
        this.src = t, this.a = {}, this.b = 0
      }

      function Nt(t, e) {
        var n = e.type;
        if (n in t.a) {
          var r, i = t.a[n], o = F(i, e);
          (r = 0 <= o) && Array.prototype.splice.call(i, o, 1), r && (Ct(e), 0 == t.a[n].length && (delete t.a[n], t.b--))
        }
      }

      function At(t, e, n, r) {
        for (var i = 0; i < t.length; ++i) {
          var o = t[i];
          if (!o.X && o.listener == e && o.capture == !!n && o.da == r) return i
        }
        return -1
      }

      Dt.prototype.add = function (t, e, n, r, i) {
        var o = t.toString();
        (t = this.a[o]) || (t = this.a[o] = [], this.b++);
        var a = At(t, e, r, i);
        return -1 < a ? (e = t[a], n || (e.Z = !1)) : ((e = new It(e, this.src, o, !!r, i)).Z = n, t.push(e)), e
      };
      var kt = "closure_lm_" + (1e6 * Math.random() | 0), Rt = {};

      function Mt(t, e, n, r, i) {
        if (r && r.once) return function t(e, n, r, i, o) {
          if (D(n)) {
            for (var a = 0; a < n.length; a++) t(e, n[a], r, i, o);
            return null
          }
          r = Vt(r);
          return e && e[St] ? e.Ba(n, r, A(i) ? !!i.capture : !!i, o) : _t(e, n, r, !0, i, o)
        }(t, e, n, r, i);
        if (D(e)) {
          for (var o = 0; o < e.length; o++) Mt(t, e[o], n, r, i);
          return null
        }
        return n = Vt(n), t && t[St] ? t.Aa(e, n, A(r) ? !!r.capture : !!r, i) : _t(t, e, n, !1, r, i)
      }

      function _t(t, e, n, r, i, o) {
        if (!e) throw Error("Invalid event type");
        var a = A(i) ? !!i.capture : !!i;
        if (a && !yt) return null;
        var s = qt(t);
        if (s || (t[kt] = s = new Dt(t)), (n = s.add(e, n, r, a, o)).proxy) return n;
        if (r = function () {
          var e = xt, n = yt ? function (t) {
            return e.call(n.src, n.listener, t)
          } : function (t) {
            if (!(t = e.call(n.src, n.listener, t))) return t
          };
          return n
        }(), (n.proxy = r).src = t, r.listener = n, t.addEventListener) vt || (i = a), void 0 === i && (i = !1), t.addEventListener(e.toString(), r, i); else if (t.attachEvent) t.attachEvent(Lt(e.toString()), r); else {
          if (!t.addListener || !t.removeListener) throw Error("addEventListener and attachEvent are unavailable.");
          t.addListener(r)
        }
        return n
      }

      function Ot(t) {
        if (!S(t) && t && !t.X) {
          var e = t.src;
          if (e && e[St]) Nt(e.c, t); else {
            var n = t.type, r = t.proxy;
            e.removeEventListener ? e.removeEventListener(n, r, t.capture) : e.detachEvent ? e.detachEvent(Lt(n), r) : e.addListener && e.removeListener && e.removeListener(r), (n = qt(e)) ? (Nt(n, t), 0 == n.b && (n.src = null, e[kt] = null)) : Ct(t)
          }
        }
      }

      function Lt(t) {
        return t in Rt ? Rt[t] : Rt[t] = "on" + t
      }

      function Pt(t, e) {
        var n = t.listener, r = t.da || t.src;
        return t.Z && Ot(t), n.call(r, e)
      }

      function xt(t, e) {
        return !!t.X || (yt ? Pt(t, new wt(e, this)) : Pt(t, e = new wt(e || T("window.event"), this)))
      }

      function qt(t) {
        return (t = t[kt]) instanceof Dt ? t : null
      }

      var Ft = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);

      function Vt(e) {
        return "function" == C(e) ? e : (e[Ft] || (e[Ft] = function (t) {
          return e.handleEvent(t)
        }), e[Ft])
      }

      function Bt() {
        q.call(this), this.c = new Dt(this), (this.J = this).B = null
      }

      function Ut(t, e, n, r) {
        if (!(e = t.c.a[String(e)])) return !0;
        e = e.concat();
        for (var i = !0, o = 0; o < e.length; ++o) {
          var a = e[o];
          if (a && !a.X && a.capture == n) {
            var s = a.listener, u = a.da || a.src;
            a.Z && Nt(t.c, a), i = !1 !== s.call(u, r) && i
          }
        }
        return i && 0 != r.Ja
      }

      x(Bt, q), Bt.prototype[St] = !0, (y = Bt.prototype).addEventListener = function (t, e, n, r) {
        Mt(this, t, e, n, r)
      }, y.removeEventListener = function (t, e, n, r) {
        !function t(e, n, r, i, o) {
          if (D(n)) for (var a = 0; a < n.length; a++) t(e, n[a], r, i, o); else i = A(i) ? !!i.capture : !!i, r = Vt(r), e && e[St] ? (e = e.c, (n = String(n).toString()) in e.a && -1 < (r = At(a = e.a[n], r, i, o)) && (Ct(a[r]), Array.prototype.splice.call(a, r, 1), 0 == a.length && (delete e.a[n], e.b--))) : (e = e && qt(e)) && (n = e.a[n.toString()], e = -1, n && (e = At(n, r, i, o)), (r = -1 < e ? n[e] : null) && Ot(r))
        }(this, t, e, n, r)
      }, y.dispatchEvent = function (t) {
        var e, n = this.B;
        if (n) for (e = []; n; n = n.B) e.push(n);
        n = this.J;
        var r = t.type || t;
        if (E(t)) t = new bt(t, n); else if (t instanceof bt) t.target = t.target || n; else {
          var i = t;
          $(t = new bt(r, n), i)
        }
        if (i = !0, e) for (var o = e.length - 1; 0 <= o; o--) {
          var a = t.a = e[o];
          i = Ut(a, r, !0, t) && i
        }
        if (i = Ut(a = t.a = n, r, !0, t) && i, i = Ut(a, r, !1, t) && i, e) for (o = 0; o < e.length; o++) i = Ut(a = t.a = e[o], r, !1, t) && i;
        return i
      }, y.G = function () {
        if (Bt.N.G.call(this), this.c) {
          var t, e = this.c;
          for (t in e.a) {
            for (var n = e.a[t], r = 0; r < n.length; r++) Ct(n[r]);
            delete e.a[t], e.b--
          }
        }
        this.B = null
      }, y.Aa = function (t, e, n, r) {
        return this.c.add(String(t), e, !1, n, r)
      }, y.Ba = function (t, e, n, r) {
        return this.c.add(String(t), e, !0, n, r)
      };
      var Qt = w.JSON.stringify;

      function Kt(t, e) {
        this.c = t, this.f = e, this.b = 0, this.a = null
      }

      function Gt() {
        this.b = this.a = null
      }

      Kt.prototype.get = function () {
        if (0 < this.b) {
          this.b--;
          var t = this.a;
          this.a = t.next, t.next = null
        } else t = this.c();
        return t
      };
      var jt, Wt = new Kt(function () {
        return new zt
      }, function (t) {
        t.reset()
      });

      function zt() {
        this.next = this.b = this.a = null
      }

      function Ht(t) {
        w.setTimeout(function () {
          throw t
        }, 0)
      }

      function Yt(t, e) {
        jt || function () {
          var t = w.Promise.resolve(void 0);
          jt = function () {
            t.then($t)
          }
        }(), Xt || (jt(), Xt = !0), Jt.add(t, e)
      }

      Gt.prototype.add = function (t, e) {
        var n = Wt.get();
        n.set(t, e), this.b ? this.b.next = n : this.a = n, this.b = n
      }, zt.prototype.set = function (t, e) {
        this.a = t, this.b = e, this.next = null
      };
      var Xt = !(zt.prototype.reset = function () {
        this.next = this.b = this.a = null
      }), Jt = new Gt;

      function $t() {
        for (var t; r = n = void 0, r = null, (n = Jt).a && (r = n.a, n.a = n.a.next, n.a || (n.b = null), r.next = null), t = r;) {
          try {
            t.a.call(t.b)
          } catch (t) {
            Ht(t)
          }
          var e = Wt;
          e.f(t), e.b < 100 && (e.b++, t.next = e.a, e.a = t)
        }
        var n, r;
        Xt = !1
      }

      function Zt(t, e) {
        Bt.call(this), this.b = t || 1, this.a = e || w, this.f = O(this.gb, this), this.g = P()
      }

      function te(t) {
        t.ba = !1, t.L && (t.a.clearTimeout(t.L), t.L = null)
      }

      function ee(t, e, n) {
        if ("function" == C(t)) n && (t = O(t, n)); else {
          if (!t || "function" != typeof t.handleEvent) throw Error("Invalid listener argument");
          t = O(t.handleEvent, t)
        }
        return 2147483647 < Number(e) ? -1 : w.setTimeout(t, e || 0)
      }

      function ne(t, e, n) {
        q.call(this), this.f = null != n ? O(t, n) : t, this.c = e, this.b = O(this.ab, this), this.a = []
      }

      function re(t) {
        t.U = ee(t.b, t.c), t.f.apply(null, t.a)
      }

      function ie(t) {
        q.call(this), this.b = t, this.a = {}
      }

      x(Zt, Bt), (y = Zt.prototype).ba = !1, y.L = null, y.gb = function () {
        if (this.ba) {
          var t = P() - this.g;
          0 < t && t < .8 * this.b ? this.L = this.a.setTimeout(this.f, this.b - t) : (this.L && (this.a.clearTimeout(this.L), this.L = null), this.dispatchEvent("tick"), this.ba && (te(this), this.start()))
        }
      }, y.start = function () {
        this.ba = !0, this.L || (this.L = this.a.setTimeout(this.f, this.b), this.g = P())
      }, y.G = function () {
        Zt.N.G.call(this), te(this), delete this.a
      }, x(ne, q), (y = ne.prototype).ea = !1, y.U = null, y.Ua = function (t) {
        this.a = arguments, this.U ? this.ea = !0 : re(this)
      }, y.G = function () {
        ne.N.G.call(this), this.U && (w.clearTimeout(this.U), this.U = null, this.ea = !1, this.a = [])
      }, y.ab = function () {
        this.U = null, this.ea && (this.ea = !1, re(this))
      }, x(ie, q);
      var oe = [];

      function ae(t, e, n, r) {
        D(n) || (n && (oe[0] = n.toString()), n = oe);
        for (var i = 0; i < n.length; i++) {
          var o = Mt(e, n[i], r || t.handleEvent, !1, t.b || t);
          if (!o) break;
          t.a[o.key] = o
        }
      }

      function se(t) {
        Y(t.a, function (t, e) {
          this.a.hasOwnProperty(e) && Ot(t)
        }, t), t.a = {}
      }

      function ue() {
      }

      ie.prototype.G = function () {
        ie.N.G.call(this), se(this)
      }, ie.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented")
      };
      var ce = new Bt;

      function he(t) {
        bt.call(this, "serverreachability", t)
      }

      function le(t) {
        ce.dispatchEvent(new he(ce, t))
      }

      function fe(t) {
        bt.call(this, "statevent", t)
      }

      function pe(t) {
        ce.dispatchEvent(new fe(ce, t))
      }

      function de(t) {
        bt.call(this, "timingevent", t)
      }

      function me(t, e) {
        if ("function" != C(t)) throw Error("Fn must not be null and must be a function");
        return w.setTimeout(function () {
          t()
        }, e)
      }

      x(he, bt), x(fe, bt), x(de, bt);
      var ye = {NO_ERROR: 0, hb: 1, ob: 2, nb: 3, kb: 4, mb: 5, pb: 6, Ma: 7, TIMEOUT: 8, sb: 9}, ge = {
        jb: "complete",
        wb: "success",
        Na: "error",
        Ma: "abort",
        ub: "ready",
        vb: "readystatechange",
        TIMEOUT: "timeout",
        qb: "incrementaldata",
        tb: "progress",
        lb: "downloadprogress",
        xb: "uploadprogress"
      };

      function ve() {
      }

      function be(t) {
        var e;
        return (e = t.a) || (e = t.a = {}), e
      }

      function we() {
      }

      ve.prototype.a = null;
      var Ee, Se = {OPEN: "a", ib: "b", Na: "c", rb: "d"};

      function Te() {
        bt.call(this, "d")
      }

      function Ie() {
        bt.call(this, "c")
      }

      function Ce() {
      }

      function De(t, e, n) {
        this.g = t, this.W = e, this.V = n || 1, this.I = new ie(this), this.O = Ne, t = ot ? 125 : void 0, this.P = new Zt(t), this.h = null, this.b = !1, this.l = this.D = this.f = this.F = this.v = this.R = this.i = null, this.j = [], this.a = null, this.A = 0, this.c = this.w = null, this.o = -1, this.m = !1, this.J = 0, this.B = null, this.s = this.S = this.H = !1
      }

      x(Te, bt), x(Ie, bt), x(Ce, ve), Ee = new Ce;
      var Ne = 45e3, Ae = {}, ke = {};

      function Re(t, e, n) {
        t.F = 1, t.f = en(He(e)), t.l = n, t.H = !0, _e(t, null)
      }

      function Me(t, e, n, r) {
        t.F = 1, t.f = en(He(e)), t.l = null, t.H = n, _e(t, r)
      }

      function _e(t, e) {
        t.v = P(), Pe(t), t.D = He(t.f), tn(t.D, "t", t.V), t.A = 0, t.a = t.g.$(t.g.Y() ? e : null), 0 < t.J && (t.B = new ne(O(t.Ka, t, t.a), t.J)), ae(t.I, t.a, "readystatechange", t.eb), e = t.h ? X(t.h) : {}, t.l ? (t.w || (t.w = "POST"), e["Content-Type"] = "application/x-www-form-urlencoded", t.a.ca(t.D, t.w, t.l, e)) : (t.w = "GET", t.a.ca(t.D, t.w, null, e)), le(1)
      }

      function Oe(t, e, n) {
        for (var r = !0; !t.m && t.A < n.length;) {
          var i = Le(t, n);
          if (i == ke) {
            4 == e && (t.c = 4, pe(14), r = !1);
            break
          }
          if (i == Ae) {
            t.c = 4, pe(15), r = !1;
            break
          }
          Be(t, i)
        }
        4 == e && 0 == n.length && (t.c = 1, pe(16), r = !1), t.b = t.b && r, r || (Ve(t), Fe(t))
      }

      function Le(t, e) {
        var n = t.A, r = e.indexOf("\n", n);
        return -1 == r ? ke : (n = Number(e.substring(n, r)), isNaN(n) ? Ae : (r += 1) + n > e.length ? ke : (e = e.substr(r, n), t.A = r + n, e))
      }

      function Pe(t) {
        t.R = P() + t.O, xe(t, t.O)
      }

      function xe(t, e) {
        if (null != t.i) throw Error("WatchDog timer not null");
        t.i = me(O(t.bb, t), e)
      }

      function qe(t) {
        t.i && (w.clearTimeout(t.i), t.i = null)
      }

      function Fe(t) {
        t.g.Da() || t.m || t.g.na(t)
      }

      function Ve(t) {
        qe(t);
        var e = t.B;
        e && "function" == typeof e.la && e.la(), t.B = null, te(t.P), se(t.I), t.a && (e = t.a, t.a = null, e.abort(), e.la())
      }

      function Be(t, e) {
        try {
          t.g.Ga(t, e), le(4)
        } catch (t) {
        }
      }

      function Ue(t, e) {
        if (t.forEach && "function" == typeof t.forEach) t.forEach(e, void 0); else if (N(t) || E(t)) V(t, e, void 0); else {
          if (t.K && "function" == typeof t.K) var n = t.K(); else if (t.C && "function" == typeof t.C) n = void 0; else if (N(t) || E(t)) {
            n = [];
            for (var r = t.length, i = 0; i < r; i++) n.push(i)
          } else for (i in n = [], r = 0, t) n[r++] = i;
          i = (r = function (t) {
            if (t.C && "function" == typeof t.C) return t.C();
            if (E(t)) return t.split("");
            if (N(t)) {
              for (var e = [], n = t.length, r = 0; r < n; r++) e.push(t[r]);
              return e
            }
            for (r in e = [], n = 0, t) e[n++] = t[r];
            return e
          }(t)).length;
          for (var o = 0; o < i; o++) e.call(void 0, r[o], n && n[o], t)
        }
      }

      function Qe(t, e) {
        this.b = {}, this.a = [], this.c = 0;
        var n = arguments.length;
        if (1 < n) {
          if (n % 2) throw Error("Uneven number of arguments");
          for (var r = 0; r < n; r += 2) this.set(arguments[r], arguments[r + 1])
        } else if (t) if (t instanceof Qe) for (n = t.K(), r = 0; r < n.length; r++) this.set(n[r], t.get(n[r])); else for (r in t) this.set(r, t[r])
      }

      function Ke(t, e) {
        je(t.b, e) && (delete t.b[e], t.c--, t.a.length > 2 * t.c && Ge(t))
      }

      function Ge(t) {
        if (t.c != t.a.length) {
          for (var e = 0, n = 0; e < t.a.length;) {
            var r = t.a[e];
            je(t.b, r) && (t.a[n++] = r), e++
          }
          t.a.length = n
        }
        if (t.c != t.a.length) {
          var i = {};
          for (n = e = 0; e < t.a.length;) je(i, r = t.a[e]) || (i[t.a[n++] = r] = 1), e++;
          t.a.length = n
        }
      }

      function je(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
      }

      (y = De.prototype).setTimeout = function (t) {
        this.O = t
      }, y.eb = function (t) {
        t = t.target;
        var e = this.B;
        e && 3 == Hn(t) ? e.Ua() : this.Ka(t)
      }, y.Ka = function (t) {
        try {
          if (t == this.a) t:{
            var e = Hn(this.a), n = this.a.ya(), r = this.a.T();
            if (!(e < 3 || 3 == e && !ot && !this.a.aa())) {
              this.m || 4 != e || 7 == n || le(8 == n || r <= 0 ? 3 : 2), qe(this);
              var i = this.a.T();
              this.o = i;
              var o = this.a.aa();
              if (this.b = 200 == i) {
                if (this.S && !this.s) {
                  e:{
                    if (this.a) {
                      var a = Yn(this.a, "X-HTTP-Initial-Response");
                      if (a && !Q(a)) {
                        var s = a;
                        break e
                      }
                    }
                    s = null
                  }
                  if (!s) {
                    this.b = !1, this.c = 3, pe(12), Ve(this), Fe(this);
                    break t
                  }
                  this.s = !0, Be(this, s)
                }
                this.H ? (Oe(this, e, o), ot && this.b && 3 == e && (ae(this.I, this.P, "tick", this.cb), this.P.start())) : Be(this, o), 4 == e && Ve(this), this.b && !this.m && (4 == e ? this.g.na(this) : (this.b = !1, Pe(this)))
              } else 400 == i && 0 < o.indexOf("Unknown SID") ? (this.c = 3, pe(12)) : (this.c = 0, pe(13)), Ve(this), Fe(this)
            }
          }
        } catch (t) {
        }
      }, y.cb = function () {
        if (this.a) {
          var t = Hn(this.a), e = this.a.aa();
          this.A < e.length && (qe(this), Oe(this, t, e), this.b && 4 != t && Pe(this))
        }
      }, y.cancel = function () {
        this.m = !0, Ve(this)
      }, y.bb = function () {
        this.i = null;
        var t = P();
        0 <= t - this.R ? (2 != this.F && (le(3), pe(17)), Ve(this), this.c = 2, Fe(this)) : xe(this, this.R - t)
      }, (y = Qe.prototype).C = function () {
        Ge(this);
        for (var t = [], e = 0; e < this.a.length; e++) t.push(this.b[this.a[e]]);
        return t
      }, y.K = function () {
        return Ge(this), this.a.concat()
      }, y.get = function (t, e) {
        return je(this.b, t) ? this.b[t] : e
      }, y.set = function (t, e) {
        je(this.b, t) || (this.c++, this.a.push(t)), this.b[t] = e
      }, y.forEach = function (t, e) {
        for (var n = this.K(), r = 0; r < n.length; r++) {
          var i = n[r], o = this.get(i);
          t.call(e, o, i, this)
        }
      };
      var We = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;

      function ze(t, e) {
        var n;
        this.b = this.j = this.f = "", this.i = null, this.g = this.a = "", this.h = !1, t instanceof ze ? (this.h = void 0 !== e ? e : t.h, Ye(this, t.f), this.j = t.j, Xe(this, t.b), Je(this, t.i), this.a = t.a, $e(this, yn(t.c)), this.g = t.g) : t && (n = String(t).match(We)) ? (this.h = !!e, Ye(this, n[1] || "", !0), this.j = nn(n[2] || ""), Xe(this, n[3] || "", !0), Je(this, n[4]), this.a = nn(n[5] || "", !0), $e(this, n[6] || "", !0), this.g = nn(n[7] || "")) : (this.h = !!e, this.c = new ln(null, this.h))
      }

      function He(t) {
        return new ze(t)
      }

      function Ye(t, e, n) {
        t.f = n ? nn(e, !0) : e, t.f && (t.f = t.f.replace(/:$/, ""))
      }

      function Xe(t, e, n) {
        t.b = n ? nn(e, !0) : e
      }

      function Je(t, e) {
        if (e) {
          if (e = Number(e), isNaN(e) || e < 0) throw Error("Bad port number " + e);
          t.i = e
        } else t.i = null
      }

      function $e(t, e, n) {
        e instanceof ln ? (t.c = e, function (t, e) {
          e && !t.f && (fn(t), t.c = null, t.a.forEach(function (t, e) {
            var n = e.toLowerCase();
            e != n && (pn(this, e), mn(this, n, t))
          }, t)), t.f = e
        }(t.c, t.h)) : (n || (e = rn(e, cn)), t.c = new ln(e, t.h))
      }

      function Ze(t, e, n) {
        t.c.set(e, n)
      }

      function tn(t, e, n) {
        D(n) || (n = [String(n)]), mn(t.c, e, n)
      }

      function en(t) {
        return Ze(t, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ P()).toString(36)), t
      }

      function nn(t, e) {
        return t ? e ? decodeURI(t.replace(/%25/g, "%2525")) : decodeURIComponent(t) : ""
      }

      function rn(t, e, n) {
        return E(t) ? (t = encodeURI(t).replace(e, on), n && (t = t.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), t) : null
      }

      function on(t) {
        return "%" + ((t = t.charCodeAt(0)) >> 4 & 15).toString(16) + (15 & t).toString(16)
      }

      ze.prototype.toString = function () {
        var t = [], e = this.f;
        e && t.push(rn(e, an, !0), ":");
        var n = this.b;
        return !n && "file" != e || (t.push("//"), (e = this.j) && t.push(rn(e, an, !0), "@"), t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), null != (n = this.i) && t.push(":", String(n))), (n = this.a) && (this.b && "/" != n.charAt(0) && t.push("/"), t.push(rn(n, "/" == n.charAt(0) ? un : sn, !0))), (n = this.c.toString()) && t.push("?", n), (n = this.g) && t.push("#", rn(n, hn)), t.join("")
      }, ze.prototype.resolve = function (t) {
        var e = He(this), n = !!t.f;
        n ? Ye(e, t.f) : n = !!t.j, n ? e.j = t.j : n = !!t.b, n ? Xe(e, t.b) : n = null != t.i;
        var r = t.a;
        if (n) Je(e, t.i); else if (n = !!t.a) {
          if ("/" != r.charAt(0)) if (this.b && !this.a) r = "/" + r; else {
            var i = e.a.lastIndexOf("/");
            -1 != i && (r = e.a.substr(0, i + 1) + r)
          }
          if (".." == (i = r) || "." == i) r = ""; else if (j(i, "./") || j(i, "/.")) {
            r = 0 == i.lastIndexOf("/", 0), i = i.split("/");
            for (var o = [], a = 0; a < i.length;) {
              var s = i[a++];
              "." == s ? r && a == i.length && o.push("") : ".." == s ? ((1 < o.length || 1 == o.length && "" != o[0]) && o.pop(), r && a == i.length && o.push("")) : (o.push(s), r = !0)
            }
            r = o.join("/")
          } else r = i
        }
        return n ? e.a = r : n = "" !== t.c.toString(), n ? $e(e, yn(t.c)) : n = !!t.g, n && (e.g = t.g), e
      };
      var an = /[#\/\?@]/g, sn = /[#\?:]/g, un = /[#\?]/g, cn = /[#\?@]/g, hn = /#/g;

      function ln(t, e) {
        this.b = this.a = null, this.c = t || null, this.f = !!e
      }

      function fn(n) {
        n.a || (n.a = new Qe, n.b = 0, n.c && function (t, e) {
          if (t) {
            t = t.split("&");
            for (var n = 0; n < t.length; n++) {
              var r = t[n].indexOf("="), i = null;
              if (0 <= r) {
                var o = t[n].substring(0, r);
                i = t[n].substring(r + 1)
              } else o = t[n];
              e(o, i ? decodeURIComponent(i.replace(/\+/g, " ")) : "")
            }
          }
        }(n.c, function (t, e) {
          n.add(decodeURIComponent(t.replace(/\+/g, " ")), e)
        }))
      }

      function pn(t, e) {
        fn(t), e = gn(t, e), je(t.a.b, e) && (t.c = null, t.b -= t.a.get(e).length, Ke(t.a, e))
      }

      function dn(t, e) {
        return fn(t), e = gn(t, e), je(t.a.b, e)
      }

      function mn(t, e, n) {
        pn(t, e), 0 < n.length && (t.c = null, t.a.set(gn(t, e), U(n)), t.b += n.length)
      }

      function yn(t) {
        var e = new ln;
        return e.c = t.c, t.a && (e.a = new Qe(t.a), e.b = t.b), e
      }

      function gn(t, e) {
        return e = String(e), t.f && (e = e.toLowerCase()), e
      }

      function vn(t) {
        this.a = t, this.b = this.h = null, this.g = !1, this.i = null, this.c = -1, this.l = this.f = null
      }

      function bn(t) {
        var e = t.a.F.a;
        if (null != e) pe(4), e ? (pe(10), sr(t.a, t, !1)) : (pe(11), sr(t.a, t, !0)); else {
          t.b = new De(t, void 0, void 0), t.b.h = t.h, e = fr(e = t.a, e.Y() ? t.f : null, t.i), pe(4), tn(e, "TYPE", "xmlhttp");
          var n = t.a.j, r = t.a.I;
          n && r && Ze(e, n, r), Me(t.b, e, !1, t.f)
        }
      }

      function wn() {
        this.a = this.b = null
      }

      function En() {
        this.a = new Qe
      }

      function Sn(t) {
        var e = typeof t;
        return "object" == e && t || "function" == e ? "o" + (t[k] || (t[k] = ++R)) : e.charAt(0) + t
      }

      function Tn(t, e) {
        this.b = t, this.a = e
      }

      function In(t) {
        this.g = t || Cn, t = w.PerformanceNavigationTiming ? 0 < (t = w.performance.getEntriesByType("navigation")).length && ("hq" == t[0].nextHopProtocol || "h2" == t[0].nextHopProtocol) : !!(w.ka && w.ka.Ea && w.ka.Ea() && w.ka.Ea().zb), this.f = t ? this.g : 1, this.a = null, 1 < this.f && (this.a = new En), this.b = null, this.c = []
      }

      (y = ln.prototype).add = function (t, e) {
        fn(this), this.c = null, t = gn(this, t);
        var n = this.a.get(t);
        return n || this.a.set(t, n = []), n.push(e), this.b += 1, this
      }, y.forEach = function (n, r) {
        fn(this), this.a.forEach(function (t, e) {
          V(t, function (t) {
            n.call(r, t, e, this)
          }, this)
        }, this)
      }, y.K = function () {
        fn(this);
        for (var t = this.a.C(), e = this.a.K(), n = [], r = 0; r < e.length; r++) for (var i = t[r], o = 0; o < i.length; o++) n.push(e[r]);
        return n
      }, y.C = function (t) {
        fn(this);
        var e = [];
        if (E(t)) dn(this, t) && (e = B(e, this.a.get(gn(this, t)))); else {
          t = this.a.C();
          for (var n = 0; n < t.length; n++) e = B(e, t[n])
        }
        return e
      }, y.set = function (t, e) {
        return fn(this), this.c = null, dn(this, t = gn(this, t)) && (this.b -= this.a.get(t).length), this.a.set(t, [e]), this.b += 1, this
      }, y.get = function (t, e) {
        return t && 0 < (t = this.C(t)).length ? String(t[0]) : e
      }, y.toString = function () {
        if (this.c) return this.c;
        if (!this.a) return "";
        for (var t = [], e = this.a.K(), n = 0; n < e.length; n++) {
          var r = e[n], i = encodeURIComponent(String(r));
          r = this.C(r);
          for (var o = 0; o < r.length; o++) {
            var a = i;
            "" !== r[o] && (a += "=" + encodeURIComponent(String(r[o]))), t.push(a)
          }
        }
        return this.c = t.join("&")
      }, x(function () {
      }, function () {
      }), (y = vn.prototype).M = null, y.$ = function (t) {
        return this.a.$(t)
      }, y.abort = function () {
        this.b && (this.b.cancel(), this.b = null), this.c = -1
      }, y.Da = function () {
        return !1
      }, y.Ga = function (t, e) {
        if (this.c = t.o, 0 == this.M) {
          if (!this.a.o && (t = t.a)) {
            var n = Yn(t, "X-Client-Wire-Protocol");
            this.l = n || null, this.a.j && (t = Yn(t, "X-HTTP-Session-Id")) && (this.a.I = t)
          }
          if (e) {
            try {
              var r = this.a.ja.a.parse(e)
            } catch (t) {
              return (e = this.a).m = this.c, void hr(e, 2)
            }
            this.f = r[0]
          } else (e = this.a).m = this.c, hr(e, 2)
        } else 1 == this.M && (this.g ? pe(6) : "11111" == e ? (pe(5), this.g = !0, (!rt || 10 <= Number(ft)) && (this.c = 200, this.b.cancel(), pe(11), sr(this.a, this, !0))) : (pe(7), this.g = !1))
      }, y.na = function () {
        if (this.c = this.b.o, this.b.b) 0 == this.M ? (this.M = 1, bn(this)) : 1 == this.M && (this.g ? (pe(11), sr(this.a, this, !0)) : (pe(10), sr(this.a, this, !1))); else {
          0 == this.M ? pe(8) : 1 == this.M && pe(9);
          var t = this.a;
          t.m = this.c, hr(t, 2)
        }
      }, y.Y = function () {
        return this.a.Y()
      }, y.ma = function () {
        return this.a.ma()
      }, En.prototype.add = function (t) {
        this.a.set(Sn(t), t)
      }, En.prototype.C = function () {
        return this.a.C()
      };
      var Cn = 10;

      function Dn(t, e) {
        !t.a && (j(e, "spdy") || j(e, "quic") || j(e, "h2")) && (t.f = t.g, t.a = new En, t.b && (Rn(t, t.b), t.b = null))
      }

      function Nn(t) {
        return !!t.b || !!t.a && t.a.a.c >= t.f
      }

      function An(t) {
        return t.b ? 1 : t.a ? t.a.a.c : 0
      }

      function kn(t, e) {
        return t = t.b ? t.b == e : !!t.a && (e = Sn(e), je(t.a.a.b, e))
      }

      function Rn(t, e) {
        t.a ? t.a.add(e) : t.b = e
      }

      function Mn(t, e) {
        var n;
        t.b && t.b == e ? t.b = null : ((n = t.a) && (n = Sn(e), n = je(t.a.a.b, n)), n && Ke(t.a.a, Sn(e)))
      }

      function _n(t) {
        if (null != t.b) return t.c.concat(t.b.j);
        if (null == t.a || 0 == t.a.a.c) return U(t.c);
        var e = t.c;
        return V(t.a.C(), function (t) {
          e = e.concat(t.j)
        }), e
      }

      function On() {
      }

      function Ln() {
        this.a = new On
      }

      function Pn(t, r, e) {
        var i = e || "";
        try {
          Ue(t, function (t, e) {
            var n = t;
            A(t) && (n = Qt(t)), r.push(i + e + "=" + encodeURIComponent(n))
          })
        } catch (t) {
          throw r.push(i + "type=" + encodeURIComponent("_badmap")), t
        }
      }

      function xn(t, e, n, r, i) {
        try {
          e.onload = null, e.onerror = null, e.onabort = null, e.ontimeout = null, i(r)
        } catch (t) {
        }
      }

      In.prototype.cancel = function () {
        this.c = _n(this), this.b ? (this.b.cancel(), this.b = null) : this.a && 0 != this.a.a.c && (V(this.a.C(), function (t) {
          t.cancel()
        }), function (t) {
          t.b = {}, t.a.length = 0, t.c = 0
        }(this.a.a))
      }, On.prototype.stringify = function (t) {
        return w.JSON.stringify(t, void 0)
      }, On.prototype.parse = function (t) {
        return w.JSON.parse(t, void 0)
      };
      var qn = w.JSON.parse;

      function Fn(t) {
        Bt.call(this), this.headers = new Qe, this.H = t || null, this.b = !1, this.s = this.a = null, this.A = "", this.h = 0, this.f = "", this.g = this.w = this.l = this.v = !1, this.o = 0, this.m = null, this.I = Vn, this.D = this.F = !1
      }

      x(Fn, Bt);
      var Vn = "", Bn = /^https?$/i, Un = ["POST", "PUT"];

      function Qn(t) {
        return "content-type" == t.toLowerCase()
      }

      function Kn(t, e) {
        t.b = !1, t.a && (t.g = !0, t.a.abort(), t.g = !1), t.f = e, t.h = 5, Gn(t), Wn(t)
      }

      function Gn(t) {
        t.v || (t.v = !0, t.dispatchEvent("complete"), t.dispatchEvent("error"))
      }

      function jn(t) {
        if (t.b && void 0 !== b && (!t.s[1] || 4 != Hn(t) || 2 != t.T())) if (t.l && 4 == Hn(t)) ee(t.Fa, 0, t); else if (t.dispatchEvent("readystatechange"), 4 == Hn(t)) {
          t.b = !1;
          try {
            var e, n = t.T();
            t:switch (n) {
              case 200:
              case 201:
              case 202:
              case 204:
              case 206:
              case 304:
              case 1223:
                var r = !0;
                break t;
              default:
                r = !1
            }
            if (!(e = r)) {
              var i;
              if (i = 0 === n) {
                var o = String(t.A).match(We)[1] || null;
                if (!o && w.self && w.self.location) {
                  var a = w.self.location.protocol;
                  o = a.substr(0, a.length - 1)
                }
                i = !Bn.test(o ? o.toLowerCase() : "")
              }
              e = i
            }
            e ? (t.dispatchEvent("complete"), t.dispatchEvent("success")) : (t.h = 6, t.f = t.za() + " [" + t.T() + "]", Gn(t))
          } finally {
            Wn(t)
          }
        }
      }

      function Wn(t, e) {
        if (t.a) {
          zn(t);
          var n = t.a, r = t.s[0] ? I : null;
          t.a = null, t.s = null, e || t.dispatchEvent("ready");
          try {
            n.onreadystatechange = r
          } catch (t) {
          }
        }
      }

      function zn(t) {
        t.a && t.D && (t.a.ontimeout = null), t.m && (w.clearTimeout(t.m), t.m = null)
      }

      function Hn(t) {
        return t.a ? t.a.readyState : 0
      }

      function Yn(t, e) {
        return t.a ? t.a.getResponseHeader(e) : null
      }

      function Xn(t, e, n) {
        t:{
          for (r in n) {
            var r = !1;
            break t
          }
          r = !0
        }
        if (r) return t;
        if (n = function (t) {
          var n = "";
          return Y(t, function (t, e) {
            n += e, n += ":", n += t, n += "\r\n"
          }), n
        }(n), E(t)) {
          if (e = encodeURIComponent(String(e)), e += n = null != n ? "=" + encodeURIComponent(String(n)) : "") {
            if ((n = t.indexOf("#")) < 0 && (n = t.length), (r = t.indexOf("?")) < 0 || n < r) {
              r = n;
              var i = ""
            } else i = t.substring(r + 1, n);
            n = (t = [t.substr(0, r), i, t.substr(n)])[1], t[1] = e ? n ? n + "&" + e : e : n, t = t[0] + (t[1] ? "?" + t[1] : "") + t[2]
          }
          return t
        }
        return Ze(t, e, n), t
      }

      function Jn(t) {
        this.f = [], this.F = new wn, this.ga = this.pa = this.B = this.ha = this.a = this.I = this.j = this.V = this.g = this.J = this.i = null, this.Ra = this.P = 0, this.Pa = !!T("internalChannelParams.failFast", t), this.ia = this.w = this.s = this.l = this.h = this.c = null, this.oa = !0, this.m = this.ra = this.O = -1, this.S = this.v = this.A = 0, this.Oa = T("internalChannelParams.baseRetryDelayMs", t) || 5e3, this.Sa = T("internalChannelParams.retryDelaySeedMs", t) || 1e4, this.Qa = T("internalChannelParams.forwardChannelMaxRetries", t) || 2, this.qa = T("internalChannelParams.forwardChannelRequestTimeoutMs", t) || 2e4, this.La = t && t.Ab || void 0, this.D = void 0, this.R = t && t.supportsCrossDomainXhr || !1, this.H = "", this.b = new In(t && t.concurrentRequestLimit), this.ja = new Ln, this.o = !t || void 0 === t.backgroundChannelTest || t.backgroundChannelTest, (this.W = t && t.fastHandshake || !1) && !this.o && (this.o = !0), t && t.forceLongPolling && (this.oa = !1), this.fa = void 0
      }

      function $n(t) {
        if (Zn(t), 3 == t.u) {
          var e = t.P++, n = He(t.B);
          Ze(n, "SID", t.H), Ze(n, "RID", e), Ze(n, "TYPE", "terminate"), rr(t, n), (e = new De(t, e, void 0)).F = 2, e.f = en(He(n)), n = !1, w.navigator && w.navigator.sendBeacon && (n = w.navigator.sendBeacon(e.f.toString(), "")), !n && w.Image && ((new Image).src = e.f, n = !0), n || (e.a = e.g.$(null), e.a.ca(e.f)), e.v = P(), Pe(e)
        }
        lr(t)
      }

      function Zn(t) {
        t.w && (t.w.abort(), t.w = null), t.a && (t.a.cancel(), t.a = null), t.l && (w.clearTimeout(t.l), t.l = null), ur(t), t.b.cancel(), t.h && (S(t.h) && w.clearTimeout(t.h), t.h = null)
      }

      function tr(t, e) {
        t.f.push(new Tn(t.Ra++, e)), 3 == t.u && er(t)
      }

      function er(t) {
        Nn(t.b) || t.h || (t.h = !0, Yt(t.Ia, t), t.A = 0)
      }

      function nr(t, e) {
        var n;
        n = e ? e.W : t.P++;
        var r = He(t.B);
        Ze(r, "SID", t.H), Ze(r, "RID", n), Ze(r, "AID", t.O), rr(t, r), t.g && t.i && Xn(r, t.g, t.i), n = new De(t, n, t.A + 1), null === t.g && (n.h = t.i), e && (t.f = e.j.concat(t.f)), e = ir(t, n, 1e3), n.setTimeout(Math.round(.5 * t.qa) + Math.round(.5 * t.qa * Math.random())), Rn(t.b, n), Re(n, r, e)
      }

      function rr(t, n) {
        t.c && Ue({}, function (t, e) {
          Ze(n, e, t)
        })
      }

      function ir(t, e, n) {
        n = Math.min(t.f.length, n);
        var r = t.c ? O(t.c.Ta, t.c, t) : null;
        t:for (var i = t.f, o = -1; ;) {
          var a = ["count=" + n];
          -1 == o ? 0 < n ? (o = i[0].b, a.push("ofs=" + o)) : o = 0 : a.push("ofs=" + o);
          for (var s = !0, u = 0; u < n; u++) {
            var c = i[u].b, h = i[u].a;
            if ((c -= o) < 0) o = Math.max(0, i[u].b - 100), s = !1; else try {
              Pn(h, a, "req" + c + "_")
            } catch (t) {
              r && r(h)
            }
          }
          if (s) {
            r = a.join("&");
            break t
          }
        }
        return t = t.f.splice(0, n), e.j = t, r
      }

      function or(t) {
        t.a || t.l || (t.S = 1, Yt(t.Ha, t), t.v = 0)
      }

      function ar(t) {
        return !(t.a || t.l || 3 <= t.v) && (t.S++, t.l = me(O(t.Ha, t), cr(t, t.v)), t.v++, !0)
      }

      function sr(t, e, n) {
        var r = e.l;
        r && Dn(t.b, r), t.ia = t.oa && n, t.m = e.c, t.B = fr(t, null, t.ha), er(t)
      }

      function ur(t) {
        null != t.s && (w.clearTimeout(t.s), t.s = null)
      }

      function cr(t, e) {
        var n = t.Oa + Math.floor(Math.random() * t.Sa);
        return t.ma() || (n *= 2), n * e
      }

      function hr(t, e) {
        if (2 == e) {
          var n = null;
          t.c && (n = null);
          var r = O(t.fb, t);
          n || (n = new ze("//www.google.com/images/cleardot.gif"), w.location && "http" == w.location.protocol || Ye(n, "https"), en(n)), function (t, e) {
            var n = new ue;
            if (w.Image) {
              var r = new Image;
              r.onload = L(xn, n, r, "TestLoadImage: loaded", !0, e), r.onerror = L(xn, n, r, "TestLoadImage: error", !1, e), r.onabort = L(xn, n, r, "TestLoadImage: abort", !1, e), r.ontimeout = L(xn, n, r, "TestLoadImage: timeout", !1, e), w.setTimeout(function () {
                r.ontimeout && r.ontimeout()
              }, 1e4), r.src = t
            } else e(!1)
          }(n.toString(), r)
        } else pe(2);
        t.u = 0, t.c && t.c.ta(e), lr(t), Zn(t)
      }

      function lr(t) {
        t.u = 0, t.m = -1, t.c && (0 == _n(t.b).length && 0 == t.f.length || (t.b.c.length = 0, U(t.f), t.f.length = 0), t.c.sa())
      }

      function fr(t, e, n) {
        var r = function (t) {
          return t instanceof ze ? He(t) : new ze(t, void 0)
        }(n);
        if ("" != r.b) e && Xe(r, e + "." + r.b), Je(r, r.i); else {
          var i, o = w.location;
          i = e ? e + "." + o.hostname : o.hostname, r = function (t, e, n, r) {
            var i = new ze(null, void 0);
            return t && Ye(i, t), e && Xe(i, e), n && Je(i, n), r && (i.a = r), i
          }(o.protocol, i, +o.port, n)
        }
        return t.V && Y(t.V, function (t, e) {
          Ze(r, e, t)
        }), e = t.j, n = t.I, e && n && Ze(r, e, n), Ze(r, "VER", t.wa), rr(t, r), r
      }

      function pr() {
      }

      function dr() {
        if (rt && !(10 <= Number(ft))) throw Error("Environmental error: no available transport.")
      }

      function mr(t, e) {
        Bt.call(this), this.a = new Jn(e), this.g = t, this.m = e && e.testUrl ? e.testUrl : function (t) {
          for (var e = t, n = 1; n < arguments.length; n++) {
            var r, i = arguments[n];
            if (0 == i.lastIndexOf("/", 0)) e = i; else (r = "" == e) || (r = 0 <= (r = e.length - 1) && e.indexOf("/", r) == r), e += r ? i : "/" + i
          }
          return e
        }(this.g, "test"), this.b = e && e.messageUrlParams || null, t = e && e.messageHeaders || null, e && e.clientProtocolHeaderRequired && (t ? t["X-Client-Protocol"] = "webchannel" : t = {"X-Client-Protocol": "webchannel"}), this.a.i = t, t = e && e.initMessageHeaders || null, e && e.messageContentType && (t ? t["X-WebChannel-Content-Type"] = e.messageContentType : t = {"X-WebChannel-Content-Type": e.messageContentType}), e && e.xa && (t ? t["X-WebChannel-Client-Profile"] = e.xa : t = {"X-WebChannel-Client-Profile": e.xa}), this.a.J = t, (t = e && e.httpHeadersOverwriteParam) && !Q(t) && (this.a.g = t), this.l = e && e.supportsCrossDomainXhr || !1, this.h = e && e.sendRawJson || !1, (e = e && e.httpSessionIdParam) && !Q(e) && (this.a.j = e, null !== (t = this.b) && e in t && (e in (t = this.b) && delete t[e])), this.f = new vr(this)
      }

      function yr(t) {
        Te.call(this);
        var e = t.__sm__;
        if (e) {
          t:{
            for (var n in e) {
              t = n;
              break t
            }
            t = void 0
          }
          (this.c = t) ? (t = this.c, this.data = null !== e && t in e ? e[t] : void 0) : this.data = e
        } else this.data = t
      }

      function gr() {
        Ie.call(this), this.status = 1
      }

      function vr(t) {
        this.a = t
      }

      (y = Fn.prototype).ca = function (t, e, n, r) {
        if (this.a) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.A + "; newUri=" + t);
        e = e ? e.toUpperCase() : "GET", this.A = t, this.f = "", this.h = 0, this.v = !1, this.b = !0, this.a = new XMLHttpRequest, this.s = this.H ? be(this.H) : be(Ee), this.a.onreadystatechange = O(this.Fa, this);
        try {
          this.w = !0, this.a.open(e, String(t), !0), this.w = !1
        } catch (t) {
          return void Kn(this, t)
        }
        t = n || "";
        var i = new Qe(this.headers);
        r && Ue(r, function (t, e) {
          i.set(e, t)
        }), r = function (t) {
          t:{
            for (var e = Qn, n = t.length, r = E(t) ? t.split("") : t, i = 0; i < n; i++) if (i in r && e.call(void 0, r[i], i, t)) {
              e = i;
              break t
            }
            e = -1
          }
          return e < 0 ? null : E(t) ? t.charAt(e) : t[e]
        }(i.K()), n = w.FormData && t instanceof w.FormData, 0 <= F(Un, e) && !r && !n && i.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"), i.forEach(function (t, e) {
          this.a.setRequestHeader(e, t)
        }, this), this.I && (this.a.responseType = this.I), "withCredentials" in this.a && this.a.withCredentials !== this.F && (this.a.withCredentials = this.F);
        try {
          zn(this), 0 < this.o && ((this.D = function (t) {
            return rt && dt(9) && S(t.timeout) && void 0 !== t.ontimeout
          }(this.a)) ? (this.a.timeout = this.o, this.a.ontimeout = O(this.Ca, this)) : this.m = ee(this.Ca, this.o, this)), this.l = !0, this.a.send(t), this.l = !1
        } catch (t) {
          Kn(this, t)
        }
      }, y.Ca = function () {
        void 0 !== b && this.a && (this.f = "Timed out after " + this.o + "ms, aborting", this.h = 8, this.dispatchEvent("timeout"), this.abort(8))
      }, y.abort = function (t) {
        this.a && this.b && (this.b = !1, this.g = !0, this.a.abort(), this.g = !1, this.h = t || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Wn(this))
      }, y.G = function () {
        this.a && (this.b && (this.b = !1, this.g = !0, this.a.abort(), this.g = !1), Wn(this, !0)), Fn.N.G.call(this)
      }, y.Fa = function () {
        this.j || (this.w || this.l || this.g ? jn(this) : this.$a())
      }, y.$a = function () {
        jn(this)
      }, y.T = function () {
        try {
          return 2 < Hn(this) ? this.a.status : -1
        } catch (t) {
          return -1
        }
      }, y.za = function () {
        try {
          return 2 < Hn(this) ? this.a.statusText : ""
        } catch (t) {
          return ""
        }
      }, y.aa = function () {
        try {
          return this.a ? this.a.responseText : ""
        } catch (t) {
          return ""
        }
      }, y.Va = function (t) {
        if (this.a) {
          var e = this.a.responseText;
          return t && 0 == e.indexOf(t) && (e = e.substring(t.length)), qn(e)
        }
      }, y.ya = function () {
        return this.h
      }, y.Ya = function () {
        return E(this.f) ? this.f : String(this.f)
      }, (y = Jn.prototype).wa = 8, y.u = 1, y.Da = function () {
        return 0 == this.u
      }, y.Ia = function (t) {
        if (this.h) if (this.h = null, 1 == this.u) {
          if (!t) {
            this.P = Math.floor(1e5 * Math.random()), t = this.P++;
            var e, n = new De(this, t, void 0), r = this.i;
            if (this.J && (r ? $(r = X(r), this.J) : r = this.J), null === this.g && (n.h = r), this.W) t:{
              for (var i = e = 0; i < this.f.length; i++) {
                var o = this.f[i];
                if (void 0 === (o = "__data__" in o.a && E(o = o.a.__data__) ? o.length : void 0)) break;
                if (4096 < (e += o)) {
                  e = i;
                  break t
                }
                if (4096 === e || i === this.f.length - 1) {
                  e = i + 1;
                  break t
                }
              }
              e = 1e3
            } else e = 1e3;
            e = ir(this, n, e), Ze(i = He(this.B), "RID", t), Ze(i, "CVER", 22), this.o && this.j && Ze(i, "X-HTTP-Session-Id", this.j), rr(this, i), this.g && r && Xn(i, this.g, r), Rn(this.b, n), this.W ? (Ze(i, "$req", e), Ze(i, "SID", "null"), n.S = !0, Re(n, i, null)) : Re(n, i, e), this.u = 2
          }
        } else 3 == this.u && (t ? nr(this, t) : 0 == this.f.length || Nn(this.b) || nr(this))
      }, y.Ha = function () {
        this.l = null, this.a = new De(this, "rpc", this.S), null === this.g && (this.a.h = this.i), this.a.J = 0;
        var t = He(this.pa);
        Ze(t, "RID", "rpc"), Ze(t, "SID", this.H), Ze(t, "CI", this.ia ? "0" : "1"), Ze(t, "AID", this.O), rr(this, t), Ze(t, "TYPE", "xmlhttp"), this.g && this.i && Xn(t, this.g, this.i), this.D && this.a.setTimeout(this.D), Me(this.a, t, !0, this.ga)
      }, y.Ga = function (t, e) {
        if (0 != this.u && (this.a == t || kn(this.b, t))) if (this.m = t.o, !t.s && kn(this.b, t) && 3 == this.u) {
          try {
            var n = this.ja.a.parse(e)
          } catch (t) {
            n = null
          }
          if (D(n) && 3 == n.length) {
            if (0 == (e = n)[0]) {
              t:if (!this.l) {
                if (this.a) {
                  if (!(this.a.v + 3e3 < t.v)) break t;
                  ur(this), this.a.cancel(), this.a = null
                }
                ar(this), pe(18)
              }
            } else this.ra = e[1], 0 < this.ra - this.O && e[2] < 37500 && this.ia && 0 == this.v && !this.s && (this.s = me(O(this.Za, this), 6e3));
            if (An(this.b) <= 1 && this.fa) {
              try {
                this.fa()
              } catch (t) {
              }
              this.fa = void 0
            }
          } else hr(this, 11)
        } else if (!t.s && this.a != t || ur(this), !Q(e)) for (e = n = this.ja.a.parse(e), n = 0; n < e.length; n++) {
          var r = e[n];
          if (this.O = r[0], r = r[1], 2 == this.u) if ("c" == r[0]) {
            this.H = r[1], this.ga = r[2];
            var i = r[3];
            null != i && (this.wa = i), null != (r = r[5]) && S(r) && 0 < r && (this.D = 1.5 * r), this.o && (r = t.a) && ((i = Yn(r, "X-Client-Wire-Protocol")) && Dn(this.b, i), this.j && (r = Yn(r, "X-HTTP-Session-Id"))) && (this.I = r, Ze(this.B, this.j, r)), this.u = 3, this.c && this.c.va(), r = t, this.pa = fr(this, this.Y() ? this.ga : null, this.ha), r.s ? (Mn(this.b, r), (i = this.D) && r.setTimeout(i), r.i && (qe(r), Pe(r)), this.a = r) : or(this), 0 < this.f.length && er(this)
          } else "stop" != r[0] && "close" != r[0] || hr(this, 7); else 3 == this.u && ("stop" == r[0] || "close" == r[0] ? "stop" == r[0] ? hr(this, 7) : $n(this) : "noop" != r[0] && this.c && this.c.ua(r), this.v = 0)
        }
      }, y.Za = function () {
        null != this.s && (this.s = null, this.a.cancel(), this.a = null, ar(this), pe(19))
      }, y.na = function (t) {
        var e = null;
        if (this.a == t) {
          ur(this), this.a = null;
          var n = 2
        } else {
          if (!kn(this.b, t)) return;
          e = t.j, Mn(this.b, t), n = 1
        }
        if (this.m = t.o, 0 != this.u) if (t.b) 1 == n ? (e = P() - t.v, ce.dispatchEvent(new de(ce, t.l ? t.l.length : 0, e, this.A)), er(this)) : or(this); else {
          var r = t.c;
          if (3 == r || 0 == r && 0 < this.m || !(1 == n && function (t, e) {
            return !(An(t.b) >= t.b.f - (t.h ? 1 : 0)) && (t.h ? (t.f = e.j.concat(t.f), !0) : !(1 == t.u || 2 == t.u || t.A >= (t.Pa ? 0 : t.Qa)) && (t.h = me(O(t.Ia, t, e), cr(t, t.A)), t.A++, !0))
          }(this, t) || 2 == n && ar(this))) switch (e && 0 < e.length && (t = this.b, t.c = t.c.concat(e)), r) {
            case 1:
              hr(this, 5);
              break;
            case 4:
              hr(this, 10);
              break;
            case 3:
              hr(this, 6);
              break;
            default:
              hr(this, 2)
          }
        }
      }, y.fb = function (t) {
        pe(t ? 2 : 1)
      }, y.$ = function (t) {
        if (t && !this.R) throw Error("Can't create secondary domain capable XhrIo object.");
        return (t = new Fn(this.La)).F = this.R, t
      }, y.ma = function () {
        return !!this.c && !0
      }, y.Y = function () {
        return this.R
      }, (y = pr.prototype).va = function () {
      }, y.ua = function () {
      }, y.ta = function () {
      }, y.sa = function () {
      }, y.Ta = function () {
      }, dr.prototype.a = function (t, e) {
        return new mr(t, e)
      }, x(mr, Bt), (y = mr.prototype).addEventListener = function (t, e, n, r) {
        mr.N.addEventListener.call(this, t, e, n, r)
      }, y.removeEventListener = function (t, e, n, r) {
        mr.N.removeEventListener.call(this, t, e, n, r)
      }, y.Wa = function () {
        this.a.c = this.f, this.l && (this.a.R = !0);
        var t = this.a, e = this.m, n = this.g, r = this.b || void 0;
        pe(0), t.ha = n, t.V = r || {}, t.o && (t.F.b = [], t.F.a = !1), t.w = new vn(t), null === t.g && (t.w.h = t.i), n = e, t.g && t.i && (n = Xn(e, t.g, t.i)), (t = t.w).i = n, e = fr(t.a, null, t.i), pe(3), null != (n = t.a.F.b) ? (t.f = n[0], t.M = 1, bn(t)) : (tn(e, "MODE", "init"), !t.a.o && t.a.j && tn(e, "X-HTTP-Session-Id", t.a.j), t.b = new De(t, void 0, void 0), t.b.h = t.h, Me(t.b, e, !1, null), t.M = 0)
      }, y.close = function () {
        $n(this.a)
      }, y.Xa = function (t) {
        if (E(t)) {
          var e = {};
          e.__data__ = t, tr(this.a, e)
        } else this.h ? ((e = {}).__data__ = Qt(t), tr(this.a, e)) : tr(this.a, t)
      }, y.G = function () {
        this.a.c = null, delete this.f, $n(this.a), delete this.a, mr.N.G.call(this)
      }, x(yr, Te), x(gr, Ie), x(vr, pr), vr.prototype.va = function () {
        this.a.dispatchEvent("a")
      }, vr.prototype.ua = function (t) {
        this.a.dispatchEvent(new yr(t))
      }, vr.prototype.ta = function (t) {
        this.a.dispatchEvent(new gr(t))
      }, vr.prototype.sa = function () {
        this.a.dispatchEvent("b")
      };
      var br = L(function (t, e) {
        function n() {
        }

        n.prototype = t.prototype;
        var r = new n;
        return t.apply(r, Array.prototype.slice.call(arguments, 1)), r
      }, dr);
      dr.prototype.createWebChannel = dr.prototype.a, mr.prototype.send = mr.prototype.Xa, mr.prototype.open = mr.prototype.Wa, mr.prototype.close = mr.prototype.close, ye.NO_ERROR = 0, ye.TIMEOUT = 8, ye.HTTP_ERROR = 6, ge.COMPLETE = "complete", (we.EventType = Se).OPEN = "a", Se.CLOSE = "b", Se.ERROR = "c", Se.MESSAGE = "d", Bt.prototype.listen = Bt.prototype.Aa, Fn.prototype.listenOnce = Fn.prototype.Ba, Fn.prototype.getLastError = Fn.prototype.Ya, Fn.prototype.getLastErrorCode = Fn.prototype.ya, Fn.prototype.getStatus = Fn.prototype.T, Fn.prototype.getStatusText = Fn.prototype.za, Fn.prototype.getResponseJson = Fn.prototype.Va, Fn.prototype.getResponseText = Fn.prototype.aa, Fn.prototype.send = Fn.prototype.ca;
      var wr, Er, Sr = {createWebChannelTransport: br, ErrorCode: ye, EventType: ge, WebChannel: we, XhrIo: Fn},
        Tr = Sr.createWebChannelTransport, Ir = Sr.ErrorCode, Cr = Sr.EventType, Dr = Sr.WebChannel, Nr = Sr.XhrIo,
        Ar = Ld.SDK_VERSION, kr = new r("@firebase/firestore");

      function Rr() {
        return kr.logLevel === o.DEBUG ? wr.DEBUG : kr.logLevel === o.SILENT ? wr.SILENT : wr.ERROR
      }

      function Mr(t) {
        switch (t) {
          case wr.DEBUG:
            kr.logLevel = o.DEBUG;
            break;
          case wr.ERROR:
            kr.logLevel = o.ERROR;
            break;
          case wr.SILENT:
            kr.logLevel = o.SILENT;
            break;
          default:
            kr.error("Firestore (" + Ar + "): Invalid value passed to `setLogLevel`")
        }
      }

      function _r(t, e) {
        for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
        if (kr.logLevel <= o.DEBUG) {
          var i = n.map(Lr);
          kr.debug.apply(kr, ["Firestore (" + Ar + ") [" + t + "]: " + e].concat(i))
        }
      }

      function Or(t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        if (kr.logLevel <= o.ERROR) {
          var r = e.map(Lr);
          kr.error.apply(kr, ["Firestore (" + Ar + "): " + t].concat(r))
        }
      }

      function Lr(e) {
        if ("string" == typeof e) return e;
        var t = qr.getPlatform();
        try {
          return t.formatJSON(e)
        } catch (t) {
          return e
        }
      }

      function Pr(t) {
        var e = "FIRESTORE (" + Ar + ") INTERNAL ASSERTION FAILED: " + t;
        throw Or(e), new Error(e)
      }

      function xr(t, e) {
        t || Pr(e)
      }

      (Er = wr = wr || {})[Er.DEBUG = 0] = "DEBUG", Er[Er.ERROR = 1] = "ERROR", Er[Er.SILENT = 2] = "SILENT";
      var qr = (Fr.setPlatform = function (t) {
        Fr.platform && Pr("Platform already defined"), Fr.platform = t
      }, Fr.getPlatform = function () {
        return Fr.platform || Pr("Platform not set"), Fr.platform
      }, Fr);

      function Fr() {
      }

      function Vr() {
        return qr.getPlatform().emptyByteString
      }

      var Br, Ur = {
        OK: "ok",
        CANCELLED: "cancelled",
        UNKNOWN: "unknown",
        INVALID_ARGUMENT: "invalid-argument",
        DEADLINE_EXCEEDED: "deadline-exceeded",
        NOT_FOUND: "not-found",
        ALREADY_EXISTS: "already-exists",
        PERMISSION_DENIED: "permission-denied",
        UNAUTHENTICATED: "unauthenticated",
        RESOURCE_EXHAUSTED: "resource-exhausted",
        FAILED_PRECONDITION: "failed-precondition",
        ABORTED: "aborted",
        OUT_OF_RANGE: "out-of-range",
        UNIMPLEMENTED: "unimplemented",
        INTERNAL: "internal",
        UNAVAILABLE: "unavailable",
        DATA_LOSS: "data-loss"
      }, Qr = (s(Kr, Br = Error), Kr);

      function Kr(t, e) {
        var n = Br.call(this, e) || this;
        return n.code = t, n.message = e, n.name = "FirebaseError", n.toString = function () {
          return n.name + ": [code=" + n.code + "]: " + n.message
        }, n
      }

      function Gr(t, e) {
        function n() {
          var t = "This constructor is private.";
          throw e && (t += " ", t += e), new Qr(Ur.INVALID_ARGUMENT, t)
        }

        for (var r in n.prototype = t.prototype, t) t.hasOwnProperty(r) && (n[r] = t[r]);
        return n
      }

      function jr(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
      }

      function Wr(t, e) {
        return void 0 !== t ? t : e
      }

      function zr(t, e) {
        for (var n in t) if (Object.prototype.hasOwnProperty.call(t, n)) {
          var r = Number(n);
          isNaN(r) || e(r, t[n])
        }
      }

      function Hr(t, e) {
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n])
      }

      function Yr(t) {
        for (var e in xr(null != t && "object" == typeof t, "isEmpty() expects object parameter."), t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
        return !0
      }

      function Xr(t, e) {
        if (0 !== e.length) throw new Qr(Ur.INVALID_ARGUMENT, "Function " + t + "() does not support arguments, but was called with " + pi(e.length, "argument") + ".")
      }

      function Jr(t, e, n) {
        if (e.length !== n) throw new Qr(Ur.INVALID_ARGUMENT, "Function " + t + "() requires " + pi(n, "argument") + ", but was called with " + pi(e.length, "argument") + ".")
      }

      function $r(t, e, n) {
        if (e.length < n) throw new Qr(Ur.INVALID_ARGUMENT, "Function " + t + "() requires at least " + pi(n, "argument") + ", but was called with " + pi(e.length, "argument") + ".")
      }

      function Zr(t, e, n, r) {
        if (e.length < n || e.length > r) throw new Qr(Ur.INVALID_ARGUMENT, "Function " + t + "() requires between " + n + " and " + r + " arguments, but was called with " + pi(e.length, "argument") + ".")
      }

      function ti(t, e, n, r) {
        ai(t, e, fi(n) + " argument", r)
      }

      function ei(t, e, n, r) {
        void 0 !== r && ti(t, e, n, r)
      }

      function ni(t, e, n, r) {
        ai(t, e, n + " option", r)
      }

      function ri(t, e, n, r) {
        void 0 !== r && ni(t, e, n, r)
      }

      function ii(t, e, n, r, i) {
        void 0 !== r && function (t, e, n, r, i) {
          if (!(r instanceof Array)) throw new Qr(Ur.INVALID_ARGUMENT, "Function " + t + "() requires its " + e + " option to be an array, but it was: " + ui(r));
          for (var o = 0; o < r.length; ++o) if (!i(r[o])) throw new Qr(Ur.INVALID_ARGUMENT, "Function " + t + "() requires all " + e + " elements to be " + n + ", but the value at index " + o + " was: " + ui(r[o]))
        }(t, e, n, r, i)
      }

      function oi(t, e, n, r, i) {
        void 0 !== r && function (t, e, n, r, i) {
          for (var o = [], a = 0, s = i; a < s.length; a++) {
            var u = s[a];
            if (u === r) return;
            o.push(ui(u))
          }
          var c = ui(r);
          throw new Qr(Ur.INVALID_ARGUMENT, "Invalid value " + c + " provided to function " + t + '() for option "' + n + '". Acceptable values: ' + o.join(", "))
        }(t, 0, n, r, i)
      }

      function ai(t, e, n, r) {
        if (!("object" === e ? si(r) : "non-empty string" === e ? "string" == typeof r && "" !== r : typeof r === e)) {
          var i = ui(r);
          throw new Qr(Ur.INVALID_ARGUMENT, "Function " + t + "() requires its " + n + " to be of type " + e + ", but it was: " + i)
        }
      }

      function si(t) {
        return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t))
      }

      function ui(t) {
        if (void 0 === t) return "undefined";
        if (null === t) return "null";
        if ("string" == typeof t) return 20 < t.length && (t = t.substring(0, 20) + "..."), JSON.stringify(t);
        if ("number" == typeof t || "boolean" == typeof t) return "" + t;
        if ("object" != typeof t) return "function" == typeof t ? "a function" : Pr("Unknown wrong type: " + typeof t);
        if (t instanceof Array) return "an array";
        var e = function (t) {
          if (t.constructor) {
            var e = /function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());
            if (e && 1 < e.length) return e[1]
          }
          return null
        }(t);
        return e ? "a custom " + e + " object" : "an object"
      }

      function ci(t, e, n) {
        if (void 0 === n) throw new Qr(Ur.INVALID_ARGUMENT, "Function " + t + "() requires a valid " + fi(e) + " argument, but it was undefined.")
      }

      function hi(n, t, r) {
        Hr(t, function (t, e) {
          if (r.indexOf(t) < 0) throw new Qr(Ur.INVALID_ARGUMENT, "Unknown option '" + t + "' passed to function " + n + "(). Available options: " + r.join(", "))
        })
      }

      function li(t, e, n, r) {
        var i = ui(r);
        return new Qr(Ur.INVALID_ARGUMENT, "Function " + t + "() requires its " + fi(n) + " argument to be a " + e + ", but it was: " + i)
      }

      function fi(t) {
        switch (t) {
          case 1:
            return "first";
          case 2:
            return "second";
          case 3:
            return "third";
          default:
            return t + "th"
        }
      }

      function pi(t, e) {
        return t + " " + e + (1 === t ? "" : "s")
      }

      var di = (mi.newId = function () {
        for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = "", n = 0; n < 20; n++) e += t.charAt(Math.floor(Math.random() * t.length));
        return xr(20 === e.length, "Invalid auto ID: " + e), e
      }, mi);

      function mi() {
      }

      function yi(t, e) {
        return t < e ? -1 : e < t ? 1 : 0
      }

      function gi(t, e) {
        if (t.length !== e.length) return !1;
        for (var n = 0; n < t.length; n++) if (!t[n].isEqual(e[n])) return !1;
        return !0
      }

      function vi(t) {
        return t + "\0"
      }

      function bi() {
        if ("undefined" == typeof Uint8Array) throw new Qr(Ur.UNIMPLEMENTED, "Uint8Arrays are not available in this environment.")
      }

      function wi() {
        if (!qr.getPlatform().base64Available) throw new Qr(Ur.UNIMPLEMENTED, "Blobs are unavailable in Firestore in this environment.")
      }

      var Ei = (Si.fromBase64String = function (t) {
        Jr("Blob.fromBase64String", arguments, 1), ti("Blob.fromBase64String", "string", 1, t), wi();
        try {
          return new Si(qr.getPlatform().atob(t))
        } catch (t) {
          throw new Qr(Ur.INVALID_ARGUMENT, "Failed to construct Blob from Base64 string: " + t)
        }
      }, Si.fromUint8Array = function (t) {
        if (Jr("Blob.fromUint8Array", arguments, 1), bi(), !(t instanceof Uint8Array)) throw li("Blob.fromUint8Array", "Uint8Array", 1, t);
        return new Si(Array.prototype.map.call(t, function (t) {
          return String.fromCharCode(t)
        }).join(""))
      }, Si.prototype.toBase64 = function () {
        return Jr("Blob.toBase64", arguments, 0), wi(), qr.getPlatform().btoa(this._binaryString)
      }, Si.prototype.toUint8Array = function () {
        Jr("Blob.toUint8Array", arguments, 0), bi();
        for (var t = new Uint8Array(this._binaryString.length), e = 0; e < this._binaryString.length; e++) t[e] = this._binaryString.charCodeAt(e);
        return t
      }, Si.prototype.toString = function () {
        return "Blob(base64: " + this.toBase64() + ")"
      }, Si.prototype.isEqual = function (t) {
        return this._binaryString === t._binaryString
      }, Si.prototype._compareTo = function (t) {
        return yi(this._binaryString, t._binaryString)
      }, Si);

      function Si(t) {
        wi(), this._binaryString = t
      }

      var Ti = Gr(Ei, "Use Blob.fromUint8Array() or Blob.fromBase64String() instead."), Ii = function (t, e, n, r, i) {
        this.databaseId = t, this.persistenceKey = e, this.host = n, this.ssl = r, this.forceLongPolling = i
      }, Ci = "(default)", Di = (Object.defineProperty(Ni.prototype, "isDefaultDatabase", {
        get: function () {
          return this.database === Ci
        }, enumerable: !0, configurable: !0
      }), Ni.prototype.isEqual = function (t) {
        return t instanceof Ni && t.projectId === this.projectId && t.database === this.database
      }, Ni.prototype.compareTo = function (t) {
        return yi(this.projectId, t.projectId) || yi(this.database, t.database)
      }, Ni);

      function Ni(t, e) {
        this.projectId = t, this.database = e || Ci
      }

      var Ai = (ki.prototype.setPreviousValue = function (t) {
        return this.previousValue = Math.max(t, this.previousValue), this.previousValue
      }, ki.prototype.next = function () {
        var t = ++this.previousValue;
        return this.writeNewSequenceNumber && this.writeNewSequenceNumber(t), t
      }, ki.INVALID = -1, ki);

      function ki(t, e) {
        var n = this;
        this.previousValue = t, e && (e.sequenceNumberHandler = function (t) {
          return n.setPreviousValue(t)
        }, this.writeNewSequenceNumber = function (t) {
          return e.writeSequenceNumber(t)
        })
      }

      var Ri = "__name__", Mi = (_i.prototype.init = function (t, e, n) {
        void 0 === e ? e = 0 : e > t.length && Pr("offset " + e + " out of range " + t.length), void 0 === n ? n = t.length - e : n > t.length - e && Pr("length " + n + " out of range " + (t.length - e)), this.segments = t, this.offset = e, this.len = n
      }, _i.prototype.construct = function (t, e, n) {
        var r = Object.create(Object.getPrototypeOf(this));
        return r.init(t, e, n), r
      }, Object.defineProperty(_i.prototype, "length", {
        get: function () {
          return this.len
        }, enumerable: !0, configurable: !0
      }), _i.prototype.isEqual = function (t) {
        return 0 === _i.comparator(this, t)
      }, _i.prototype.child = function (t) {
        var e = this.segments.slice(this.offset, this.limit());
        return t instanceof _i ? t.forEach(function (t) {
          e.push(t)
        }) : "string" == typeof t ? e.push(t) : Pr("Unknown parameter type for Path.child(): " + t), this.construct(e)
      }, _i.prototype.limit = function () {
        return this.offset + this.length
      }, _i.prototype.popFirst = function (t) {
        return t = void 0 === t ? 1 : t, xr(this.length >= t, "Can't call popFirst() with less segments"), this.construct(this.segments, this.offset + t, this.length - t)
      }, _i.prototype.popLast = function () {
        return xr(!this.isEmpty(), "Can't call popLast() on empty path"), this.construct(this.segments, this.offset, this.length - 1)
      }, _i.prototype.firstSegment = function () {
        return xr(!this.isEmpty(), "Can't call firstSegment() on empty path"), this.segments[this.offset]
      }, _i.prototype.lastSegment = function () {
        return this.get(this.length - 1)
      }, _i.prototype.get = function (t) {
        return xr(t < this.length, "Index out of range"), this.segments[this.offset + t]
      }, _i.prototype.isEmpty = function () {
        return 0 === this.length
      }, _i.prototype.isPrefixOf = function (t) {
        if (t.length < this.length) return !1;
        for (var e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0
      }, _i.prototype.isImmediateParentOf = function (t) {
        if (this.length + 1 !== t.length) return !1;
        for (var e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0
      }, _i.prototype.forEach = function (t) {
        for (var e = this.offset, n = this.limit(); e < n; e++) t(this.segments[e])
      }, _i.prototype.toArray = function () {
        return this.segments.slice(this.offset, this.limit())
      }, _i.comparator = function (t, e) {
        for (var n = Math.min(t.length, e.length), r = 0; r < n; r++) {
          var i = t.get(r), o = e.get(r);
          if (i < o) return -1;
          if (o < i) return 1
        }
        return t.length < e.length ? -1 : t.length > e.length ? 1 : 0
      }, _i);

      function _i(t, e, n) {
        this.init(t, e, n)
      }

      var Oi, Li = (s(Pi, Oi = Mi), Pi.prototype.canonicalString = function () {
        return this.toArray().join("/")
      }, Pi.prototype.toString = function () {
        return this.canonicalString()
      }, Pi.fromString = function (t) {
        if (0 <= t.indexOf("//")) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid path (" + t + "). Paths must not contain // in them.");
        return new Pi(t.split("/").filter(function (t) {
          return 0 < t.length
        }))
      }, Pi.EMPTY_PATH = new Pi([]), Pi);

      function Pi() {
        return null !== Oi && Oi.apply(this, arguments) || this
      }

      var xi, qi = /^[_a-zA-Z][_a-zA-Z0-9]*$/, Fi = (s(Vi, xi = Mi), Vi.isValidIdentifier = function (t) {
        return qi.test(t)
      }, Vi.prototype.canonicalString = function () {
        return this.toArray().map(function (t) {
          return t = t.replace("\\", "\\\\").replace("`", "\\`"), Vi.isValidIdentifier(t) || (t = "`" + t + "`"), t
        }).join(".")
      }, Vi.prototype.toString = function () {
        return this.canonicalString()
      }, Vi.prototype.isKeyField = function () {
        return 1 === this.length && this.get(0) === Ri
      }, Vi.keyField = function () {
        return new Vi([Ri])
      }, Vi.fromServerFormat = function (t) {
        for (var e = [], n = "", r = 0, i = function () {
          if (0 === n.length) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not be empty, begin with '.', end with '.', or contain '..'");
          e.push(n), n = ""
        }, o = !1; r < t.length;) {
          var a = t[r];
          if ("\\" === a) {
            if (r + 1 === t.length) throw new Qr(Ur.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
            var s = t[r + 1];
            if ("\\" !== s && "." !== s && "`" !== s) throw new Qr(Ur.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
            n += s, r += 2
          } else "`" === a ? o = !o : "." !== a || o ? n += a : i(), r++
        }
        if (i(), o) throw new Qr(Ur.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
        return new Vi(e)
      }, Vi.EMPTY_PATH = new Vi([]), Vi);

      function Vi() {
        return null !== xi && xi.apply(this, arguments) || this
      }

      var Bi = (Ui.prototype.hasCollectionId = function (t) {
        return 2 <= this.path.length && this.path.get(this.path.length - 2) === t
      }, Ui.prototype.isEqual = function (t) {
        return null !== t && 0 === Li.comparator(this.path, t.path)
      }, Ui.prototype.toString = function () {
        return this.path.toString()
      }, Ui.comparator = function (t, e) {
        return Li.comparator(t.path, e.path)
      }, Ui.isDocumentKey = function (t) {
        return t.length % 2 == 0
      }, Ui.fromSegments = function (t) {
        return new Ui(new Li(t.slice()))
      }, Ui.fromPathString = function (t) {
        return new Ui(Li.fromString(t))
      }, Ui.EMPTY = new Ui(new Li([])), Ui);

      function Ui(t) {
        this.path = t, xr(Ui.isDocumentKey(t), "Invalid DocumentKey with an odd number of segments: " + t.toArray().join("/"))
      }

      var Qi, Ki, Gi = function () {
        var n = this;
        this.promise = new Promise(function (t, e) {
          n.resolve = t, n.reject = e
        })
      };
      (Ki = Qi = Qi || {}).All = "all", Ki.ListenStreamIdle = "listen_stream_idle", Ki.ListenStreamConnectionBackoff = "listen_stream_connection_backoff", Ki.WriteStreamIdle = "write_stream_idle", Ki.WriteStreamConnectionBackoff = "write_stream_connection_backoff", Ki.OnlineStateTimeout = "online_state_timeout", Ki.ClientMetadataRefresh = "client_metadata_refresh", Ki.LruGarbageCollection = "lru_garbage_collection";
      var ji = (Wi.createAndSchedule = function (t, e, n, r, i) {
        var o = new Wi(t, e, Date.now() + n, r, i);
        return o.start(n), o
      }, Wi.prototype.start = function (t) {
        var e = this;
        this.timerHandle = setTimeout(function () {
          return e.handleDelayElapsed()
        }, t)
      }, Wi.prototype.skipDelay = function () {
        return this.handleDelayElapsed()
      }, Wi.prototype.cancel = function (t) {
        null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new Qr(Ur.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))))
      }, Wi.prototype.handleDelayElapsed = function () {
        var e = this;
        this.asyncQueue.enqueueAndForget(function () {
          return null !== e.timerHandle ? (e.clearTimeout(), e.op().then(function (t) {
            return e.deferred.resolve(t)
          })) : Promise.resolve()
        })
      }, Wi.prototype.clearTimeout = function () {
        null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null)
      }, Wi);

      function Wi(t, e, n, r, i) {
        this.asyncQueue = t, this.timerId = e, this.targetTimeMs = n, this.op = r, this.removalCallback = i, this.deferred = new Gi, this.then = this.deferred.promise.then.bind(this.deferred.promise), this.catch = this.deferred.promise.catch.bind(this.deferred.promise), this.deferred.promise.catch(function (t) {
        })
      }

      var zi = (Hi.prototype.enqueueAndForget = function (t) {
        this.enqueue(t)
      }, Hi.prototype.enqueue = function (t) {
        var n = this;
        this.verifyNotFailed();
        var e = this.tail.then(function () {
          return n.operationInProgress = !0, t().catch(function (t) {
            n.failure = t, n.operationInProgress = !1;
            var e = t.stack || t.message || "";
            throw Or("INTERNAL UNHANDLED ERROR: ", e), e.indexOf("Firestore Test Simulated Error") < 0 && setTimeout(function () {
              throw t
            }, 0), t
          }).then(function (t) {
            return n.operationInProgress = !1, t
          })
        });
        return this.tail = e
      }, Hi.prototype.enqueueAfterDelay = function (t, e, n) {
        var r = this;
        this.verifyNotFailed(), xr(0 <= e, "Attempted to schedule an operation with a negative delay of " + e), xr(!this.containsDelayedOperation(t), "Attempted to schedule multiple operations with timer id " + t + ".");
        var i = ji.createAndSchedule(this, t, e, n, function (t) {
          return r.removeDelayedOperation(t)
        });
        return this.delayedOperations.push(i), i
      }, Hi.prototype.verifyNotFailed = function () {
        this.failure && Pr("AsyncQueue is already failed: " + (this.failure.stack || this.failure.message))
      }, Hi.prototype.verifyOperationInProgress = function () {
        xr(this.operationInProgress, "verifyOpInProgress() called when no op in progress on this queue.")
      }, Hi.prototype.drain = function () {
        return this.enqueue(function () {
          return Promise.resolve()
        })
      }, Hi.prototype.containsDelayedOperation = function (t) {
        for (var e = 0, n = this.delayedOperations; e < n.length; e++) if (n[e].timerId === t) return !0;
        return !1
      }, Hi.prototype.runDelayedOperationsEarly = function (r) {
        var i = this;
        return this.drain().then(function () {
          xr(r === Qi.All || i.containsDelayedOperation(r), "Attempted to drain to missing operation " + r), i.delayedOperations.sort(function (t, e) {
            return t.targetTimeMs - e.targetTimeMs
          });
          for (var t = 0, e = i.delayedOperations; t < e.length; t++) {
            var n = e[t];
            if (n.skipDelay(), r !== Qi.All && n.timerId === r) break
          }
          return i.drain()
        })
      }, Hi.prototype.removeDelayedOperation = function (t) {
        var e = this.delayedOperations.indexOf(t);
        xr(0 <= e, "Delayed operation not found."), this.delayedOperations.splice(e, 1)
      }, Hi);

      function Hi() {
        this.tail = Promise.resolve(), this.delayedOperations = [], this.operationInProgress = !1
      }

      var Yi = "", Xi = "", Ji = "", $i = "";

      function Zi(t) {
        for (var e = "", n = 0; n < t.length; n++) 0 < e.length && (e = eo(e)), e = to(t.get(n), e);
        return eo(e)
      }

      function to(t, e) {
        for (var n = e, r = t.length, i = 0; i < r; i++) {
          var o = t.charAt(i);
          switch (o) {
            case"\0":
              n += Yi + Ji;
              break;
            case Yi:
              n += Yi + $i;
              break;
            default:
              n += o
          }
        }
        return n
      }

      function eo(t) {
        return t + Yi + Xi
      }

      function no(t) {
        var e = t.length;
        if (xr(2 <= e, "Invalid path " + t), 2 === e) return xr(t.charAt(0) === Yi && t.charAt(1) === Xi, "Non-empty path " + t + " had length 2"), Li.EMPTY_PATH;
        for (var n = e - 2, r = [], i = "", o = 0; o < e;) {
          var a = t.indexOf(Yi, o);
          switch ((a < 0 || n < a) && Pr('Invalid encoded resource path: "' + t + '"'), t.charAt(a + 1)) {
            case Xi:
              var s = t.substring(o, a), u = void 0;
              0 === i.length ? u = s : (u = i += s, i = ""), r.push(u);
              break;
            case Ji:
              i += t.substring(o, a), i += "\0";
              break;
            case $i:
              i += t.substring(o, a + 1);
              break;
            default:
              Pr('Invalid encoded resource path: "' + t + '"')
          }
          o = a + 2
        }
        return new Li(r)
      }

      var ro = (io.now = function () {
        return io.fromMillis(Date.now())
      }, io.fromDate = function (t) {
        return io.fromMillis(t.getTime())
      }, io.fromMillis = function (t) {
        var e = Math.floor(t / 1e3);
        return new io(e, 1e6 * (t - 1e3 * e))
      }, io.prototype.toDate = function () {
        return new Date(this.toMillis())
      }, io.prototype.toMillis = function () {
        return 1e3 * this.seconds + this.nanoseconds / 1e6
      }, io.prototype._compareTo = function (t) {
        return this.seconds === t.seconds ? yi(this.nanoseconds, t.nanoseconds) : yi(this.seconds, t.seconds)
      }, io.prototype.isEqual = function (t) {
        return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds
      }, io.prototype.toString = function () {
        return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")"
      }, io);

      function io(t, e) {
        if (this.seconds = t, (this.nanoseconds = e) < 0) throw new Qr(Ur.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (1e9 <= e) throw new Qr(Ur.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (t < -62135596800) throw new Qr(Ur.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        if (253402300800 <= t) throw new Qr(Ur.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t)
      }

      var oo = (ao.fromMicroseconds = function (t) {
        var e = Math.floor(t / 1e6);
        return new ao(new ro(e, t % 1e6 * 1e3))
      }, ao.fromTimestamp = function (t) {
        return new ao(t)
      }, ao.forDeletedDoc = function () {
        return ao.MIN
      }, ao.prototype.compareTo = function (t) {
        return this.timestamp._compareTo(t.timestamp)
      }, ao.prototype.isEqual = function (t) {
        return this.timestamp.isEqual(t.timestamp)
      }, ao.prototype.toMicroseconds = function () {
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3
      }, ao.prototype.toString = function () {
        return "SnapshotVersion(" + this.timestamp.toString() + ")"
      }, ao.prototype.toTimestamp = function () {
        return this.timestamp
      }, ao.MIN = new ao(new ro(0, 0)), ao);

      function ao(t) {
        this.timestamp = t
      }

      var so = (uo.prototype.insert = function (t, e) {
        return new uo(this.comparator, this.root.insert(t, e, this.comparator).copy(null, null, lo.BLACK, null, null))
      }, uo.prototype.remove = function (t) {
        return new uo(this.comparator, this.root.remove(t, this.comparator).copy(null, null, lo.BLACK, null, null))
      }, uo.prototype.get = function (t) {
        for (var e = this.root; !e.isEmpty();) {
          var n = this.comparator(t, e.key);
          if (0 === n) return e.value;
          n < 0 ? e = e.left : 0 < n && (e = e.right)
        }
        return null
      }, uo.prototype.indexOf = function (t) {
        for (var e = 0, n = this.root; !n.isEmpty();) {
          var r = this.comparator(t, n.key);
          if (0 === r) return e + n.left.size;
          n = r < 0 ? n.left : (e += n.left.size + 1, n.right)
        }
        return -1
      }, uo.prototype.isEmpty = function () {
        return this.root.isEmpty()
      }, Object.defineProperty(uo.prototype, "size", {
        get: function () {
          return this.root.size
        }, enumerable: !0, configurable: !0
      }), uo.prototype.minKey = function () {
        return this.root.minKey()
      }, uo.prototype.maxKey = function () {
        return this.root.maxKey()
      }, uo.prototype.inorderTraversal = function (t) {
        return this.root.inorderTraversal(t)
      }, uo.prototype.forEach = function (n) {
        this.inorderTraversal(function (t, e) {
          return n(t, e), !1
        })
      }, uo.prototype.toString = function () {
        var n = [];
        return this.inorderTraversal(function (t, e) {
          return n.push(t + ":" + e), !1
        }), "{" + n.join(", ") + "}"
      }, uo.prototype.reverseTraversal = function (t) {
        return this.root.reverseTraversal(t)
      }, uo.prototype.getIterator = function () {
        return new co(this.root, null, this.comparator, !1)
      }, uo.prototype.getIteratorFrom = function (t) {
        return new co(this.root, t, this.comparator, !1)
      }, uo.prototype.getReverseIterator = function () {
        return new co(this.root, null, this.comparator, !0)
      }, uo.prototype.getReverseIteratorFrom = function (t) {
        return new co(this.root, t, this.comparator, !0)
      }, uo);

      function uo(t, e) {
        this.comparator = t, this.root = e || lo.EMPTY
      }

      var co = (ho.prototype.getNext = function () {
        xr(0 < this.nodeStack.length, "getNext() called on iterator when hasNext() is false.");
        var t = this.nodeStack.pop(), e = {key: t.key, value: t.value};
        if (this.isReverse) for (t = t.left; !t.isEmpty();) this.nodeStack.push(t), t = t.right; else for (t = t.right; !t.isEmpty();) this.nodeStack.push(t), t = t.left;
        return e
      }, ho.prototype.hasNext = function () {
        return 0 < this.nodeStack.length
      }, ho.prototype.peek = function () {
        if (0 === this.nodeStack.length) return null;
        var t = this.nodeStack[this.nodeStack.length - 1];
        return {key: t.key, value: t.value}
      }, ho);

      function ho(t, e, n, r) {
        this.isReverse = r, this.nodeStack = [];
        for (var i = 1; !t.isEmpty();) if (i = e ? n(t.key, e) : 1, r && (i *= -1), i < 0) t = this.isReverse ? t.left : t.right; else {
          if (0 === i) {
            this.nodeStack.push(t);
            break
          }
          this.nodeStack.push(t), t = this.isReverse ? t.right : t.left
        }
      }

      var lo = (fo.prototype.copy = function (t, e, n, r, i) {
        return new fo(null != t ? t : this.key, null != e ? e : this.value, null != n ? n : this.color, null != r ? r : this.left, null != i ? i : this.right)
      }, fo.prototype.isEmpty = function () {
        return !1
      }, fo.prototype.inorderTraversal = function (t) {
        return this.left.inorderTraversal(t) || t(this.key, this.value) || this.right.inorderTraversal(t)
      }, fo.prototype.reverseTraversal = function (t) {
        return this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t)
      }, fo.prototype.min = function () {
        return this.left.isEmpty() ? this : this.left.min()
      }, fo.prototype.minKey = function () {
        return this.min().key
      }, fo.prototype.maxKey = function () {
        return this.right.isEmpty() ? this.key : this.right.maxKey()
      }, fo.prototype.insert = function (t, e, n) {
        var r = this, i = n(t, r.key);
        return (r = i < 0 ? r.copy(null, null, null, r.left.insert(t, e, n), null) : 0 === i ? r.copy(null, e, null, null, null) : r.copy(null, null, null, null, r.right.insert(t, e, n))).fixUp()
      }, fo.prototype.removeMin = function () {
        if (this.left.isEmpty()) return fo.EMPTY;
        var t = this;
        return t.left.isRed() || t.left.left.isRed() || (t = t.moveRedLeft()), (t = t.copy(null, null, null, t.left.removeMin(), null)).fixUp()
      }, fo.prototype.remove = function (t, e) {
        var n, r = this;
        if (e(t, r.key) < 0) r.left.isEmpty() || r.left.isRed() || r.left.left.isRed() || (r = r.moveRedLeft()), r = r.copy(null, null, null, r.left.remove(t, e), null); else {
          if (r.left.isRed() && (r = r.rotateRight()), r.right.isEmpty() || r.right.isRed() || r.right.left.isRed() || (r = r.moveRedRight()), 0 === e(t, r.key)) {
            if (r.right.isEmpty()) return fo.EMPTY;
            n = r.right.min(), r = r.copy(n.key, n.value, null, null, r.right.removeMin())
          }
          r = r.copy(null, null, null, null, r.right.remove(t, e))
        }
        return r.fixUp()
      }, fo.prototype.isRed = function () {
        return this.color
      }, fo.prototype.fixUp = function () {
        var t = this;
        return t.right.isRed() && !t.left.isRed() && (t = t.rotateLeft()), t.left.isRed() && t.left.left.isRed() && (t = t.rotateRight()), t.left.isRed() && t.right.isRed() && (t = t.colorFlip()), t
      }, fo.prototype.moveRedLeft = function () {
        var t = this.colorFlip();
        return t.right.left.isRed() && (t = (t = (t = t.copy(null, null, null, null, t.right.rotateRight())).rotateLeft()).colorFlip()), t
      }, fo.prototype.moveRedRight = function () {
        var t = this.colorFlip();
        return t.left.left.isRed() && (t = (t = t.rotateRight()).colorFlip()), t
      }, fo.prototype.rotateLeft = function () {
        var t = this.copy(null, null, fo.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, t, null)
      }, fo.prototype.rotateRight = function () {
        var t = this.copy(null, null, fo.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, t)
      }, fo.prototype.colorFlip = function () {
        var t = this.left.copy(null, null, !this.left.color, null, null),
          e = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, t, e)
      }, fo.prototype.checkMaxDepth = function () {
        var t = this.check();
        return Math.pow(2, t) <= this.size + 1
      }, fo.prototype.check = function () {
        if (this.isRed() && this.left.isRed()) throw Pr("Red node has red child(" + this.key + "," + this.value + ")");
        if (this.right.isRed()) throw Pr("Right child of (" + this.key + "," + this.value + ") is red");
        var t = this.left.check();
        if (t !== this.right.check()) throw Pr("Black depths differ");
        return t + (this.isRed() ? 0 : 1)
      }, fo.EMPTY = null, fo.RED = !0, fo.BLACK = !1, fo);

      function fo(t, e, n, r, i) {
        this.key = t, this.value = e, this.color = null != n ? n : fo.RED, this.left = null != r ? r : fo.EMPTY, this.right = null != i ? i : fo.EMPTY, this.size = this.left.size + 1 + this.right.size
      }

      var po = (mo.prototype.copy = function (t, e, n, r, i) {
        return this
      }, mo.prototype.insert = function (t, e, n) {
        return new lo(t, e)
      }, mo.prototype.remove = function (t, e) {
        return this
      }, mo.prototype.isEmpty = function () {
        return !0
      }, mo.prototype.inorderTraversal = function (t) {
        return !1
      }, mo.prototype.reverseTraversal = function (t) {
        return !1
      }, mo.prototype.minKey = function () {
        return null
      }, mo.prototype.maxKey = function () {
        return null
      }, mo.prototype.isRed = function () {
        return !1
      }, mo.prototype.checkMaxDepth = function () {
        return !0
      }, mo.prototype.check = function () {
        return 0
      }, mo);

      function mo() {
        this.size = 0
      }

      lo.EMPTY = new po;
      var yo = (go.fromMapKeys = function (t) {
        var e = new go(t.comparator);
        return t.forEach(function (t) {
          e = e.add(t)
        }), e
      }, go.prototype.has = function (t) {
        return null !== this.data.get(t)
      }, go.prototype.first = function () {
        return this.data.minKey()
      }, go.prototype.last = function () {
        return this.data.maxKey()
      }, Object.defineProperty(go.prototype, "size", {
        get: function () {
          return this.data.size
        }, enumerable: !0, configurable: !0
      }), go.prototype.indexOf = function (t) {
        return this.data.indexOf(t)
      }, go.prototype.forEach = function (n) {
        this.data.inorderTraversal(function (t, e) {
          return n(t), !1
        })
      }, go.prototype.forEachInRange = function (t, e) {
        for (var n = this.data.getIteratorFrom(t[0]); n.hasNext();) {
          var r = n.getNext();
          if (0 <= this.comparator(r.key, t[1])) return;
          e(r.key)
        }
      }, go.prototype.forEachWhile = function (t, e) {
        var n;
        for (n = void 0 !== e ? this.data.getIteratorFrom(e) : this.data.getIterator(); n.hasNext();) if (!t(n.getNext().key)) return
      }, go.prototype.firstAfterOrEqual = function (t) {
        var e = this.data.getIteratorFrom(t);
        return e.hasNext() ? e.getNext().key : null
      }, go.prototype.getIterator = function () {
        return new vo(this.data.getIterator())
      }, go.prototype.getIteratorFrom = function (t) {
        return new vo(this.data.getIteratorFrom(t))
      }, go.prototype.add = function (t) {
        return this.copy(this.data.remove(t).insert(t, !0))
      }, go.prototype.delete = function (t) {
        return this.has(t) ? this.copy(this.data.remove(t)) : this
      }, go.prototype.isEmpty = function () {
        return this.data.isEmpty()
      }, go.prototype.unionWith = function (t) {
        var e = this;
        return t.forEach(function (t) {
          e = e.add(t)
        }), e
      }, go.prototype.isEqual = function (t) {
        if (!(t instanceof go)) return !1;
        if (this.size !== t.size) return !1;
        for (var e = this.data.getIterator(), n = t.data.getIterator(); e.hasNext();) {
          var r = e.getNext().key, i = n.getNext().key;
          if (0 !== this.comparator(r, i)) return !1
        }
        return !0
      }, go.prototype.toArray = function () {
        var e = [];
        return this.forEach(function (t) {
          e.push(t)
        }), e
      }, go.prototype.toString = function () {
        var e = [];
        return this.forEach(function (t) {
          return e.push(t)
        }), "SortedSet(" + e.toString() + ")"
      }, go.prototype.copy = function (t) {
        var e = new go(this.comparator);
        return e.data = t, e
      }, go);

      function go(t) {
        this.comparator = t, this.data = new so(this.comparator)
      }

      var vo = (bo.prototype.getNext = function () {
        return this.iter.getNext().key
      }, bo.prototype.hasNext = function () {
        return this.iter.hasNext()
      }, bo);

      function bo(t) {
        this.iter = t
      }

      var wo = new so(Bi.comparator);

      function Eo() {
        return wo
      }

      function So() {
        return Eo()
      }

      var To = new so(Bi.comparator);

      function Io() {
        return To
      }

      var Co = new so(Bi.comparator);

      function Do() {
        return Co
      }

      var No = new yo(Bi.comparator);

      function Ao() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        for (var n = No, r = 0, i = t; r < i.length; r++) {
          var o = i[r];
          n = n.add(o)
        }
        return n
      }

      var ko = new yo(yi);

      function Ro() {
        return ko
      }

      var Mo = (_o.prototype.applyToRemoteDocument = function (t, e, n) {
        e && xr(e.key.isEqual(t), "applyToRemoteDocument: key " + t + " should match maybeDoc key\n        " + e.key);
        var r = n.mutationResults;
        xr(r.length === this.mutations.length, "Mismatch between mutations length\n      (" + this.mutations.length + ") and mutation results length\n      (" + r.length + ").");
        for (var i = 0; i < this.mutations.length; i++) {
          var o = this.mutations[i];
          if (o.key.isEqual(t)) {
            var a = r[i];
            e = o.applyToRemoteDocument(e, a)
          }
        }
        return e
      }, _o.prototype.applyToLocalView = function (t, e) {
        e && xr(e.key.isEqual(t), "applyToLocalDocument: key " + t + " should match maybeDoc key\n        " + e.key);
        for (var n = 0, r = this.baseMutations; n < r.length; n++) (s = r[n]).key.isEqual(t) && (e = s.applyToLocalView(e, e, this.localWriteTime));
        for (var i = e, o = 0, a = this.mutations; o < a.length; o++) {
          var s;
          (s = a[o]).key.isEqual(t) && (e = s.applyToLocalView(e, i, this.localWriteTime))
        }
        return e
      }, _o.prototype.applyToLocalDocumentSet = function (n) {
        var r = this, i = n;
        return this.mutations.forEach(function (t) {
          var e = r.applyToLocalView(t.key, n.get(t.key));
          e && (i = i.insert(t.key, e))
        }), i
      }, _o.prototype.keys = function () {
        return this.mutations.reduce(function (t, e) {
          return t.add(e.key)
        }, Ao())
      }, _o.prototype.isEqual = function (t) {
        return this.batchId === t.batchId && gi(this.mutations, t.mutations) && gi(this.baseMutations, t.baseMutations)
      }, _o);

      function _o(t, e, n, r) {
        this.batchId = t, this.localWriteTime = e, this.baseMutations = n, xr(0 < (this.mutations = r).length, "Cannot create an empty mutation batch")
      }

      var Oo = (Lo.from = function (t, e, n, r) {
        xr(t.mutations.length === n.length, "Mutations sent " + t.mutations.length + " must equal results received " + n.length);
        for (var i = Do(), o = t.mutations, a = 0; a < o.length; a++) i = i.insert(o[a].key, n[a].version);
        return new Lo(t, e, n, r, i)
      }, Lo);

      function Lo(t, e, n, r, i) {
        this.batch = t, this.commitVersion = e, this.mutationResults = n, this.streamToken = r, this.docVersions = i
      }

      var Po = (xo.prototype.catch = function (t) {
        return this.next(void 0, t)
      }, xo.prototype.next = function (r, i) {
        var o = this;
        return this.callbackAttached && Pr("Called next() or catch() twice for PersistencePromise"), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(i, this.error) : this.wrapSuccess(r, this.result) : new xo(function (e, n) {
          o.nextCallback = function (t) {
            o.wrapSuccess(r, t).next(e, n)
          }, o.catchCallback = function (t) {
            o.wrapFailure(i, t).next(e, n)
          }
        })
      }, xo.prototype.toPromise = function () {
        var n = this;
        return new Promise(function (t, e) {
          n.next(t, e)
        })
      }, xo.prototype.wrapUserFunction = function (t) {
        try {
          var e = t();
          return e instanceof xo ? e : xo.resolve(e)
        } catch (t) {
          return xo.reject(t)
        }
      }, xo.prototype.wrapSuccess = function (t, e) {
        return t ? this.wrapUserFunction(function () {
          return t(e)
        }) : xo.resolve(e)
      }, xo.prototype.wrapFailure = function (t, e) {
        return t ? this.wrapUserFunction(function () {
          return t(e)
        }) : xo.reject(e)
      }, xo.resolve = function (n) {
        return new xo(function (t, e) {
          t(n)
        })
      }, xo.reject = function (n) {
        return new xo(function (t, e) {
          e(n)
        })
      }, xo.waitFor = function (t) {
        return new xo(function (e, n) {
          var r = 0, i = 0, o = !1;
          t.forEach(function (t) {
            ++r, t.next(function () {
              ++i, o && i === r && e()
            }, function (t) {
              return n(t)
            })
          }), o = !0, i === r && e()
        })
      }, xo.or = function (t) {
        for (var n = xo.resolve(!1), e = function (e) {
          n = n.next(function (t) {
            return t ? xo.resolve(t) : e()
          })
        }, r = 0, i = t; r < i.length; r++) e(i[r]);
        return n
      }, xo.forEach = function (t, n) {
        var r = this, i = [];
        return t.forEach(function (t, e) {
          i.push(n.call(r, t, e))
        }), this.waitFor(i)
      }, xo);

      function xo(t) {
        var e = this;
        this.nextCallback = null, this.catchCallback = null, this.result = void 0, this.error = void 0, this.isDone = !1, this.callbackAttached = !1, t(function (t) {
          e.isDone = !0, e.result = t, e.nextCallback && e.nextCallback(t)
        }, function (t) {
          e.isDone = !0, e.error = t, e.catchCallback && e.catchCallback(t)
        })
      }

      var qo = (Fo.forUser = function (t, e, n, r) {
        return xr("" !== t.uid, "UserID must not be an empty string."), new Fo(t.isAuthenticated() ? t.uid : "", e, n, r)
      }, Fo.prototype.checkEmpty = function (t) {
        var r = !0,
          e = IDBKeyRange.bound([this.userId, Number.NEGATIVE_INFINITY], [this.userId, Number.POSITIVE_INFINITY]);
        return Qo(t).iterate({index: Ja.userMutationsIndex, range: e}, function (t, e, n) {
          r = !1, n.done()
        }).next(function () {
          return r
        })
      }, Fo.prototype.acknowledgeBatch = function (e, t, n) {
        return this.getMutationQueueMetadata(e).next(function (t) {
          return t.lastStreamToken = Uo(n), Go(e).put(t)
        })
      }, Fo.prototype.getLastStreamToken = function (t) {
        return this.getMutationQueueMetadata(t).next(function (t) {
          return t.lastStreamToken
        })
      }, Fo.prototype.setLastStreamToken = function (e, n) {
        return this.getMutationQueueMetadata(e).next(function (t) {
          return t.lastStreamToken = Uo(n), Go(e).put(t)
        })
      }, Fo.prototype.addMutationBatch = function (u, c, h, l) {
        var f = this, p = Ko(u), d = Qo(u);
        return d.add({}).next(function (t) {
          xr("number" == typeof t, "Auto-generated key is not a number");
          var e = new Mo(t, c, h, l), n = f.serializer.toDbMutationBatch(f.userId, e);
          f.documentKeysByBatchId[t] = e.keys();
          for (var r = [], i = 0, o = l; i < o.length; i++) {
            var a = o[i], s = Za.key(f.userId, a.key.path, t);
            r.push(d.put(n)), r.push(p.put(s, Za.PLACEHOLDER)), r.push(f.indexManager.addToCollectionParentIndex(u, a.key.path.popLast()))
          }
          return Po.waitFor(r).next(function () {
            return e
          })
        })
      }, Fo.prototype.lookupMutationBatch = function (t, e) {
        var n = this;
        return Qo(t).get(e).next(function (t) {
          return t ? (xr(t.userId === n.userId, "Unexpected user '" + t.userId + "' for mutation batch " + e), n.serializer.fromDbMutationBatch(t)) : null
        })
      }, Fo.prototype.lookupMutationKeys = function (t, n) {
        var r = this;
        return this.documentKeysByBatchId[n] ? Po.resolve(this.documentKeysByBatchId[n]) : this.lookupMutationBatch(t, n).next(function (t) {
          if (t) {
            var e = t.keys();
            return r.documentKeysByBatchId[n] = e
          }
          return null
        })
      }, Fo.prototype.getNextMutationBatchAfterBatchId = function (t, e) {
        var r = this, i = e + 1, n = IDBKeyRange.lowerBound([this.userId, i]), o = null;
        return Qo(t).iterate({index: Ja.userMutationsIndex, range: n}, function (t, e, n) {
          e.userId === r.userId && (xr(e.batchId >= i, "Should have found mutation after " + i), o = r.serializer.fromDbMutationBatch(e)), n.done()
        }).next(function () {
          return o
        })
      }, Fo.prototype.getAllMutationBatches = function (t) {
        var e = this, n = IDBKeyRange.bound([this.userId, -1], [this.userId, Number.POSITIVE_INFINITY]);
        return Qo(t).loadAll(Ja.userMutationsIndex, n).next(function (t) {
          return t.map(function (t) {
            return e.serializer.fromDbMutationBatch(t)
          })
        })
      }, Fo.prototype.getAllMutationBatchesAffectingDocumentKey = function (s, u) {
        var c = this, t = Za.prefixForPath(this.userId, u.path), e = IDBKeyRange.lowerBound(t), h = [];
        return Ko(s).iterate({range: e}, function (e, t, n) {
          var r = e[0], i = e[1], o = e[2], a = no(i);
          if (r === c.userId && u.path.isEqual(a)) return Qo(s).get(o).next(function (t) {
            if (!t) throw Pr("Dangling document-mutation reference found: " + e + " which points to " + o);
            xr(t.userId === c.userId, "Unexpected user '" + t.userId + "' for mutation batch " + o), h.push(c.serializer.fromDbMutationBatch(t))
          });
          n.done()
        }).next(function () {
          return h
        })
      }, Fo.prototype.getAllMutationBatchesAffectingDocumentKeys = function (r, t) {
        var u = this, c = new yo(yi), i = [];
        return t.forEach(function (s) {
          var t = Za.prefixForPath(u.userId, s.path), e = IDBKeyRange.lowerBound(t),
            n = Ko(r).iterate({range: e}, function (t, e, n) {
              var r = t[0], i = t[1], o = t[2], a = no(i);
              r === u.userId && s.path.isEqual(a) ? c = c.add(o) : n.done()
            });
          i.push(n)
        }), Po.waitFor(i).next(function () {
          return u.lookupMutationBatches(r, c)
        })
      }, Fo.prototype.getAllMutationBatchesAffectingQuery = function (t, e) {
        var s = this;
        xr(!e.isDocumentQuery(), "Document queries shouldn't go down this path"), xr(!e.isCollectionGroupQuery(), "CollectionGroup queries should be handled in LocalDocumentsView");
        var u = e.path, c = u.length + 1, n = Za.prefixForPath(this.userId, u), r = IDBKeyRange.lowerBound(n),
          h = new yo(yi);
        return Ko(t).iterate({range: r}, function (t, e, n) {
          var r = t[0], i = t[1], o = t[2], a = no(i);
          r === s.userId && u.isPrefixOf(a) ? a.length === c && (h = h.add(o)) : n.done()
        }).next(function () {
          return s.lookupMutationBatches(t, h)
        })
      }, Fo.prototype.lookupMutationBatches = function (t, e) {
        var n = this, r = [], i = [];
        return e.forEach(function (e) {
          i.push(Qo(t).get(e).next(function (t) {
            if (null === t) throw Pr("Dangling document-mutation reference found, which points to " + e);
            xr(t.userId === n.userId, "Unexpected user '" + t.userId + "' for mutation batch " + e), r.push(n.serializer.fromDbMutationBatch(t))
          }))
        }), Po.waitFor(i).next(function () {
          return r
        })
      }, Fo.prototype.removeMutationBatch = function (e, n) {
        var r = this;
        return Bo(e.simpleDbTransaction, this.userId, n).next(function (t) {
          return r.removeCachedMutationKeys(n.batchId), Po.forEach(t, function (t) {
            return r.referenceDelegate.removeMutationReference(e, t)
          })
        })
      }, Fo.prototype.removeCachedMutationKeys = function (t) {
        delete this.documentKeysByBatchId[t]
      }, Fo.prototype.performConsistencyCheck = function (n) {
        var o = this;
        return this.checkEmpty(n).next(function (t) {
          if (!t) return Po.resolve();
          var e = IDBKeyRange.lowerBound(Za.prefixForUser(o.userId)), i = [];
          return Ko(n).iterate({range: e}, function (t, e, n) {
            if (t[0] === o.userId) {
              var r = no(t[1]);
              i.push(r)
            } else n.done()
          }).next(function () {
            xr(0 === i.length, "Document leak -- detected dangling mutation references when queue is empty. Dangling keys: " + i.map(function (t) {
              return t.canonicalString()
            }))
          })
        })
      }, Fo.prototype.containsKey = function (t, e) {
        return Vo(t, this.userId, e)
      }, Fo.prototype.getMutationQueueMetadata = function (t) {
        var e = this;
        return Go(t).get(this.userId).next(function (t) {
          return t || new Ya(e.userId, -1, "")
        })
      }, Fo);

      function Fo(t, e, n, r) {
        this.userId = t, this.serializer = e, this.indexManager = n, this.referenceDelegate = r, this.documentKeysByBatchId = {}
      }

      function Vo(t, o, e) {
        var n = Za.prefixForPath(o, e.path), a = n[1], r = IDBKeyRange.lowerBound(n), s = !1;
        return Ko(t).iterate({range: r, keysOnly: !0}, function (t, e, n) {
          var r = t[0], i = t[1];
          t[2];
          r === o && i === a && (s = !0), n.done()
        }).next(function () {
          return s
        })
      }

      function Bo(t, e, n) {
        var r = t.store(Ja.store), i = t.store(Za.store), o = [], a = IDBKeyRange.only(n.batchId), s = 0,
          u = r.iterate({range: a}, function (t, e, n) {
            return s++, n.delete()
          });
        o.push(u.next(function () {
          xr(1 === s, "Dangling document-mutation reference found: Missing batch " + n.batchId)
        }));
        for (var c = [], h = 0, l = n.mutations; h < l.length; h++) {
          var f = l[h], p = Za.key(e, f.key.path, n.batchId);
          o.push(i.delete(p)), c.push(f.key)
        }
        return Po.waitFor(o).next(function () {
          return c
        })
      }

      function Uo(t) {
        return t instanceof Uint8Array ? (xr("YES" === process.env.USE_MOCK_PERSISTENCE, "Persisting non-string stream tokens is only supported with mock persistence."), t.toString()) : t
      }

      function Qo(t) {
        return Ws.getStore(t, Ja.store)
      }

      function Ko(t) {
        return Ws.getStore(t, Za.store)
      }

      function Go(t) {
        return Ws.getStore(t, Ya.store)
      }

      var jo, Wo;
      (Wo = jo = jo || {})[Wo.QueryCache = 0] = "QueryCache", Wo[Wo.SyncEngine = 1] = "SyncEngine";
      var zo = (Ho.prototype.next = function () {
        var t = this.nextId;
        return this.nextId += 2, t
      }, Ho.prototype.after = function (t) {
        return this.seek(t + 2), this.next()
      }, Ho.prototype.seek = function (t) {
        xr((1 & t) === this.generatorId, "Cannot supply target ID from different generator ID"), this.nextId = t
      }, Ho.forQueryCache = function () {
        return new Ho(jo.QueryCache, 2)
      }, Ho.forSyncEngine = function () {
        return new Ho(jo.SyncEngine)
      }, Ho);

      function Ho(t, e) {
        xr((1 & (this.generatorId = t)) === t, "Generator ID " + t + " contains more than 1 reserved bits"), this.seek(void 0 !== e ? e : this.generatorId)
      }

      var Yo = "SimpleDb", Xo = (Jo.openOrCreate = function (o, t, a) {
        return xr(Jo.isAvailable(), "IndexedDB not supported in current environment."), _r(Yo, "Opening database:", o), new Po(function (n, r) {
          var i = window.indexedDB.open(o, t);
          i.onsuccess = function (t) {
            var e = t.target.result;
            n(new Jo(e))
          }, i.onblocked = function () {
            r(new Qr(Ur.FAILED_PRECONDITION, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))
          }, i.onerror = function (t) {
            var e = t.target.error;
            "VersionError" === e.name ? r(new Qr(Ur.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : r(e)
          }, i.onupgradeneeded = function (t) {
            _r(Yo, 'Database "' + o + '" requires upgrade from version:', t.oldVersion);
            var e = t.target.result, n = new ta(i.transaction);
            a.createOrUpgrade(e, n, t.oldVersion, Ka).next(function () {
              _r(Yo, "Database upgrade to version " + Ka + " complete")
            })
          }
        }).toPromise()
      }, Jo.delete = function (t) {
        return _r(Yo, "Removing database:", t), ia(window.indexedDB.deleteDatabase(t)).toPromise()
      }, Jo.isAvailable = function () {
        if ("undefined" == typeof window || null == window.indexedDB) return !1;
        if (void 0 === window.navigator) return "YES" === process.env.USE_MOCK_PERSISTENCE;
        var t = u(), e = Jo.getIOSVersion(t), n = 0 < e && e < 10, r = Jo.getAndroidVersion(t), i = 0 < r && r < 4.5;
        return !(0 < t.indexOf("MSIE ") || 0 < t.indexOf("Trident/") || 0 < t.indexOf("Edge/") || n || i)
      }, Jo.getStore = function (t, e) {
        return t.store(e)
      }, Jo.getIOSVersion = function (t) {
        var e = t.match(/i(?:phone|pad|pod) os ([\d_]+)/i), n = e ? e[1].split("_").slice(0, 2).join(".") : "-1";
        return Number(n)
      }, Jo.getAndroidVersion = function (t) {
        var e = t.match(/Android ([\d.]+)/i), n = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
        return Number(n)
      }, Jo.prototype.setVersionChangeListener = function (e) {
        this.db.onversionchange = function (t) {
          return e(t)
        }
      }, Jo.prototype.runTransaction = function (t, e, n) {
        var r = ta.open(this.db, t, e), i = n(r).catch(function (t) {
          return r.abort(t), Po.reject(t)
        }).toPromise();
        return i.catch(function () {
        }), r.completionPromise.then(function () {
          return i
        })
      }, Jo.prototype.close = function () {
        this.db.close()
      }, Jo);

      function Jo(t) {
        this.db = t, 12.2 === Jo.getIOSVersion(u()) && Or("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")
      }

      var $o = (Object.defineProperty(Zo.prototype, "isDone", {
        get: function () {
          return this.shouldStop
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(Zo.prototype, "skipToKey", {
        get: function () {
          return this.nextKey
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(Zo.prototype, "cursor", {
        set: function (t) {
          this.dbCursor = t
        }, enumerable: !0, configurable: !0
      }), Zo.prototype.done = function () {
        this.shouldStop = !0
      }, Zo.prototype.skip = function (t) {
        this.nextKey = t
      }, Zo.prototype.delete = function () {
        return ia(this.dbCursor.delete())
      }, Zo);

      function Zo(t) {
        this.dbCursor = t, this.shouldStop = !1, this.nextKey = null
      }

      var ta = (ea.open = function (t, e, n) {
        return new ea(t.transaction(n, e))
      }, Object.defineProperty(ea.prototype, "completionPromise", {
        get: function () {
          return this.completionDeferred.promise
        }, enumerable: !0, configurable: !0
      }), ea.prototype.abort = function (t) {
        t && this.completionDeferred.reject(t), this.aborted || (_r(Yo, "Aborting transaction:", t ? t.message : "Client-initiated abort"), this.aborted = !0, this.transaction.abort())
      }, ea.prototype.store = function (t) {
        var e = this.transaction.objectStore(t);
        return xr(!!e, "Object store not part of transaction: " + t), new na(e)
      }, ea);

      function ea(t) {
        var n = this;
        this.transaction = t, this.aborted = !1, this.completionDeferred = new Gi, this.transaction.oncomplete = function () {
          n.completionDeferred.resolve()
        }, this.transaction.onabort = function () {
          t.error ? n.completionDeferred.reject(t.error) : n.completionDeferred.resolve()
        }, this.transaction.onerror = function (t) {
          var e = aa(t.target.error);
          n.completionDeferred.reject(e)
        }
      }

      var na = (ra.prototype.put = function (t, e) {
        return ia(void 0 !== e ? (_r(Yo, "PUT", this.store.name, t, e), this.store.put(e, t)) : (_r(Yo, "PUT", this.store.name, "<auto-key>", t), this.store.put(t)))
      }, ra.prototype.add = function (t) {
        return _r(Yo, "ADD", this.store.name, t, t), ia(this.store.add(t))
      }, ra.prototype.get = function (e) {
        var n = this;
        return ia(this.store.get(e)).next(function (t) {
          return void 0 === t && (t = null), _r(Yo, "GET", n.store.name, e, t), t
        })
      }, ra.prototype.delete = function (t) {
        return _r(Yo, "DELETE", this.store.name, t), ia(this.store.delete(t))
      }, ra.prototype.count = function () {
        return _r(Yo, "COUNT", this.store.name), ia(this.store.count())
      }, ra.prototype.loadAll = function (t, e) {
        var n = this.cursor(this.options(t, e)), r = [];
        return this.iterateCursor(n, function (t, e) {
          r.push(e)
        }).next(function () {
          return r
        })
      }, ra.prototype.deleteAll = function (t, e) {
        _r(Yo, "DELETE ALL", this.store.name);
        var n = this.options(t, e);
        n.keysOnly = !1;
        var r = this.cursor(n);
        return this.iterateCursor(r, function (t, e, n) {
          return n.delete()
        })
      }, ra.prototype.iterate = function (t, e) {
        var n;
        e ? n = t : (n = {}, e = t);
        var r = this.cursor(n);
        return this.iterateCursor(r, e)
      }, ra.prototype.iterateSerial = function (i) {
        var t = this.cursor({});
        return new Po(function (n, r) {
          t.onerror = function (t) {
            var e = aa(t.target.error);
            r(e)
          }, t.onsuccess = function (t) {
            var e = t.target.result;
            e ? i(e.primaryKey, e.value).next(function (t) {
              t ? e.continue() : n()
            }) : n()
          }
        })
      }, ra.prototype.iterateCursor = function (t, a) {
        var s = [];
        return new Po(function (o, e) {
          t.onerror = function (t) {
            e(t.target.error)
          }, t.onsuccess = function (t) {
            var e = t.target.result;
            if (e) {
              var n = new $o(e), r = a(e.primaryKey, e.value, n);
              if (r instanceof Po) {
                var i = r.catch(function (t) {
                  return n.done(), Po.reject(t)
                });
                s.push(i)
              }
              n.isDone ? o() : null === n.skipToKey ? e.continue() : e.continue(n.skipToKey)
            } else o()
          }
        }).next(function () {
          return Po.waitFor(s)
        })
      }, ra.prototype.options = function (t, e) {
        var n = void 0;
        return void 0 !== t && ("string" == typeof t ? n = t : (xr(void 0 === e, "3rd argument must not be defined if 2nd is a range."), e = t)), {
          index: n,
          range: e
        }
      }, ra.prototype.cursor = function (t) {
        var e = "next";
        if (t.reverse && (e = "prev"), t.index) {
          var n = this.store.index(t.index);
          return t.keysOnly ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e)
        }
        return this.store.openCursor(t.range, e)
      }, ra);

      function ra(t) {
        this.store = t
      }

      function ia(t) {
        return new Po(function (n, r) {
          t.onsuccess = function (t) {
            var e = t.target.result;
            n(e)
          }, t.onerror = function (t) {
            var e = aa(t.target.error);
            r(e)
          }
        })
      }

      var oa = !1;

      function aa(t) {
        var e = Xo.getIOSVersion(u());
        if (12.2 <= e && e < 13) {
          var n = "An internal error was encountered in the Indexed Database server";
          if (0 <= t.message.indexOf(n)) {
            var r = new Qr("internal", "IOS_INDEXEDDB_BUG1: IndexedDb has thrown '" + n + "'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
            return oa || (oa = !0, setTimeout(function () {
              throw r
            }, 0)), r
          }
        }
        return t
      }

      var sa = (ua.prototype.allocateTargetId = function (e) {
        var n = this;
        return this.retrieveMetadata(e).next(function (t) {
          return t.highestTargetId = n.targetIdGenerator.after(t.highestTargetId), n.saveMetadata(e, t).next(function () {
            return t.highestTargetId
          })
        })
      }, ua.prototype.getLastRemoteSnapshotVersion = function (t) {
        return this.retrieveMetadata(t).next(function (t) {
          return oo.fromTimestamp(new ro(t.lastRemoteSnapshotVersion.seconds, t.lastRemoteSnapshotVersion.nanoseconds))
        })
      }, ua.prototype.getHighestSequenceNumber = function (t) {
        return la(t.simpleDbTransaction)
      }, ua.prototype.setTargetsMetadata = function (e, n, r) {
        var i = this;
        return this.retrieveMetadata(e).next(function (t) {
          return t.highestListenSequenceNumber = n, r && (t.lastRemoteSnapshotVersion = r.toTimestamp()), n > t.highestListenSequenceNumber && (t.highestListenSequenceNumber = n), i.saveMetadata(e, t)
        })
      }, ua.prototype.addQueryData = function (e, n) {
        var r = this;
        return this.saveQueryData(e, n).next(function () {
          return r.retrieveMetadata(e).next(function (t) {
            return t.targetCount += 1, r.updateMetadataFromQueryData(n, t), r.saveMetadata(e, t)
          })
        })
      }, ua.prototype.updateQueryData = function (t, e) {
        return this.saveQueryData(t, e)
      }, ua.prototype.removeQueryData = function (e, t) {
        var n = this;
        return this.removeMatchingKeysForTargetId(e, t.targetId).next(function () {
          return ca(e).delete(t.targetId)
        }).next(function () {
          return n.retrieveMetadata(e)
        }).next(function (t) {
          return xr(0 < t.targetCount, "Removing from an empty query cache"), t.targetCount -= 1, n.saveMetadata(e, t)
        })
      }, ua.prototype.removeTargets = function (r, i, o) {
        var a = this, s = 0, u = [];
        return ca(r).iterate(function (t, e) {
          var n = a.serializer.fromDbTarget(e);
          n.sequenceNumber <= i && void 0 === o[n.targetId] && (s++, u.push(a.removeQueryData(r, n)))
        }).next(function () {
          return Po.waitFor(u)
        }).next(function () {
          return s
        })
      }, ua.prototype.forEachTarget = function (t, r) {
        var i = this;
        return ca(t).iterate(function (t, e) {
          var n = i.serializer.fromDbTarget(e);
          r(n)
        })
      }, ua.prototype.retrieveMetadata = function (t) {
        return ha(t.simpleDbTransaction)
      }, ua.prototype.saveMetadata = function (t, e) {
        return function (t) {
          return Ws.getStore(t, ls.store)
        }(t).put(ls.key, e)
      }, ua.prototype.saveQueryData = function (t, e) {
        return ca(t).put(this.serializer.toDbTarget(e))
      }, ua.prototype.updateMetadataFromQueryData = function (t, e) {
        var n = !1;
        return t.targetId > e.highestTargetId && (e.highestTargetId = t.targetId, n = !0), t.sequenceNumber > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = t.sequenceNumber, n = !0), n
      }, ua.prototype.getQueryCount = function (t) {
        return this.retrieveMetadata(t).next(function (t) {
          return t.targetCount
        })
      }, ua.prototype.getQueryData = function (t, i) {
        var o = this, e = i.canonicalId(),
          n = IDBKeyRange.bound([e, Number.NEGATIVE_INFINITY], [e, Number.POSITIVE_INFINITY]), a = null;
        return ca(t).iterate({range: n, index: ss.queryTargetsIndexName}, function (t, e, n) {
          var r = o.serializer.fromDbTarget(e);
          i.isEqual(r.query) && (a = r, n.done())
        }).next(function () {
          return a
        })
      }, ua.prototype.addMatchingKeys = function (n, t, r) {
        var i = this, o = [], a = fa(n);
        return t.forEach(function (t) {
          var e = Zi(t.path);
          o.push(a.put(new cs(r, e))), o.push(i.referenceDelegate.addReference(n, t))
        }), Po.waitFor(o)
      }, ua.prototype.removeMatchingKeys = function (n, t, r) {
        var i = this, o = fa(n);
        return Po.forEach(t, function (t) {
          var e = Zi(t.path);
          return Po.waitFor([o.delete([r, e]), i.referenceDelegate.removeReference(n, t)])
        })
      }, ua.prototype.removeMatchingKeysForTargetId = function (t, e) {
        var n = fa(t), r = IDBKeyRange.bound([e], [e + 1], !1, !0);
        return n.delete(r)
      }, ua.prototype.getMatchingKeysForTargetId = function (t, e) {
        var n = IDBKeyRange.bound([e], [e + 1], !1, !0), r = fa(t), o = Ao();
        return r.iterate({range: n, keysOnly: !0}, function (t, e, n) {
          var r = no(t[1]), i = new Bi(r);
          o = o.add(i)
        }).next(function () {
          return o
        })
      }, ua.prototype.containsKey = function (t, e) {
        var n = Zi(e.path), r = IDBKeyRange.bound([n], [vi(n)], !1, !0), i = 0;
        return fa(t).iterate({index: cs.documentTargetsIndex, keysOnly: !0, range: r}, function (t, e, n) {
          var r = t[0];
          t[1], 0 !== r && (i++, n.done())
        }).next(function () {
          return 0 < i
        })
      }, ua.prototype.getQueryDataForTarget = function (t, e) {
        var n = this;
        return ca(t).get(e).next(function (t) {
          return t ? n.serializer.fromDbTarget(t) : null
        })
      }, ua);

      function ua(t, e) {
        this.referenceDelegate = t, this.serializer = e, this.targetIdGenerator = zo.forQueryCache()
      }

      function ca(t) {
        return Ws.getStore(t, ss.store)
      }

      function ha(t) {
        return Xo.getStore(t, ls.store).get(ls.key).next(function (t) {
          return xr(null !== t, "Missing metadata row."), t
        })
      }

      function la(t) {
        return ha(t).next(function (t) {
          return t.highestListenSequenceNumber
        })
      }

      function fa(t) {
        return Ws.getStore(t, cs.store)
      }

      var pa = (da.compareByKey = function (t, e) {
        return Bi.comparator(t.key, e.key)
      }, da);

      function da(t, e) {
        this.key = t, this.version = e
      }

      var ma, ya = (s(ga, ma = pa), ga.prototype.field = function (t) {
        return this.data.field(t)
      }, ga.prototype.fieldValue = function (t) {
        var e = this.field(t);
        return e ? e.value() : void 0
      }, ga.prototype.value = function () {
        return this.data.value()
      }, ga.prototype.isEqual = function (t) {
        return t instanceof ga && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.data.isEqual(t.data) && this.hasLocalMutations === t.hasLocalMutations && this.hasCommittedMutations === t.hasCommittedMutations
      }, ga.prototype.toString = function () {
        return "Document(" + this.key + ", " + this.version + ", " + this.data.toString() + ", {hasLocalMutations: " + this.hasLocalMutations + "}), {hasCommittedMutations: " + this.hasCommittedMutations + "})"
      }, Object.defineProperty(ga.prototype, "hasPendingWrites", {
        get: function () {
          return this.hasLocalMutations || this.hasCommittedMutations
        }, enumerable: !0, configurable: !0
      }), ga.compareByField = function (t, e, n) {
        var r = e.field(t), i = n.field(t);
        return null !== r && null !== i ? r.compareTo(i) : Pr("Trying to compare documents on fields that don't exist")
      }, ga);

      function ga(t, e, n, r, i) {
        var o = ma.call(this, t, e) || this;
        return o.data = n, o.proto = i, o.hasLocalMutations = !!r.hasLocalMutations, o.hasCommittedMutations = !!r.hasCommittedMutations, o
      }

      var va, ba = (s(wa, va = pa), wa.prototype.toString = function () {
        return "NoDocument(" + this.key + ", " + this.version + ")"
      }, Object.defineProperty(wa.prototype, "hasPendingWrites", {
        get: function () {
          return this.hasCommittedMutations
        }, enumerable: !0, configurable: !0
      }), wa.prototype.isEqual = function (t) {
        return t instanceof wa && t.hasCommittedMutations === this.hasCommittedMutations && t.version.isEqual(this.version) && t.key.isEqual(this.key)
      }, wa);

      function wa(t, e, n) {
        var r = va.call(this, t, e) || this;
        return r.hasCommittedMutations = !(!n || !n.hasCommittedMutations), r
      }

      var Ea, Sa = (s(Ta, Ea = pa), Ta.prototype.toString = function () {
        return "UnknownDocument(" + this.key + ", " + this.version + ")"
      }, Object.defineProperty(Ta.prototype, "hasPendingWrites", {
        get: function () {
          return !0
        }, enumerable: !0, configurable: !0
      }), Ta.prototype.isEqual = function (t) {
        return t instanceof Ta && t.version.isEqual(this.version) && t.key.isEqual(this.key)
      }, Ta);

      function Ta() {
        return null !== Ea && Ea.apply(this, arguments) || this
      }

      var Ia = (Ca.prototype.get = function (t) {
        var e = this.mapKeyFn(t), n = this.inner[e];
        if (void 0 !== n) for (var r = 0, i = n; r < i.length; r++) {
          var o = i[r], a = o[0], s = o[1];
          if (a.isEqual(t)) return s
        }
      }, Ca.prototype.has = function (t) {
        return void 0 !== this.get(t)
      }, Ca.prototype.set = function (t, e) {
        var n = this.mapKeyFn(t), r = this.inner[n];
        if (void 0 !== r) {
          for (var i = 0; i < r.length; i++) if (r[i][0].isEqual(t)) return void (r[i] = [t, e]);
          r.push([t, e])
        } else this.inner[n] = [[t, e]]
      }, Ca.prototype.delete = function (t) {
        var e = this.mapKeyFn(t), n = this.inner[e];
        if (void 0 === n) return !1;
        for (var r = 0; r < n.length; r++) if (n[r][0].isEqual(t)) return 1 === n.length ? delete this.inner[e] : n.splice(r, 1), !0;
        return !1
      }, Ca.prototype.forEach = function (s) {
        Hr(this.inner, function (t, e) {
          for (var n = 0, r = e; n < r.length; n++) {
            var i = r[n], o = i[0], a = i[1];
            s(o, a)
          }
        })
      }, Ca.prototype.isEmpty = function () {
        return Yr(this.inner)
      }, Ca);

      function Ca(t) {
        this.mapKeyFn = t, this.inner = {}
      }

      var Da = (Na.prototype.addEntry = function (t) {
        var e = this.assertChanges();
        this.changes = e.insert(t.key, t)
      }, Na.prototype.getEntry = function (t, e) {
        var n = this, r = this.assertChanges().get(e);
        return r ? Po.resolve(r) : this.getFromCache(t, e).next(function (t) {
          return null === t ? (n.documentSizes.set(e, 0), null) : (n.documentSizes.set(e, t.size), t.maybeDocument)
        })
      }, Na.prototype.getEntries = function (t, e) {
        var n = this;
        return this.getAllFromCache(t, e).next(function (t) {
          var e = t.maybeDocuments;
          return t.sizeMap.forEach(function (t, e) {
            n.documentSizes.set(t, e)
          }), e
        })
      }, Na.prototype.apply = function (t) {
        var e = this.applyChanges(t);
        return this.changes = null, e
      }, Na.prototype.assertChanges = function () {
        return xr(null !== this.changes, "Changes have already been applied."), this.changes
      }, Na);

      function Na() {
        this.changes = Eo(), this.documentSizes = new Ia(function (t) {
          return t.toString()
        })
      }

      var Aa = "The remote document changelog no longer contains all changes for all local query views. It may be necessary to rebuild these views.",
        ka = (Object.defineProperty(Ra.prototype, "lastProcessedDocumentChangeId", {
          get: function () {
            return this._lastProcessedDocumentChangeId
          }, enumerable: !0, configurable: !0
        }), Ra.prototype.start = function (t) {
          var e = Xo.getStore(t, ys.store);
          return this.synchronizeLastDocumentChangeId(e)
        }, Ra.prototype.addEntries = function (t, e, n) {
          var r = [];
          if (0 < e.length) {
            for (var i = Pa(t), o = Ao(), a = 0, s = e; a < s.length; a++) {
              var u = s[a], c = u.key, h = u.doc;
              r.push(i.put(qa(c), h)), o = o.add(c), r.push(this.indexManager.addToCollectionParentIndex(t, c.path.popLast()))
            }
            this.keepDocumentChangeLog && r.push(xa(t).put({changes: this.serializer.toDbResourcePaths(o)})), r.push(this.updateSize(t, n))
          }
          return Po.waitFor(r)
        }, Ra.prototype.removeEntry = function (t, e) {
          var n = Pa(t), r = qa(e);
          return n.get(r).next(function (t) {
            return t ? n.delete(r).next(function () {
              return Fa(t)
            }) : Po.resolve(0)
          })
        }, Ra.prototype.getEntry = function (t, e) {
          var n = this;
          return Pa(t).get(qa(e)).next(function (t) {
            return t ? n.serializer.fromDbRemoteDocument(t) : null
          })
        }, Ra.prototype.getSizedEntry = function (t, e) {
          var n = this;
          return Pa(t).get(qa(e)).next(function (t) {
            return t ? {maybeDocument: n.serializer.fromDbRemoteDocument(t), size: Fa(t)} : null
          })
        }, Ra.prototype.getEntries = function (t, e) {
          var n = this, r = So();
          return this.forEachDbEntry(t, e, function (t, e) {
            r = e ? r.insert(t, n.serializer.fromDbRemoteDocument(e)) : r.insert(t, null)
          }).next(function () {
            return r
          })
        }, Ra.prototype.getSizedEntries = function (t, e) {
          var n = this, r = So(), i = new so(Bi.comparator);
          return this.forEachDbEntry(t, e, function (t, e) {
            i = e ? (r = r.insert(t, n.serializer.fromDbRemoteDocument(e)), i.insert(t, Fa(e))) : (r = r.insert(t, null), i.insert(t, 0))
          }).next(function () {
            return {maybeDocuments: r, sizeMap: i}
          })
        }, Ra.prototype.forEachDbEntry = function (t, e, i) {
          if (e.isEmpty()) return Po.resolve();
          var n = IDBKeyRange.bound(e.first().path.toArray(), e.last().path.toArray()), o = e.getIterator(),
            a = o.getNext();
          return Pa(t).iterate({range: n}, function (t, e, n) {
            for (var r = Bi.fromSegments(t); a && Bi.comparator(a, r) < 0;) i(a, null), a = o.getNext();
            a && a.isEqual(r) && (i(a, e), a = o.hasNext() ? o.getNext() : null), a ? n.skip(a.path.toArray()) : n.done()
          }).next(function () {
            for (; a;) i(a, null), a = o.hasNext() ? o.getNext() : null
          })
        }, Ra.prototype.getDocumentsMatchingQuery = function (t, i) {
          var o = this;
          xr(!i.isCollectionGroupQuery(), "CollectionGroup queries should be handled in LocalDocumentsView");
          var a = Io(), s = i.path.length + 1, e = i.path.toArray(), n = IDBKeyRange.lowerBound(e);
          return Pa(t).iterate({range: n}, function (t, e, n) {
            if (t.length === s) {
              var r = o.serializer.fromDbRemoteDocument(e);
              i.path.isPrefixOf(r.key.path) ? r instanceof ya && i.matches(r) && (a = a.insert(r.key, r)) : n.done()
            }
          }).next(function () {
            return a
          })
        }, Ra.prototype.getNewDocumentChanges = function (e) {
          var r = this;
          xr(this.keepDocumentChangeLog, "Can only call getNewDocumentChanges() when document change log is enabled");
          var n = Ao(), i = Eo(), t = IDBKeyRange.lowerBound(this._lastProcessedDocumentChangeId + 1), o = !0,
            a = xa(e);
          return a.iterate({range: t}, function (t, e) {
            if (o && (o = !1, r._lastProcessedDocumentChangeId + 1 !== e.id)) return r.synchronizeLastDocumentChangeId(a).next(function () {
              return Po.reject(new Qr(Ur.DATA_LOSS, Aa))
            });
            n = n.unionWith(r.serializer.fromDbResourcePaths(e.changes)), r._lastProcessedDocumentChangeId = e.id
          }).next(function () {
            var t = [];
            return n.forEach(function (n) {
              t.push(r.getEntry(e, n).next(function (t) {
                var e = t || new ba(n, oo.forDeletedDoc());
                i = i.insert(n, e)
              }))
            }), Po.waitFor(t)
          }).next(function () {
            return i
          })
        }, Ra.prototype.removeDocumentChangesThroughChangeId = function (t, e) {
          var n = IDBKeyRange.upperBound(e);
          return xa(t).delete(n)
        }, Ra.prototype.synchronizeLastDocumentChangeId = function (t) {
          var r = this;
          return this._lastProcessedDocumentChangeId = 0, t.iterate({keysOnly: !0, reverse: !0}, function (t, e, n) {
            r._lastProcessedDocumentChangeId = t, n.done()
          })
        }, Ra.prototype.newChangeBuffer = function () {
          return new Oa(this)
        }, Ra.prototype.getSize = function (t) {
          return this.getMetadata(t).next(function (t) {
            return t.byteSize
          })
        }, Ra.prototype.getMetadata = function (t) {
          return Ma(t).get(os.key).next(function (t) {
            return xr(!!t, "Missing document cache metadata"), t
          })
        }, Ra.prototype.setMetadata = function (t, e) {
          return Ma(t).put(os.key, e)
        }, Ra.prototype.updateSize = function (e, n) {
          var r = this;
          return this.getMetadata(e).next(function (t) {
            return t.byteSize += n, r.setMetadata(e, t)
          })
        }, Ra);

      function Ra(t, e, n) {
        this.serializer = t, this.indexManager = e, this.keepDocumentChangeLog = n, this._lastProcessedDocumentChangeId = 0
      }

      function Ma(t) {
        return Ws.getStore(t, os.store)
      }

      var _a, Oa = (s(La, _a = Da), La.prototype.applyChanges = function (t) {
        var o = this, e = this.assertChanges(), a = 0, s = [];
        return e.forEach(function (t, e) {
          var n = o.documentCache.serializer.toDbRemoteDocument(e), r = o.documentSizes.get(t);
          xr(void 0 !== r, "Attempting to change document " + t.toString() + " without having read it first");
          var i = Fa(n);
          a += i - r, s.push({key: t, doc: n})
        }), this.documentCache.addEntries(t, s, a)
      }, La.prototype.getFromCache = function (t, e) {
        return this.documentCache.getSizedEntry(t, e)
      }, La.prototype.getAllFromCache = function (t, e) {
        return this.documentCache.getSizedEntries(t, e)
      }, La);

      function La(t) {
        var e = _a.call(this) || this;
        return e.documentCache = t, e
      }

      function Pa(t) {
        return Ws.getStore(t, rs.store)
      }

      function xa(t) {
        return Ws.getStore(t, ys.store)
      }

      function qa(t) {
        return t.path.toArray()
      }

      function Fa(t) {
        var e;
        if (t.document) e = t.document; else if (t.unknownDocument) e = t.unknownDocument; else {
          if (!t.noDocument) throw Pr("Unknown remote document type");
          e = t.noDocument
        }
        return JSON.stringify(e).length
      }

      var Va = (Ba.prototype.addToCollectionParentIndex = function (t, e) {
        return this.collectionParentIndex.add(e), Po.resolve()
      }, Ba.prototype.getCollectionParents = function (t, e) {
        return Po.resolve(this.collectionParentIndex.getEntries(e))
      }, Ba);

      function Ba() {
        this.collectionParentIndex = new Ua
      }

      var Ua = (Qa.prototype.add = function (t) {
        xr(t.length % 2 == 1, "Expected a collection path.");
        var e = t.lastSegment(), n = t.popLast(), r = this.index[e] || new yo(Li.comparator), i = !r.has(n);
        return this.index[e] = r.add(n), i
      }, Qa.prototype.getEntries = function (t) {
        return (this.index[t] || new yo(Li.comparator)).toArray()
      }, Qa);

      function Qa() {
        this.index = {}
      }

      var Ka = 8, Ga = (ja.prototype.createOrUpgrade = function (t, e, n, r) {
        var i = this;
        xr(n < r && 0 <= n && r <= Ka, "Unexpected schema upgrade from v" + n + " to v{toVersion}."), n < 1 && 1 <= r && (function (t) {
          t.createObjectStore(za.store)
        }(t), function (t) {
          t.createObjectStore(Ya.store, {keyPath: Ya.keyPath}), t.createObjectStore(Ja.store, {
            keyPath: Ja.keyPath,
            autoIncrement: !0
          }).createIndex(Ja.userMutationsIndex, Ja.userMutationsKeyPath, {unique: !0}), t.createObjectStore(Za.store)
        }(t), ms(t), function (t) {
          t.createObjectStore(rs.store)
        }(t));
        var o = Po.resolve();
        return n < 3 && 3 <= r && (0 !== n && (function (t) {
          t.deleteObjectStore(cs.store), t.deleteObjectStore(ss.store), t.deleteObjectStore(ls.store)
        }(t), ms(t)), o = o.next(function () {
          return function (t) {
            var e = t.store(ls.store), n = new ls(0, 0, oo.MIN.toTimestamp(), 0);
            return e.put(ls.key, n)
          }(e)
        })), n < 4 && 4 <= r && (0 !== n && (o = o.next(function () {
          return function (r, i) {
            return i.store(Ja.store).loadAll().next(function (t) {
              r.deleteObjectStore(Ja.store), r.createObjectStore(Ja.store, {
                keyPath: Ja.keyPath,
                autoIncrement: !0
              }).createIndex(Ja.userMutationsIndex, Ja.userMutationsKeyPath, {unique: !0});
              var e = i.store(Ja.store), n = t.map(function (t) {
                return e.put(t)
              });
              return Po.waitFor(n)
            })
          }(t, e)
        })), o = o.next(function () {
          !function (t) {
            t.createObjectStore(vs.store, {keyPath: vs.keyPath})
          }(t), function (t) {
            t.createObjectStore(ys.store, {keyPath: "id", autoIncrement: !0})
          }(t)
        })), n < 5 && 5 <= r && (o = o.next(function () {
          return i.removeAcknowledgedMutations(e)
        })), n < 6 && 6 <= r && (o = o.next(function () {
          return function (t) {
            t.createObjectStore(os.store)
          }(t), i.addDocumentGlobal(e)
        })), n < 7 && 7 <= r && (o = o.next(function () {
          return i.ensureSequenceNumbers(e)
        })), n < 8 && 8 <= r && (o = o.next(function () {
          return i.createCollectionParentIndex(t, e)
        })), o
      }, ja.prototype.addDocumentGlobal = function (e) {
        var n = 0;
        return e.store(rs.store).iterate(function (t, e) {
          n += Fa(e)
        }).next(function () {
          var t = new os(n);
          return e.store(os.store).put(os.key, t)
        })
      }, ja.prototype.removeAcknowledgedMutations = function (r) {
        var i = this, t = r.store(Ya.store), e = r.store(Ja.store);
        return t.loadAll().next(function (t) {
          return Po.forEach(t, function (n) {
            var t = IDBKeyRange.bound([n.userId, -1], [n.userId, n.lastAcknowledgedBatchId]);
            return e.loadAll(Ja.userMutationsIndex, t).next(function (t) {
              return Po.forEach(t, function (t) {
                xr(t.userId === n.userId, "Cannot process batch " + t.batchId + " from unexpected user");
                var e = i.serializer.fromDbMutationBatch(t);
                return Bo(r, n.userId, e).next(function () {
                })
              })
            })
          })
        })
      }, ja.prototype.ensureSequenceNumbers = function (t) {
        var a = t.store(cs.store), e = t.store(rs.store);
        return la(t).next(function (i) {
          var o = [];
          return e.iterate(function (t, e) {
            var n = new Li(t), r = function (t) {
              return [0, Zi(t)]
            }(n);
            o.push(a.get(r).next(function (t) {
              return t ? Po.resolve() : function (t) {
                return a.put(new cs(0, Zi(t), i))
              }(n)
            }))
          }).next(function () {
            return Po.waitFor(o)
          })
        })
      }, ja.prototype.createCollectionParentIndex = function (t, e) {
        function i(t) {
          if (o.add(t)) {
            var e = t.lastSegment(), n = t.popLast();
            return r.put({collectionId: e, parent: Zi(n)})
          }
        }

        t.createObjectStore(ps.store, {keyPath: ps.keyPath});
        var r = e.store(ps.store), o = new Ua;
        return e.store(rs.store).iterate({keysOnly: !0}, function (t, e) {
          var n = new Li(t);
          return i(n.popLast())
        }).next(function () {
          return e.store(Za.store).iterate({keysOnly: !0}, function (t, e) {
            t[0];
            var n = t[1], r = (t[2], no(n));
            return i(r.popLast())
          })
        })
      }, ja);

      function ja(t) {
        this.serializer = t
      }

      var Wa = function (t, e) {
        this.seconds = t, this.nanoseconds = e
      }, za = (Ha.store = "owner", Ha.key = "owner", Ha);

      function Ha(t, e, n) {
        this.ownerId = t, this.allowTabSynchronization = e, this.leaseTimestampMs = n
      }

      var Ya = (Xa.store = "mutationQueues", Xa.keyPath = "userId", Xa);

      function Xa(t, e, n) {
        this.userId = t, this.lastAcknowledgedBatchId = e, this.lastStreamToken = n
      }

      var Ja = ($a.store = "mutations", $a.keyPath = "batchId", $a.userMutationsIndex = "userMutationsIndex", $a.userMutationsKeyPath = ["userId", "batchId"], $a);

      function $a(t, e, n, r, i) {
        this.userId = t, this.batchId = e, this.localWriteTimeMs = n, this.baseMutations = r, this.mutations = i
      }

      var Za = (ts.prefixForUser = function (t) {
        return [t]
      }, ts.prefixForPath = function (t, e) {
        return [t, Zi(e)]
      }, ts.key = function (t, e, n) {
        return [t, Zi(e), n]
      }, ts.store = "documentMutations", ts.PLACEHOLDER = new ts, ts);

      function ts() {
      }

      var es = function (t, e) {
        this.path = t, this.readTime = e
      }, ns = function (t, e) {
        this.path = t, this.version = e
      }, rs = (is.store = "remoteDocuments", is);

      function is(t, e, n, r) {
        this.unknownDocument = t, this.noDocument = e, this.document = n, this.hasCommittedMutations = r
      }

      var os = (as.store = "remoteDocumentGlobal", as.key = "remoteDocumentGlobalKey", as);

      function as(t) {
        this.byteSize = t
      }

      var ss = (us.store = "targets", us.keyPath = "targetId", us.queryTargetsIndexName = "queryTargetsIndex", us.queryTargetsKeyPath = ["canonicalId", "targetId"], us);

      function us(t, e, n, r, i, o) {
        this.targetId = t, this.canonicalId = e, this.readTime = n, this.resumeToken = r, this.lastListenSequenceNumber = i, this.query = o
      }

      var cs = (hs.store = "targetDocuments", hs.keyPath = ["targetId", "path"], hs.documentTargetsIndex = "documentTargetsIndex", hs.documentTargetsKeyPath = ["path", "targetId"], hs);

      function hs(t, e, n) {
        this.targetId = t, this.path = e, xr(0 === t == (void 0 !== (this.sequenceNumber = n)), "A target-document row must either have targetId == 0 and a defined sequence number, or a non-zero targetId and no sequence number")
      }

      var ls = (fs.key = "targetGlobalKey", fs.store = "targetGlobal", fs);

      function fs(t, e, n, r) {
        this.highestTargetId = t, this.highestListenSequenceNumber = e, this.lastRemoteSnapshotVersion = n, this.targetCount = r
      }

      var ps = (ds.store = "collectionParents", ds.keyPath = ["collectionId", "parent"], ds);

      function ds(t, e) {
        this.collectionId = t, this.parent = e
      }

      function ms(t) {
        t.createObjectStore(cs.store, {keyPath: cs.keyPath}).createIndex(cs.documentTargetsIndex, cs.documentTargetsKeyPath, {unique: !0}), t.createObjectStore(ss.store, {keyPath: ss.keyPath}).createIndex(ss.queryTargetsIndexName, ss.queryTargetsKeyPath, {unique: !0}), t.createObjectStore(ls.store)
      }

      var ys = (gs.store = "remoteDocumentChanges", gs.keyPath = "id", gs);

      function gs(t) {
        this.changes = t
      }

      var vs = (bs.store = "clientMetadata", bs.keyPath = "clientId", bs);

      function bs(t, e, n, r, i) {
        this.clientId = t, this.updateTimeMs = e, this.networkEnabled = n, this.inForeground = r, this.lastProcessedDocumentChangeId = i
      }

      var ws, Es,
        Ss = [Ya.store, Ja.store, Za.store, rs.store, ss.store, za.store, ls.store, cs.store].concat([vs.store, ys.store]).concat([os.store]).concat([ps.store]),
        Ts = (Is.prototype.addToCollectionParentIndex = function (t, e) {
          if (xr(e.length % 2 == 1, "Expected a collection path."), this.collectionParentsCache.add(e)) {
            xr(1 <= e.length, "Invalid collection path.");
            var n = e.lastSegment(), r = e.popLast();
            return Cs(t).put({collectionId: n, parent: Zi(r)})
          }
          return Po.resolve()
        }, Is.prototype.getCollectionParents = function (t, i) {
          var o = [], e = IDBKeyRange.bound([i, ""], [vi(i), ""], !1, !0);
          return Cs(t).loadAll(e).next(function (t) {
            for (var e = 0, n = t; e < n.length; e++) {
              var r = n[e];
              if (r.collectionId !== i) break;
              o.push(no(r.parent))
            }
            return o
          })
        }, Is);

      function Is() {
        this.collectionParentsCache = new Ua
      }

      function Cs(t) {
        return Ws.getStore(t, ps.store)
      }

      (Es = ws = ws || {})[Es.Listen = 0] = "Listen", Es[Es.ExistenceFilterMismatch = 1] = "ExistenceFilterMismatch", Es[Es.LimboResolution = 2] = "LimboResolution";
      var Ds = (Ns.prototype.copy = function (t) {
        return new Ns(this.query, this.targetId, this.purpose, void 0 === t.sequenceNumber ? this.sequenceNumber : t.sequenceNumber, void 0 === t.snapshotVersion ? this.snapshotVersion : t.snapshotVersion, void 0 === t.resumeToken ? this.resumeToken : t.resumeToken)
      }, Ns.prototype.isEqual = function (t) {
        return this.targetId === t.targetId && this.purpose === t.purpose && this.sequenceNumber === t.sequenceNumber && this.snapshotVersion.isEqual(t.snapshotVersion) && this.resumeToken === t.resumeToken && this.query.isEqual(t.query)
      }, Ns);

      function Ns(t, e, n, r, i, o) {
        void 0 === i && (i = oo.MIN), void 0 === o && (o = Vr()), this.query = t, this.targetId = e, this.purpose = n, this.sequenceNumber = r, this.snapshotVersion = i, this.resumeToken = o
      }

      var As = (ks.prototype.fromDbRemoteDocument = function (t) {
        if (t.document) return this.remoteSerializer.fromDocument(t.document, !!t.hasCommittedMutations);
        if (t.noDocument) {
          var e = Bi.fromSegments(t.noDocument.path), n = this.fromDbTimestamp(t.noDocument.readTime);
          return new ba(e, n, {hasCommittedMutations: !!t.hasCommittedMutations})
        }
        return t.unknownDocument ? (e = Bi.fromSegments(t.unknownDocument.path), n = this.fromDbTimestamp(t.unknownDocument.version), new Sa(e, n)) : Pr("Unexpected DbRemoteDocument")
      }, ks.prototype.toDbRemoteDocument = function (t) {
        if (t instanceof ya) {
          var e = t.proto ? t.proto : this.remoteSerializer.toDocument(t), n = t.hasCommittedMutations;
          return new rs(null, null, e, n)
        }
        if (t instanceof ba) {
          var r = t.key.path.toArray(), i = this.toDbTimestamp(t.version);
          return n = t.hasCommittedMutations, new rs(null, new es(r, i), null, n)
        }
        return t instanceof Sa ? (r = t.key.path.toArray(), i = this.toDbTimestamp(t.version), new rs(new ns(r, i), null, null, !0)) : Pr("Unexpected MaybeDocumment")
      }, ks.prototype.toDbTimestamp = function (t) {
        var e = t.toTimestamp();
        return new Wa(e.seconds, e.nanoseconds)
      }, ks.prototype.fromDbTimestamp = function (t) {
        var e = new ro(t.seconds, t.nanoseconds);
        return oo.fromTimestamp(e)
      }, ks.prototype.toDbMutationBatch = function (t, e) {
        var n = this, r = e.baseMutations.map(function (t) {
          return n.remoteSerializer.toMutation(t)
        }), i = e.mutations.map(function (t) {
          return n.remoteSerializer.toMutation(t)
        });
        return new Ja(t, e.batchId, e.localWriteTime.toMillis(), r, i)
      }, ks.prototype.fromDbMutationBatch = function (t) {
        var e = this, n = (t.baseMutations || []).map(function (t) {
          return e.remoteSerializer.fromMutation(t)
        }), r = t.mutations.map(function (t) {
          return e.remoteSerializer.fromMutation(t)
        }), i = ro.fromMillis(t.localWriteTimeMs);
        return new Mo(t.batchId, i, n, r)
      }, ks.prototype.toDbResourcePaths = function (t) {
        var e = [];
        return t.forEach(function (t) {
          e.push(Zi(t.path))
        }), e
      }, ks.prototype.fromDbResourcePaths = function (t) {
        for (var e = Ao(), n = 0, r = t; n < r.length; n++) {
          var i = r[n];
          e = e.add(new Bi(no(i)))
        }
        return e
      }, ks.prototype.fromDbTarget = function (t) {
        var e, n = this.fromDbTimestamp(t.readTime);
        return e = function (t) {
          return void 0 !== t.documents
        }(t.query) ? this.remoteSerializer.fromDocumentsTarget(t.query) : this.remoteSerializer.fromQueryTarget(t.query), new Ds(e, t.targetId, ws.Listen, t.lastListenSequenceNumber, n, t.resumeToken)
      }, ks.prototype.toDbTarget = function (t) {
        xr(ws.Listen === t.purpose, "Only queries with purpose " + ws.Listen + " may be stored, got " + t.purpose);
        var e, n, r = this.toDbTimestamp(t.snapshotVersion);
        return e = t.query.isDocumentQuery() ? this.remoteSerializer.toDocumentsTarget(t.query) : this.remoteSerializer.toQueryTarget(t.query), n = t.resumeToken instanceof Uint8Array ? (xr("YES" === process.env.USE_MOCK_PERSISTENCE, "Persisting non-string stream tokens is only supported with mock persistence ."), t.resumeToken.toString()) : t.resumeToken, new ss(t.targetId, t.query.canonicalId(), r, n, t.sequenceNumber, e)
      }, ks);

      function ks(t) {
        this.remoteSerializer = t
      }

      function Rs(t, e) {
        var n = t[0], r = t[1], i = e[0], o = e[1], a = yi(n, i);
        return 0 === a ? yi(r, o) : a
      }

      var Ms = (_s.prototype.nextIndex = function () {
        return ++this.previousIndex
      }, _s.prototype.addElement = function (t) {
        var e = [t, this.nextIndex()];
        if (this.buffer.size < this.maxElements) this.buffer = this.buffer.add(e); else {
          var n = this.buffer.last();
          Rs(e, n) < 0 && (this.buffer = this.buffer.delete(n).add(e))
        }
      }, Object.defineProperty(_s.prototype, "maxValue", {
        get: function () {
          return this.buffer.last()[0]
        }, enumerable: !0, configurable: !0
      }), _s);

      function _s(t) {
        this.maxElements = t, this.buffer = new yo(Rs), this.previousIndex = 0
      }

      var Os = {didRun: !1, sequenceNumbersCollected: 0, targetsRemoved: 0, documentsRemoved: 0},
        Ls = (Ps.withCacheSize = function (t) {
          return new Ps(t, Ps.DEFAULT_COLLECTION_PERCENTILE, Ps.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)
        }, Ps.COLLECTION_DISABLED = -1, Ps.MINIMUM_CACHE_SIZE_BYTES = 1048576, Ps.DEFAULT = new Ps(Ps.DEFAULT_CACHE_SIZE_BYTES = 41943040, Ps.DEFAULT_COLLECTION_PERCENTILE = 10, Ps.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3), Ps.DISABLED = new Ps(Ps.COLLECTION_DISABLED, 0, 0), Ps);

      function Ps(t, e, n) {
        this.cacheSizeCollectionThreshold = t, this.percentileToCollect = e, this.maximumSequenceNumbersToCollect = n
      }

      var xs = (qs.prototype.start = function () {
        xr(null === this.gcTask, "Cannot start an already started LruScheduler"), this.garbageCollector.params.cacheSizeCollectionThreshold !== Ls.COLLECTION_DISABLED && this.scheduleGC()
      }, qs.prototype.stop = function () {
        this.gcTask && (this.gcTask.cancel(), this.gcTask = null)
      }, Object.defineProperty(qs.prototype, "started", {
        get: function () {
          return null !== this.gcTask
        }, enumerable: !0, configurable: !0
      }), qs.prototype.scheduleGC = function () {
        var t = this;
        xr(null === this.gcTask, "Cannot schedule GC while a task is pending");
        var e = this.hasRun ? 3e5 : 6e4;
        _r("LruGarbageCollector", "Garbage collection scheduled in " + e + "ms"), this.gcTask = this.asyncQueue.enqueueAfterDelay(Qi.LruGarbageCollection, e, function () {
          return t.gcTask = null, t.hasRun = !0, t.localStore.collectGarbage(t.garbageCollector).then(function () {
            return t.scheduleGC()
          }).catch(Hs)
        })
      }, qs);

      function qs(t, e, n) {
        this.garbageCollector = t, this.asyncQueue = e, this.localStore = n, this.gcTask = null
      }

      var Fs = (Vs.prototype.calculateTargetCount = function (t, e) {
        return this.delegate.getSequenceNumberCount(t).next(function (t) {
          return Math.floor(e / 100 * t)
        })
      }, Vs.prototype.nthSequenceNumber = function (t, e) {
        var n = this;
        if (0 === e) return Po.resolve(Ai.INVALID);
        var r = new Ms(e);
        return this.delegate.forEachTarget(t, function (t) {
          return r.addElement(t.sequenceNumber)
        }).next(function () {
          return n.delegate.forEachOrphanedDocumentSequenceNumber(t, function (t) {
            return r.addElement(t)
          })
        }).next(function () {
          return r.maxValue
        })
      }, Vs.prototype.removeTargets = function (t, e, n) {
        return this.delegate.removeTargets(t, e, n)
      }, Vs.prototype.removeOrphanedDocuments = function (t, e) {
        return this.delegate.removeOrphanedDocuments(t, e)
      }, Vs.prototype.collect = function (e, n) {
        var r = this;
        return this.params.cacheSizeCollectionThreshold === Ls.COLLECTION_DISABLED ? (_r("LruGarbageCollector", "Garbage collection skipped; disabled"), Po.resolve(Os)) : this.getCacheSize(e).next(function (t) {
          return t < r.params.cacheSizeCollectionThreshold ? (_r("LruGarbageCollector", "Garbage collection skipped; Cache size " + t + " is lower than threshold " + r.params.cacheSizeCollectionThreshold), Os) : r.runGarbageCollection(e, n)
        })
      }, Vs.prototype.getCacheSize = function (t) {
        return this.delegate.getCacheSize(t)
      }, Vs.prototype.runGarbageCollection = function (e, n) {
        var r, i, o, a, s, u, c, h = this, l = Date.now();
        return this.calculateTargetCount(e, this.params.percentileToCollect).next(function (t) {
          return i = t > h.params.maximumSequenceNumbersToCollect ? (_r("LruGarbageCollector", "Capping sequence numbers to collect down to the maximum of " + h.params.maximumSequenceNumbersToCollect + " from " + t), h.params.maximumSequenceNumbersToCollect) : t, a = Date.now(), h.nthSequenceNumber(e, i)
        }).next(function (t) {
          return r = t, s = Date.now(), h.removeTargets(e, r, n)
        }).next(function (t) {
          return o = t, u = Date.now(), h.removeOrphanedDocuments(e, r)
        }).next(function (t) {
          return c = Date.now(), Rr() <= wr.DEBUG && _r("LruGarbageCollector", "LRU Garbage Collection\n\tCounted targets in " + (a - l) + "ms\n\tDetermined least recently used " + i + " in " + (s - a) + "ms\n\tRemoved " + o + " targets in " + (u - s) + "ms\n\tRemoved " + t + " documents in " + (c - u) + "ms\nTotal Duration: " + (c - l) + "ms"), Po.resolve({
            didRun: !0,
            sequenceNumbersCollected: i,
            targetsRemoved: o,
            documentsRemoved: t
          })
        })
      }, Vs);

      function Vs(t, e) {
        this.delegate = t, this.params = e
      }

      var Bs, Us = "IndexedDbPersistence",
        Qs = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",
        Ks = "Another tab has exclusive access to the persistence layer. To allow shared access, make sure to invoke `enablePersistence()` with `synchronizeTabs:true` in all tabs.",
        Gs = (s(js, Bs = function () {
        }), js);

      function js(t, e) {
        var n = Bs.call(this) || this;
        return n.simpleDbTransaction = t, n.currentSequenceNumber = e, n
      }

      var Ws = (zs.getStore = function (t, e) {
        if (t instanceof Gs) return Xo.getStore(t.simpleDbTransaction, e);
        throw Pr("IndexedDbPersistence must use instances of IndexedDbTransaction")
      }, zs.createIndexedDbPersistence = function (n, r, i, o, a, s) {
        return p(this, void 0, void 0, function () {
          var e;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return [4, (e = new zs(n, r, i, o, a, s)).start()];
              case 1:
                return t.sent(), [2, e]
            }
          })
        })
      }, zs.createMultiClientIndexedDbPersistence = function (n, r, i, o, a, s, u) {
        return p(this, void 0, void 0, function () {
          var e;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return [4, (e = new zs(n, r, i, o, a, s, u)).start()];
              case 1:
                return t.sent(), [2, e]
            }
          })
        })
      }, zs.prototype.start = function () {
        var n = this;
        return xr(!this.started, "IndexedDbPersistence double-started!"), xr(null !== this.window, "Expected 'window' to be defined"), Xo.openOrCreate(this.dbName, Ka, new Ga(this.serializer)).then(function (t) {
          return n.simpleDb = t, n.updateClientMetadataAndTryBecomePrimary()
        }).then(function () {
          return n.attachVisibilityHandler(), n.attachWindowUnloadHook(), n.scheduleClientMetadataAndPrimaryLeaseRefreshes(), n.startRemoteDocumentCache()
        }).then(function () {
          return n.simpleDb.runTransaction("readonly", [ls.store], function (t) {
            return la(t).next(function (t) {
              var e = n.multiClientParams ? n.multiClientParams.sequenceNumberSyncer : void 0;
              n.listenSequence = new Ai(t, e)
            })
          })
        }).then(function () {
          n._started = !0
        }).catch(function (t) {
          return n.simpleDb && n.simpleDb.close(), Promise.reject(t)
        })
      }, zs.prototype.startRemoteDocumentCache = function () {
        var e = this;
        return this.simpleDb.runTransaction("readonly", Ss, function (t) {
          return e.remoteDocumentCache.start(t)
        })
      }, zs.prototype.setPrimaryStateListener = function (n) {
        var t = this;
        return this.primaryStateListener = function (e) {
          return p(t, void 0, void 0, function () {
            return d(this, function (t) {
              return this.started ? [2, n(e)] : [2]
            })
          })
        }, n(this.isPrimary)
      }, zs.prototype.setDatabaseDeletedListener = function (n) {
        var t = this;
        this.simpleDb.setVersionChangeListener(function (e) {
          return p(t, void 0, void 0, function () {
            return d(this, function (t) {
              switch (t.label) {
                case 0:
                  return null !== e.newVersion ? [3, 2] : [4, n()];
                case 1:
                  t.sent(), t.label = 2;
                case 2:
                  return [2]
              }
            })
          })
        })
      }, zs.prototype.setNetworkEnabled = function (t) {
        var e = this;
        this.networkEnabled !== t && (this.networkEnabled = t, this.queue.enqueueAndForget(function () {
          return p(e, void 0, void 0, function () {
            return d(this, function (t) {
              switch (t.label) {
                case 0:
                  return this.started ? [4, this.updateClientMetadataAndTryBecomePrimary()] : [3, 2];
                case 1:
                  t.sent(), t.label = 2;
                case 2:
                  return [2]
              }
            })
          })
        }))
      }, zs.prototype.updateClientMetadataAndTryBecomePrimary = function () {
        var r = this;
        return this.simpleDb.runTransaction("readwrite", Ss, function (n) {
          return Xs(n).put(new vs(r.clientId, Date.now(), r.networkEnabled, r.inForeground, r.remoteDocumentCache.lastProcessedDocumentChangeId)).next(function () {
            if (r.isPrimary) return r.verifyPrimaryLease(n).next(function (t) {
              t || (r.isPrimary = !1, r.queue.enqueueAndForget(function () {
                return r.primaryStateListener(!1)
              }))
            })
          }).next(function () {
            return r.canActAsPrimary(n)
          }).next(function (t) {
            var e = r.isPrimary;
            return r.isPrimary = t, e !== r.isPrimary && r.queue.enqueueAndForget(function () {
              return r.primaryStateListener(r.isPrimary)
            }), e && !r.isPrimary ? r.releasePrimaryLeaseIfHeld(n) : r.isPrimary ? r.acquireOrExtendPrimaryLease(n) : void 0
          })
        })
      }, zs.prototype.verifyPrimaryLease = function (t) {
        var e = this;
        return Ys(t).get(za.key).next(function (t) {
          return Po.resolve(e.isLocalClient(t))
        })
      }, zs.prototype.removeClientMetadata = function (t) {
        return Xs(t).delete(this.clientId)
      }, zs.prototype.maybeGarbageCollectMultiClientState = function () {
        return p(this, void 0, void 0, function () {
          var r, i, o = this;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return !this.isPrimary || this.isWithinAge(this.lastGarbageCollectionTime, 18e5) ? [3, 2] : (this.lastGarbageCollectionTime = Date.now(), i = [], [4, this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", function (n) {
                  var e = zs.getStore(n, vs.store);
                  return e.loadAll().next(function (t) {
                    r = o.filterActiveClients(t, 18e5), i = t.filter(function (t) {
                      return -1 === r.indexOf(t)
                    })
                  }).next(function () {
                    return Po.forEach(i, function (t) {
                      return e.delete(t.clientId)
                    })
                  }).next(function () {
                    if (0 < (r = r.filter(function (t) {
                      return t.clientId !== o.clientId
                    })).length) {
                      var t = r.map(function (t) {
                        return t.lastProcessedDocumentChangeId || 0
                      }), e = Math.min.apply(Math, t);
                      return o.remoteDocumentCache.removeDocumentChangesThroughChangeId(n, e)
                    }
                  })
                })]);
              case 1:
                t.sent(), i.forEach(function (t) {
                  o.window.localStorage.removeItem(o.zombiedClientLocalStorageKey(t.clientId))
                }), t.label = 2;
              case 2:
                return [2]
            }
          })
        })
      }, zs.prototype.scheduleClientMetadataAndPrimaryLeaseRefreshes = function () {
        var t = this;
        this.clientMetadataRefresher = this.queue.enqueueAfterDelay(Qi.ClientMetadataRefresh, 4e3, function () {
          return t.updateClientMetadataAndTryBecomePrimary().then(function () {
            return t.maybeGarbageCollectMultiClientState()
          }).then(function () {
            return t.scheduleClientMetadataAndPrimaryLeaseRefreshes()
          })
        })
      }, zs.prototype.isLocalClient = function (t) {
        return !!t && t.ownerId === this.clientId
      }, zs.prototype.canActAsPrimary = function (e) {
        var i = this;
        return Ys(e).get(za.key).next(function (t) {
          if (null !== t && i.isWithinAge(t.leaseTimestampMs, 5e3) && !i.isClientZombied(t.ownerId)) {
            if (i.isLocalClient(t) && i.networkEnabled) return !0;
            if (!i.isLocalClient(t)) {
              if (!t.allowTabSynchronization) throw new Qr(Ur.FAILED_PRECONDITION, Ks);
              return !1
            }
          }
          return !(!i.networkEnabled || !i.inForeground) || Xs(e).loadAll().next(function (t) {
            return void 0 === i.filterActiveClients(t, 5e3).find(function (t) {
              if (i.clientId !== t.clientId) {
                var e = !i.networkEnabled && t.networkEnabled, n = !i.inForeground && t.inForeground,
                  r = i.networkEnabled === t.networkEnabled;
                if (e || n && r) return !0
              }
              return !1
            })
          })
        }).next(function (t) {
          return i.isPrimary !== t && _r(Us, "Client " + (t ? "is" : "is not") + " eligible for a primary lease."), t
        })
      }, zs.prototype.shutdown = function () {
        return p(this, void 0, void 0, function () {
          var e = this;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return this._started = !1, this.markClientZombied(), this.clientMetadataRefresher && this.clientMetadataRefresher.cancel(), this.detachVisibilityHandler(), this.detachWindowUnloadHook(), [4, this.simpleDb.runTransaction("readwrite", [za.store, vs.store], function (t) {
                  return e.releasePrimaryLeaseIfHeld(t).next(function () {
                    return e.removeClientMetadata(t)
                  })
                })];
              case 1:
                return t.sent(), this.simpleDb.close(), this.removeClientZombiedEntry(), [2]
            }
          })
        })
      }, zs.prototype.filterActiveClients = function (t, e) {
        var n = this;
        return t.filter(function (t) {
          return n.isWithinAge(t.updateTimeMs, e) && !n.isClientZombied(t.clientId)
        })
      }, zs.prototype.getActiveClients = function () {
        var e = this;
        return this.simpleDb.runTransaction("readonly", [vs.store], function (t) {
          return Xs(t).loadAll().next(function (t) {
            return e.filterActiveClients(t, 18e5).map(function (t) {
              return t.clientId
            })
          })
        })
      }, zs.clearPersistence = function (n) {
        return p(this, void 0, void 0, function () {
          var e;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return zs.isAvailable() ? (e = n + zs.MAIN_DATABASE, [4, Xo.delete(e)]) : [2, Promise.resolve()];
              case 1:
                return t.sent(), [2]
            }
          })
        })
      }, Object.defineProperty(zs.prototype, "started", {
        get: function () {
          return this._started
        }, enumerable: !0, configurable: !0
      }), zs.prototype.getMutationQueue = function (t) {
        return xr(this.started, "Cannot initialize MutationQueue before persistence is started."), qo.forUser(t, this.serializer, this.indexManager, this.referenceDelegate)
      }, zs.prototype.getQueryCache = function () {
        return xr(this.started, "Cannot initialize QueryCache before persistence is started."), this.queryCache
      }, zs.prototype.getRemoteDocumentCache = function () {
        return xr(this.started, "Cannot initialize RemoteDocumentCache before persistence is started."), this.remoteDocumentCache
      }, zs.prototype.getIndexManager = function () {
        return xr(this.started, "Cannot initialize IndexManager before persistence is started."), this.indexManager
      }, zs.prototype.runTransaction = function (n, t, r) {
        var i = this;
        return _r(Us, "Starting transaction:", n), this.simpleDb.runTransaction("readonly" === t ? "readonly" : "readwrite", Ss, function (e) {
          return "readwrite-primary" === t ? i.verifyPrimaryLease(e).next(function (t) {
            if (!t) throw Or("Failed to obtain primary lease for action '" + n + "'."), i.isPrimary = !1, i.queue.enqueueAndForget(function () {
              return i.primaryStateListener(!1)
            }), new Qr(Ur.FAILED_PRECONDITION, Qs);
            return r(new Gs(e, i.listenSequence.next()))
          }).next(function (t) {
            return i.acquireOrExtendPrimaryLease(e).next(function () {
              return t
            })
          }) : i.verifyAllowTabSynchronization(e).next(function () {
            return r(new Gs(e, i.listenSequence.next()))
          })
        })
      }, zs.prototype.verifyAllowTabSynchronization = function (t) {
        var e = this;
        return Ys(t).get(za.key).next(function (t) {
          if (null !== t && e.isWithinAge(t.leaseTimestampMs, 5e3) && !e.isClientZombied(t.ownerId) && !e.isLocalClient(t) && !t.allowTabSynchronization) throw new Qr(Ur.FAILED_PRECONDITION, Ks)
        })
      }, zs.prototype.acquireOrExtendPrimaryLease = function (t) {
        var e = new za(this.clientId, this.allowTabSynchronization, Date.now());
        return Ys(t).put(za.key, e)
      }, zs.isAvailable = function () {
        return Xo.isAvailable()
      }, zs.buildStoragePrefix = function (t) {
        var e = t.databaseId.projectId;
        return t.databaseId.isDefaultDatabase || (e += "." + t.databaseId.database), "firestore/" + t.persistenceKey + "/" + e + "/"
      }, zs.prototype.releasePrimaryLeaseIfHeld = function (t) {
        var e = this, n = Ys(t);
        return n.get(za.key).next(function (t) {
          return e.isLocalClient(t) ? (_r(Us, "Releasing primary lease."), n.delete(za.key)) : Po.resolve()
        })
      }, zs.prototype.isWithinAge = function (t, e) {
        var n = Date.now();
        return !(t < n - e || n < t && (Or("Detected an update time that is in the future: " + t + " > " + n), 1))
      }, zs.prototype.attachVisibilityHandler = function () {
        var t = this;
        null !== this.document && "function" == typeof this.document.addEventListener && (this.documentVisibilityHandler = function () {
          t.queue.enqueueAndForget(function () {
            return t.inForeground = "visible" === t.document.visibilityState, t.updateClientMetadataAndTryBecomePrimary()
          })
        }, this.document.addEventListener("visibilitychange", this.documentVisibilityHandler), this.inForeground = "visible" === this.document.visibilityState)
      }, zs.prototype.detachVisibilityHandler = function () {
        this.documentVisibilityHandler && (xr(null !== this.document && "function" == typeof this.document.addEventListener, "Expected 'document.addEventListener' to be a function"), this.document.removeEventListener("visibilitychange", this.documentVisibilityHandler), this.documentVisibilityHandler = null)
      }, zs.prototype.attachWindowUnloadHook = function () {
        var t = this;
        "function" == typeof this.window.addEventListener && (this.windowUnloadHandler = function () {
          t.markClientZombied(), t.queue.enqueueAndForget(function () {
            return t.shutdown()
          })
        }, this.window.addEventListener("unload", this.windowUnloadHandler))
      }, zs.prototype.detachWindowUnloadHook = function () {
        this.windowUnloadHandler && (xr("function" == typeof this.window.removeEventListener, "Expected 'window.removeEventListener' to be a function"), this.window.removeEventListener("unload", this.windowUnloadHandler), this.windowUnloadHandler = null)
      }, zs.prototype.isClientZombied = function (t) {
        try {
          var e = null !== this.webStorage.getItem(this.zombiedClientLocalStorageKey(t));
          return _r(Us, "Client '" + t + "' " + (e ? "is" : "is not") + " zombied in LocalStorage"), e
        } catch (t) {
          return Or(Us, "Failed to get zombied client id.", t), !1
        }
      }, zs.prototype.markClientZombied = function () {
        try {
          this.webStorage.setItem(this.zombiedClientLocalStorageKey(this.clientId), String(Date.now()))
        } catch (t) {
          Or("Failed to set zombie client id.", t)
        }
      }, zs.prototype.removeClientZombiedEntry = function () {
        try {
          this.webStorage.removeItem(this.zombiedClientLocalStorageKey(this.clientId))
        } catch (t) {
        }
      }, zs.prototype.zombiedClientLocalStorageKey = function (t) {
        return "firestore_zombie_" + this.persistenceKey + "_" + t
      }, zs.MAIN_DATABASE = "main", zs);

      function zs(t, e, n, r, i, o, a) {
        if (this.persistenceKey = t, this.clientId = e, this.queue = r, this.multiClientParams = a, this._started = !1, this.isPrimary = !1, this.networkEnabled = !0, this.inForeground = !1, this.lastGarbageCollectionTime = Number.NEGATIVE_INFINITY, this.primaryStateListener = function (t) {
          return Promise.resolve()
        }, !zs.isAvailable()) throw new Qr(Ur.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
        if (this.referenceDelegate = new eu(this, o), this.dbName = t + zs.MAIN_DATABASE, this.serializer = new As(i), this.document = n.document, this.allowTabSynchronization = void 0 !== a, this.queryCache = new sa(this.referenceDelegate, this.serializer), this.indexManager = new Ts, this.remoteDocumentCache = new ka(this.serializer, this.indexManager, this.allowTabSynchronization), !n.window || !n.window.localStorage) throw new Qr(Ur.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
        this.window = n.window, this.webStorage = this.window.localStorage
      }

      function Hs(e) {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            if (!function (t) {
              return t.code === Ur.FAILED_PRECONDITION && t.message === Qs
            }(e)) throw e;
            return _r(Us, "Unexpectedly lost primary lease"), [2]
          })
        })
      }

      function Ys(t) {
        return t.store(za.store)
      }

      function Xs(t) {
        return t.store(vs.store)
      }

      var Js, $s, Zs, tu, eu = (nu.prototype.getSequenceNumberCount = function (t) {
        var n = this.orphanedDocmentCount(t);
        return this.db.getQueryCache().getQueryCount(t).next(function (e) {
          return n.next(function (t) {
            return e + t
          })
        })
      }, nu.prototype.orphanedDocmentCount = function (t) {
        var e = 0;
        return this.forEachOrphanedDocumentSequenceNumber(t, function (t) {
          e++
        }).next(function () {
          return e
        })
      }, nu.prototype.forEachTarget = function (t, e) {
        return this.db.getQueryCache().forEachTarget(t, e)
      }, nu.prototype.forEachOrphanedDocumentSequenceNumber = function (t, n) {
        return this.forEachOrphanedDocument(t, function (t, e) {
          return n(e)
        })
      }, nu.prototype.setInMemoryPins = function (t) {
        this.inMemoryPins = t
      }, nu.prototype.addReference = function (t, e) {
        return ru(t, e)
      }, nu.prototype.removeReference = function (t, e) {
        return ru(t, e)
      }, nu.prototype.removeTargets = function (t, e, n) {
        return this.db.getQueryCache().removeTargets(t, e, n)
      }, nu.prototype.removeMutationReference = function (t, e) {
        return ru(t, e)
      }, nu.prototype.isPinned = function (t, e) {
        return this.inMemoryPins.containsKey(e) ? Po.resolve(!0) : function (e, n) {
          var r = !1;
          return Go(e).iterateSerial(function (t) {
            return Vo(e, t, n).next(function (t) {
              return t && (r = !0), Po.resolve(!t)
            })
          }).next(function () {
            return r
          })
        }(t, e)
      }, nu.prototype.removeOrphanedDocuments = function (r, i) {
        var o = this, a = 0, s = 0, u = [];
        return this.forEachOrphanedDocument(r, function (e, t) {
          if (t <= i) {
            var n = o.isPinned(r, e).next(function (t) {
              if (!t) return a++, o.removeOrphanedDocument(r, e).next(function (t) {
                s += t
              })
            });
            u.push(n)
          }
        }).next(function () {
          return Po.waitFor(u)
        }).next(function () {
          return o.db.getRemoteDocumentCache().updateSize(r, -s)
        }).next(function () {
          return a
        })
      }, nu.prototype.removeOrphanedDocument = function (t, e) {
        var n = 0, r = this.db.getRemoteDocumentCache();
        return Po.waitFor([fa(t).delete(function (t) {
          return [0, Zi(t.path)]
        }(e)), r.removeEntry(t, e).next(function (t) {
          n += t
        })]).next(function () {
          return n
        })
      }, nu.prototype.removeTarget = function (t, e) {
        var n = e.copy({sequenceNumber: t.currentSequenceNumber});
        return this.db.getQueryCache().updateQueryData(t, n)
      }, nu.prototype.updateLimboDocument = function (t, e) {
        return ru(t, e)
      }, nu.prototype.forEachOrphanedDocument = function (t, o) {
        var a, e = fa(t), s = Ai.INVALID;
        return e.iterate({index: cs.documentTargetsIndex}, function (t, e) {
          var n = t[0], r = (t[1], e.path), i = e.sequenceNumber;
          0 === n ? (s !== Ai.INVALID && o(new Bi(no(a)), s), s = i, a = r) : s = Ai.INVALID
        }).next(function () {
          s !== Ai.INVALID && o(new Bi(no(a)), s)
        })
      }, nu.prototype.getCacheSize = function (t) {
        return this.db.getRemoteDocumentCache().getSize(t)
      }, nu);

      function nu(t, e) {
        this.db = t, this.garbageCollector = new Fs(this, e)
      }

      function ru(t, e) {
        return fa(t).put(function (t, e) {
          return new cs(0, Zi(t.path), e)
        }(e, t.currentSequenceNumber))
      }

      ($s = Js = Js || {})[$s.NullValue = 0] = "NullValue", $s[$s.BooleanValue = 1] = "BooleanValue", $s[$s.NumberValue = 2] = "NumberValue", $s[$s.TimestampValue = 3] = "TimestampValue", $s[$s.StringValue = 4] = "StringValue", $s[$s.BlobValue = 5] = "BlobValue", $s[$s.RefValue = 6] = "RefValue", $s[$s.GeoPointValue = 7] = "GeoPointValue", $s[$s.ArrayValue = 8] = "ArrayValue", $s[$s.ObjectValue = 9] = "ObjectValue", (tu = Zs = Zs || {})[tu.Default = 0] = "Default", tu[tu.Estimate = 1] = "Estimate", tu[tu.Previous = 2] = "Previous";
      var iu = (ou.fromSnapshotOptions = function (t, e) {
        switch (t.serverTimestamps) {
          case"estimate":
            return new ou(Zs.Estimate, e);
          case"previous":
            return new ou(Zs.Previous, e);
          case"none":
          case void 0:
            return new ou(Zs.Default, e);
          default:
            return Pr("fromSnapshotOptions() called with invalid options.")
        }
      }, ou);

      function ou(t, e) {
        this.serverTimestampBehavior = t, this.timestampsInSnapshots = e
      }

      var au = (su.prototype.toString = function () {
        var t = this.value();
        return null === t ? "null" : t.toString()
      }, su.prototype.defaultCompareTo = function (t) {
        return xr(this.typeOrder !== t.typeOrder, "Default compareTo should not be used for values of same type."), yi(this.typeOrder, t.typeOrder)
      }, su);

      function su() {
      }

      var uu, cu = (s(hu, uu = au), hu.prototype.value = function (t) {
        return null
      }, hu.prototype.isEqual = function (t) {
        return t instanceof hu
      }, hu.prototype.compareTo = function (t) {
        return t instanceof hu ? 0 : this.defaultCompareTo(t)
      }, hu.INSTANCE = new hu, hu);

      function hu() {
        var t = uu.call(this) || this;
        return t.typeOrder = Js.NullValue, t.internalValue = null, t
      }

      var lu, fu = (s(pu, lu = au), pu.prototype.value = function (t) {
        return this.internalValue
      }, pu.prototype.isEqual = function (t) {
        return t instanceof pu && this.internalValue === t.internalValue
      }, pu.prototype.compareTo = function (t) {
        return t instanceof pu ? yi(this, t) : this.defaultCompareTo(t)
      }, pu.of = function (t) {
        return t ? pu.TRUE : pu.FALSE
      }, pu.TRUE = new pu(!0), pu.FALSE = new pu(!1), pu);

      function pu(t) {
        var e = lu.call(this) || this;
        return e.internalValue = t, e.typeOrder = Js.BooleanValue, e
      }

      var du, mu = (s(yu, du = au), yu.prototype.value = function (t) {
        return this.internalValue
      }, yu.prototype.compareTo = function (t) {
        return t instanceof yu ? function (t, e) {
          return t < e ? -1 : e < t ? 1 : t === e ? 0 : isNaN(t) ? isNaN(e) ? 0 : -1 : 1
        }(this.internalValue, t.internalValue) : this.defaultCompareTo(t)
      }, yu);

      function yu(t) {
        var e = du.call(this) || this;
        return e.internalValue = t, e.typeOrder = Js.NumberValue, e
      }

      function gu(t, e) {
        return t === e ? 0 !== t || 1 / t == 1 / e : t != t && e != e
      }

      var vu, bu = (s(wu, vu = mu), wu.prototype.isEqual = function (t) {
        return t instanceof wu && gu(this.internalValue, t.internalValue)
      }, wu);

      function wu() {
        return null !== vu && vu.apply(this, arguments) || this
      }

      var Eu, Su = (s(Tu, Eu = mu), Tu.prototype.isEqual = function (t) {
        return t instanceof Tu && gu(this.internalValue, t.internalValue)
      }, Tu.NAN = new Tu(NaN), Tu.POSITIVE_INFINITY = new Tu(1 / 0), Tu.NEGATIVE_INFINITY = new Tu(-1 / 0), Tu);

      function Tu() {
        return null !== Eu && Eu.apply(this, arguments) || this
      }

      var Iu, Cu = (s(Du, Iu = au), Du.prototype.value = function (t) {
        return this.internalValue
      }, Du.prototype.isEqual = function (t) {
        return t instanceof Du && this.internalValue === t.internalValue
      }, Du.prototype.compareTo = function (t) {
        return t instanceof Du ? yi(this.internalValue, t.internalValue) : this.defaultCompareTo(t)
      }, Du);

      function Du(t) {
        var e = Iu.call(this) || this;
        return e.internalValue = t, e.typeOrder = Js.StringValue, e
      }

      var Nu, Au = (s(ku, Nu = au), ku.prototype.value = function (t) {
        return !t || t.timestampsInSnapshots ? this.internalValue : this.internalValue.toDate()
      }, ku.prototype.isEqual = function (t) {
        return t instanceof ku && this.internalValue.isEqual(t.internalValue)
      }, ku.prototype.compareTo = function (t) {
        return t instanceof ku ? this.internalValue._compareTo(t.internalValue) : t instanceof Mu ? -1 : this.defaultCompareTo(t)
      }, ku);

      function ku(t) {
        var e = Nu.call(this) || this;
        return e.internalValue = t, e.typeOrder = Js.TimestampValue, e
      }

      var Ru, Mu = (s(_u, Ru = au), _u.prototype.value = function (t) {
        return t && t.serverTimestampBehavior === Zs.Estimate ? new Au(this.localWriteTime).value(t) : t && t.serverTimestampBehavior === Zs.Previous && this.previousValue ? this.previousValue.value(t) : null
      }, _u.prototype.isEqual = function (t) {
        return t instanceof _u && this.localWriteTime.isEqual(t.localWriteTime)
      }, _u.prototype.compareTo = function (t) {
        return t instanceof _u ? this.localWriteTime._compareTo(t.localWriteTime) : t instanceof Au ? 1 : this.defaultCompareTo(t)
      }, _u.prototype.toString = function () {
        return "<ServerTimestamp localTime=" + this.localWriteTime.toString() + ">"
      }, _u);

      function _u(t, e) {
        var n = Ru.call(this) || this;
        return n.localWriteTime = t, n.previousValue = e, n.typeOrder = Js.TimestampValue, n
      }

      var Ou, Lu = (s(Pu, Ou = au), Pu.prototype.value = function (t) {
        return this.internalValue
      }, Pu.prototype.isEqual = function (t) {
        return t instanceof Pu && this.internalValue.isEqual(t.internalValue)
      }, Pu.prototype.compareTo = function (t) {
        return t instanceof Pu ? this.internalValue._compareTo(t.internalValue) : this.defaultCompareTo(t)
      }, Pu);

      function Pu(t) {
        var e = Ou.call(this) || this;
        return e.internalValue = t, e.typeOrder = Js.BlobValue, e
      }

      var xu, qu = (s(Fu, xu = au), Fu.prototype.value = function (t) {
        return this.key
      }, Fu.prototype.isEqual = function (t) {
        return t instanceof Fu && this.key.isEqual(t.key) && this.databaseId.isEqual(t.databaseId)
      }, Fu.prototype.compareTo = function (t) {
        if (t instanceof Fu) {
          var e = this.databaseId.compareTo(t.databaseId);
          return 0 !== e ? e : Bi.comparator(this.key, t.key)
        }
        return this.defaultCompareTo(t)
      }, Fu);

      function Fu(t, e) {
        var n = xu.call(this) || this;
        return n.databaseId = t, n.key = e, n.typeOrder = Js.RefValue, n
      }

      var Vu, Bu = (s(Uu, Vu = au), Uu.prototype.value = function (t) {
        return this.internalValue
      }, Uu.prototype.isEqual = function (t) {
        return t instanceof Uu && this.internalValue.isEqual(t.internalValue)
      }, Uu.prototype.compareTo = function (t) {
        return t instanceof Uu ? this.internalValue._compareTo(t.internalValue) : this.defaultCompareTo(t)
      }, Uu);

      function Uu(t) {
        var e = Vu.call(this) || this;
        return e.internalValue = t, e.typeOrder = Js.GeoPointValue, e
      }

      var Qu, Ku = (s(Gu, Qu = au), Gu.prototype.value = function (n) {
        var r = {};
        return this.internalValue.inorderTraversal(function (t, e) {
          r[t] = e.value(n)
        }), r
      }, Gu.prototype.forEach = function (t) {
        this.internalValue.inorderTraversal(t)
      }, Gu.prototype.isEqual = function (t) {
        if (t instanceof Gu) {
          for (var e = this.internalValue.getIterator(), n = t.internalValue.getIterator(); e.hasNext() && n.hasNext();) {
            var r = e.getNext(), i = n.getNext();
            if (r.key !== i.key || !r.value.isEqual(i.value)) return !1
          }
          return !e.hasNext() && !n.hasNext()
        }
        return !1
      }, Gu.prototype.compareTo = function (t) {
        if (t instanceof Gu) {
          for (var e = this.internalValue.getIterator(), n = t.internalValue.getIterator(); e.hasNext() && n.hasNext();) {
            var r = e.getNext(), i = n.getNext(), o = yi(r.key, i.key) || r.value.compareTo(i.value);
            if (o) return o
          }
          return yi(e.hasNext(), n.hasNext())
        }
        return this.defaultCompareTo(t)
      }, Gu.prototype.set = function (t, e) {
        if (xr(!t.isEmpty(), "Cannot set field for empty path on ObjectValue"), 1 === t.length) return this.setChild(t.firstSegment(), e);
        var n = this.child(t.firstSegment());
        n instanceof Gu || (n = Gu.EMPTY);
        var r = n.set(t.popFirst(), e);
        return this.setChild(t.firstSegment(), r)
      }, Gu.prototype.delete = function (t) {
        if (xr(!t.isEmpty(), "Cannot delete field for empty path on ObjectValue"), 1 === t.length) return new Gu(this.internalValue.remove(t.firstSegment()));
        var e = this.child(t.firstSegment());
        if (e instanceof Gu) {
          var n = e.delete(t.popFirst());
          return new Gu(this.internalValue.insert(t.firstSegment(), n))
        }
        return this
      }, Gu.prototype.contains = function (t) {
        return null !== this.field(t)
      }, Gu.prototype.field = function (t) {
        xr(!t.isEmpty(), "Can't get field of empty path");
        var e = this;
        return t.forEach(function (t) {
          e = e instanceof Gu ? e.internalValue.get(t) : null
        }), e
      }, Gu.prototype.fieldMask = function () {
        var i = new yo(Fi.comparator);
        return this.internalValue.forEach(function (t, e) {
          var n = new Fi([t]);
          if (e instanceof Gu) {
            var r = e.fieldMask().fields;
            r.isEmpty() ? i = i.add(n) : r.forEach(function (t) {
              i = i.add(n.child(t))
            })
          } else i = i.add(n)
        }), Hu.fromSet(i)
      }, Gu.prototype.toString = function () {
        return this.internalValue.toString()
      }, Gu.prototype.child = function (t) {
        return this.internalValue.get(t) || void 0
      }, Gu.prototype.setChild = function (t, e) {
        return new Gu(this.internalValue.insert(t, e))
      }, Gu.EMPTY = new Gu(new so(yi)), Gu);

      function Gu(t) {
        var e = Qu.call(this) || this;
        return e.internalValue = t, e.typeOrder = Js.ObjectValue, e
      }

      var ju, Wu = (s(zu, ju = au), zu.prototype.value = function (e) {
        return this.internalValue.map(function (t) {
          return t.value(e)
        })
      }, zu.prototype.contains = function (t) {
        for (var e = 0, n = this.internalValue; e < n.length; e++) if (n[e].isEqual(t)) return !0;
        return !1
      }, zu.prototype.forEach = function (t) {
        this.internalValue.forEach(t)
      }, zu.prototype.isEqual = function (t) {
        if (t instanceof zu) {
          if (this.internalValue.length !== t.internalValue.length) return !1;
          for (var e = 0; e < this.internalValue.length; e++) if (!this.internalValue[e].isEqual(t.internalValue[e])) return !1;
          return !0
        }
        return !1
      }, zu.prototype.compareTo = function (t) {
        if (t instanceof zu) {
          for (var e = Math.min(this.internalValue.length, t.internalValue.length), n = 0; n < e; n++) {
            var r = this.internalValue[n].compareTo(t.internalValue[n]);
            if (r) return r
          }
          return yi(this.internalValue.length, t.internalValue.length)
        }
        return this.defaultCompareTo(t)
      }, zu.prototype.toString = function () {
        return "[" + this.internalValue.map(function (t) {
          return t.toString()
        }).join(",") + "]"
      }, zu);

      function zu(t) {
        var e = ju.call(this) || this;
        return e.internalValue = t, e.typeOrder = Js.ArrayValue, e
      }

      var Hu = (Yu.fromSet = function (t) {
        return new Yu(t)
      }, Yu.fromArray = function (t) {
        var e = new yo(Fi.comparator);
        return t.forEach(function (t) {
          return e = e.add(t)
        }), new Yu(e)
      }, Yu.prototype.covers = function (e) {
        var n = !1;
        return this.fields.forEach(function (t) {
          t.isPrefixOf(e) && (n = !0)
        }), n
      }, Yu.prototype.isEqual = function (t) {
        return this.fields.isEqual(t.fields)
      }, Yu);

      function Yu(t) {
        this.fields = t
      }

      var Xu = (Ju.prototype.isEqual = function (t) {
        return this.field.isEqual(t.field) && this.transform.isEqual(t.transform)
      }, Ju);

      function Ju(t, e) {
        this.field = t, this.transform = e
      }

      var $u, Zu, tc = function (t, e) {
        this.version = t, this.transformResults = e
      };
      (Zu = $u = $u || {})[Zu.Set = 0] = "Set", Zu[Zu.Patch = 1] = "Patch", Zu[Zu.Transform = 2] = "Transform", Zu[Zu.Delete = 3] = "Delete";
      var ec = (nc.exists = function (t) {
        return new nc(void 0, t)
      }, nc.updateTime = function (t) {
        return new nc(t)
      }, Object.defineProperty(nc.prototype, "isNone", {
        get: function () {
          return void 0 === this.updateTime && void 0 === this.exists
        }, enumerable: !0, configurable: !0
      }), nc.prototype.isValidFor = function (t) {
        return void 0 !== this.updateTime ? t instanceof ya && t.version.isEqual(this.updateTime) : void 0 !== this.exists ? this.exists === t instanceof ya : (xr(this.isNone, "Precondition should be empty"), !0)
      }, nc.prototype.isEqual = function (t) {
        return function (t, e) {
          return null != t ? !(!e || !t.isEqual(e)) : t === e
        }(this.updateTime, t.updateTime) && this.exists === t.exists
      }, nc.NONE = new nc, nc);

      function nc(t, e) {
        this.updateTime = t, this.exists = e, xr(void 0 === t || void 0 === e, 'Precondition can specify "exists" or "updateTime" but not both')
      }

      var rc = (ic.prototype.verifyKeyMatches = function (t) {
        null != t && xr(t.key.isEqual(this.key), "Can only apply a mutation to a document with the same key")
      }, ic.getPostMutationVersion = function (t) {
        return t instanceof ya ? t.version : oo.MIN
      }, ic);

      function ic() {
      }

      var oc, ac = (s(sc, oc = rc), sc.prototype.applyToRemoteDocument = function (t, e) {
        this.verifyKeyMatches(t), xr(null == e.transformResults, "Transform results received by SetMutation.");
        var n = e.version;
        return new ya(this.key, n, this.value, {hasCommittedMutations: !0})
      }, sc.prototype.applyToLocalView = function (t, e, n) {
        if (this.verifyKeyMatches(t), !this.precondition.isValidFor(t)) return t;
        var r = rc.getPostMutationVersion(t);
        return new ya(this.key, r, this.value, {hasLocalMutations: !0})
      }, sc.prototype.extractBaseValue = function (t) {
        return null
      }, sc.prototype.isEqual = function (t) {
        return t instanceof sc && this.key.isEqual(t.key) && this.value.isEqual(t.value) && this.precondition.isEqual(t.precondition)
      }, sc);

      function sc(t, e, n) {
        var r = oc.call(this) || this;
        return r.key = t, r.value = e, r.precondition = n, r.type = $u.Set, r
      }

      var uc, cc = (s(hc, uc = rc), hc.prototype.applyToRemoteDocument = function (t, e) {
        if (this.verifyKeyMatches(t), xr(null == e.transformResults, "Transform results received by PatchMutation."), !this.precondition.isValidFor(t)) return new Sa(this.key, e.version);
        var n = this.patchDocument(t);
        return new ya(this.key, e.version, n, {hasCommittedMutations: !0})
      }, hc.prototype.applyToLocalView = function (t, e, n) {
        if (this.verifyKeyMatches(t), !this.precondition.isValidFor(t)) return t;
        var r = rc.getPostMutationVersion(t), i = this.patchDocument(t);
        return new ya(this.key, r, i, {hasLocalMutations: !0})
      }, hc.prototype.extractBaseValue = function (t) {
        return null
      }, hc.prototype.isEqual = function (t) {
        return t instanceof hc && this.key.isEqual(t.key) && this.fieldMask.isEqual(t.fieldMask) && this.precondition.isEqual(t.precondition)
      }, hc.prototype.patchDocument = function (t) {
        var e;
        return e = t instanceof ya ? t.data : Ku.EMPTY, this.patchObject(e)
      }, hc.prototype.patchObject = function (n) {
        var r = this;
        return this.fieldMask.fields.forEach(function (t) {
          if (!t.isEmpty()) {
            var e = r.data.field(t);
            n = null !== e ? n.set(t, e) : n.delete(t)
          }
        }), n
      }, hc);

      function hc(t, e, n, r) {
        var i = uc.call(this) || this;
        return i.key = t, i.data = e, i.fieldMask = n, i.precondition = r, i.type = $u.Patch, i
      }

      var lc, fc = (s(pc, lc = rc), pc.prototype.applyToRemoteDocument = function (t, e) {
        if (this.verifyKeyMatches(t), xr(null != e.transformResults, "Transform results missing for TransformMutation."), !this.precondition.isValidFor(t)) return new Sa(this.key, e.version);
        var n = this.requireDocument(t), r = this.serverTransformResults(t, e.transformResults), i = e.version,
          o = this.transformObject(n.data, r);
        return new ya(this.key, i, o, {hasCommittedMutations: !0})
      }, pc.prototype.applyToLocalView = function (t, e, n) {
        if (this.verifyKeyMatches(t), !this.precondition.isValidFor(t)) return t;
        var r = this.requireDocument(t), i = this.localTransformResults(n, t, e), o = this.transformObject(r.data, i);
        return new ya(this.key, r.version, o, {hasLocalMutations: !0})
      }, pc.prototype.extractBaseValue = function (t) {
        for (var e = null, n = 0, r = this.fieldTransforms; n < r.length; n++) {
          var i = r[n], o = t instanceof ya ? t.field(i.field) : void 0, a = i.transform.computeBaseValue(o || null);
          null != a && (e = null == e ? Ku.EMPTY.set(i.field, a) : e.set(i.field, a))
        }
        return e
      }, pc.prototype.isEqual = function (t) {
        return t instanceof pc && this.key.isEqual(t.key) && gi(this.fieldTransforms, t.fieldTransforms) && this.precondition.isEqual(t.precondition)
      }, pc.prototype.requireDocument = function (t) {
        xr(t instanceof ya, "Unknown MaybeDocument type " + t);
        var e = t;
        return xr(e.key.isEqual(this.key), "Can only transform a document with the same key"), e
      }, pc.prototype.serverTransformResults = function (t, e) {
        var n = [];
        xr(this.fieldTransforms.length === e.length, "server transform result count (" + e.length + ") should match field transform count (" + this.fieldTransforms.length + ")");
        for (var r = 0; r < e.length; r++) {
          var i = this.fieldTransforms[r], o = i.transform, a = null;
          t instanceof ya && (a = t.field(i.field)), n.push(o.applyToRemoteDocument(a, e[r]))
        }
        return n
      }, pc.prototype.localTransformResults = function (t, e, n) {
        for (var r = [], i = 0, o = this.fieldTransforms; i < o.length; i++) {
          var a = o[i], s = a.transform, u = null;
          e instanceof ya && (u = e.field(a.field)), null === u && n instanceof ya && (u = n.field(a.field)), r.push(s.applyToLocalView(u, t))
        }
        return r
      }, pc.prototype.transformObject = function (t, e) {
        xr(e.length === this.fieldTransforms.length, "TransformResults length mismatch.");
        for (var n = 0; n < this.fieldTransforms.length; n++) {
          var r = this.fieldTransforms[n].field;
          t = t.set(r, e[n])
        }
        return t
      }, pc);

      function pc(t, e) {
        var n = lc.call(this) || this;
        return n.key = t, n.fieldTransforms = e, n.type = $u.Transform, n.precondition = ec.exists(!0), n
      }

      var dc, mc = (s(yc, dc = rc), yc.prototype.applyToRemoteDocument = function (t, e) {
        return this.verifyKeyMatches(t), xr(null == e.transformResults, "Transform results received by DeleteMutation."), new ba(this.key, e.version, {hasCommittedMutations: !0})
      }, yc.prototype.applyToLocalView = function (t, e, n) {
        return this.verifyKeyMatches(t), this.precondition.isValidFor(t) ? (t && xr(t.key.isEqual(this.key), "Can only apply mutation to document with same key"), new ba(this.key, oo.forDeletedDoc())) : t
      }, yc.prototype.extractBaseValue = function (t) {
        return null
      }, yc.prototype.isEqual = function (t) {
        return t instanceof yc && this.key.isEqual(t.key) && this.precondition.isEqual(t.precondition)
      }, yc);

      function yc(t, e) {
        var n = dc.call(this) || this;
        return n.key = t, n.precondition = e, n.type = $u.Delete, n
      }

      var gc = (vc.prototype.getDocument = function (e, n) {
        var r = this;
        return this.mutationQueue.getAllMutationBatchesAffectingDocumentKey(e, n).next(function (t) {
          return r.getDocumentInternal(e, n, t)
        })
      }, vc.prototype.getDocumentInternal = function (t, r, i) {
        return this.remoteDocumentCache.getEntry(t, r).next(function (t) {
          for (var e = 0, n = i; e < n.length; e++) t = n[e].applyToLocalView(r, t);
          return t
        })
      }, vc.prototype.applyLocalMutationsToDocuments = function (t, e, i) {
        var o = So();
        return e.forEach(function (t, e) {
          for (var n = 0, r = i; n < r.length; n++) e = r[n].applyToLocalView(t, e);
          o = o.insert(t, e)
        }), o
      }, vc.prototype.getDocuments = function (e, t) {
        var n = this;
        return this.remoteDocumentCache.getEntries(e, t).next(function (t) {
          return n.getLocalViewOfDocuments(e, t)
        })
      }, vc.prototype.getLocalViewOfDocuments = function (r, i) {
        var o = this;
        return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(r, i).next(function (t) {
          var e = o.applyLocalMutationsToDocuments(r, i, t), n = Eo();
          return e.forEach(function (t, e) {
            e = e || new ba(t, oo.forDeletedDoc()), n = n.insert(t, e)
          }), n
        })
      }, vc.prototype.getDocumentsMatchingQuery = function (t, e) {
        return e.isDocumentQuery() ? this.getDocumentsMatchingDocumentQuery(t, e.path) : e.isCollectionGroupQuery() ? this.getDocumentsMatchingCollectionGroupQuery(t, e) : this.getDocumentsMatchingCollectionQuery(t, e)
      }, vc.prototype.getDocumentsMatchingDocumentQuery = function (t, e) {
        return this.getDocument(t, new Bi(e)).next(function (t) {
          var e = Io();
          return t instanceof ya && (e = e.insert(t.key, t)), e
        })
      }, vc.prototype.getDocumentsMatchingCollectionGroupQuery = function (n, r) {
        var i = this;
        xr(r.path.isEmpty(), "Currently we only support collection group queries at the root.");
        var o = r.collectionGroup, a = Io();
        return this.indexManager.getCollectionParents(n, o).next(function (t) {
          return Po.forEach(t, function (t) {
            var e = r.asCollectionQueryAtPath(t.child(o));
            return i.getDocumentsMatchingCollectionQuery(n, e).next(function (t) {
              t.forEach(function (t, e) {
                a = a.insert(t, e)
              })
            })
          }).next(function () {
            return a
          })
        })
      }, vc.prototype.getDocumentsMatchingCollectionQuery = function (e, n) {
        var h, l, r = this;
        return this.remoteDocumentCache.getDocumentsMatchingQuery(e, n).next(function (t) {
          return h = t, r.mutationQueue.getAllMutationBatchesAffectingQuery(e, n)
        }).next(function (t) {
          return l = t, r.addMissingBaseDocuments(e, l, h).next(function (t) {
            h = t;
            for (var e = 0, n = l; e < n.length; e++) for (var r = n[e], i = 0, o = r.mutations; i < o.length; i++) {
              var a = o[i], s = a.key, u = h.get(s), c = a.applyToLocalView(u, u, r.localWriteTime);
              h = c instanceof ya ? h.insert(s, c) : h.remove(s)
            }
          })
        }).next(function () {
          return h.forEach(function (t, e) {
            n.matches(e) || (h = h.remove(t))
          }), h
        })
      }, vc.prototype.addMissingBaseDocuments = function (t, e, n) {
        for (var r = Ao(), i = 0, o = e; i < o.length; i++) for (var a = 0, s = o[i].mutations; a < s.length; a++) {
          var u = s[a];
          u instanceof cc && null === n.get(u.key) && (r = r.add(u.key))
        }
        var c = n;
        return this.remoteDocumentCache.getEntries(t, r).next(function (t) {
          return t.forEach(function (t, e) {
            null !== e && e instanceof ya && (c = c.insert(t, e))
          }), c
        })
      }, vc);

      function vc(t, e, n) {
        this.remoteDocumentCache = t, this.mutationQueue = e, this.indexManager = n
      }

      var bc = (wc.prototype.isEmpty = function () {
        return this.refsByKey.isEmpty()
      }, wc.prototype.addReference = function (t, e) {
        var n = new Ec(t, e);
        this.refsByKey = this.refsByKey.add(n), this.refsByTarget = this.refsByTarget.add(n)
      }, wc.prototype.addReferences = function (t, e) {
        var n = this;
        t.forEach(function (t) {
          return n.addReference(t, e)
        })
      }, wc.prototype.removeReference = function (t, e) {
        this.removeRef(new Ec(t, e))
      }, wc.prototype.removeReferences = function (t, e) {
        var n = this;
        t.forEach(function (t) {
          return n.removeReference(t, e)
        })
      }, wc.prototype.removeReferencesForId = function (t) {
        var e = this, n = Bi.EMPTY, r = new Ec(n, t), i = new Ec(n, t + 1), o = [];
        return this.refsByTarget.forEachInRange([r, i], function (t) {
          e.removeRef(t), o.push(t.key)
        }), o
      }, wc.prototype.removeAllReferences = function () {
        var e = this;
        this.refsByKey.forEach(function (t) {
          return e.removeRef(t)
        })
      }, wc.prototype.removeRef = function (t) {
        this.refsByKey = this.refsByKey.delete(t), this.refsByTarget = this.refsByTarget.delete(t)
      }, wc.prototype.referencesForId = function (t) {
        var e = Bi.EMPTY, n = new Ec(e, t), r = new Ec(e, t + 1), i = Ao();
        return this.refsByTarget.forEachInRange([n, r], function (t) {
          i = i.add(t.key)
        }), i
      }, wc.prototype.containsKey = function (t) {
        var e = new Ec(t, 0), n = this.refsByKey.firstAfterOrEqual(e);
        return null !== n && t.isEqual(n.key)
      }, wc);

      function wc() {
        this.refsByKey = new yo(Ec.compareByKey), this.refsByTarget = new yo(Ec.compareByTargetId)
      }

      var Ec = (Sc.compareByKey = function (t, e) {
        return Bi.comparator(t.key, e.key) || yi(t.targetOrBatchId, e.targetOrBatchId)
      }, Sc.compareByTargetId = function (t, e) {
        return yi(t.targetOrBatchId, e.targetOrBatchId) || Bi.comparator(t.key, e.key)
      }, Sc);

      function Sc(t, e) {
        this.key = t, this.targetOrBatchId = e
      }

      var Tc = (Ic.prototype.handleUserChange = function (e) {
        var y = this;
        return this.persistence.runTransaction("Handle user change", "readonly", function (d) {
          var m;
          return y.mutationQueue.getAllMutationBatches(d).next(function (t) {
            return m = t, y.mutationQueue = y.persistence.getMutationQueue(e), y.localDocuments = new gc(y.remoteDocuments, y.mutationQueue, y.persistence.getIndexManager()), y.mutationQueue.getAllMutationBatches(d)
          }).next(function (t) {
            for (var e = [], n = [], r = Ao(), i = 0, o = m; i < o.length; i++) {
              var a = o[i];
              e.push(a.batchId);
              for (var s = 0, u = a.mutations; s < u.length; s++) {
                var c = u[s];
                r = r.add(c.key)
              }
            }
            for (var h = 0, l = t; h < l.length; h++) {
              a = l[h], n.push(a.batchId);
              for (var f = 0, p = a.mutations; f < p.length; f++) c = p[f], r = r.add(c.key)
            }
            return y.localDocuments.getDocuments(d, r).next(function (t) {
              return {affectedDocuments: t, removedBatchIds: e, addedBatchIds: n}
            })
          })
        })
      }, Ic.prototype.localWrite = function (s) {
        var u = this, c = ro.now(), t = s.reduce(function (t, e) {
          return t.add(e.key)
        }, Ao());
        return this.persistence.runTransaction("Locally write mutations", "readwrite", function (a) {
          return u.localDocuments.getDocuments(a, t).next(function (n) {
            for (var t = [], e = 0, r = s; e < r.length; e++) {
              var i = r[e], o = i.extractBaseValue(n.get(i.key));
              null != o && t.push(new cc(i.key, o, o.fieldMask(), ec.exists(!0)))
            }
            return u.mutationQueue.addMutationBatch(a, c, t, s).next(function (t) {
              var e = t.applyToLocalDocumentSet(n);
              return {batchId: t.batchId, changes: e}
            })
          })
        })
      }, Ic.prototype.lookupMutationDocuments = function (t) {
        var n = this;
        return this.persistence.runTransaction("Lookup mutation documents", "readonly", function (e) {
          return n.mutationQueue.lookupMutationKeys(e, t).next(function (t) {
            return t ? n.localDocuments.getDocuments(e, t) : Po.resolve(null)
          })
        })
      }, Ic.prototype.acknowledgeBatch = function (r) {
        var i = this;
        return this.persistence.runTransaction("Acknowledge batch", "readwrite-primary", function (t) {
          var e = r.batch.keys(), n = i.remoteDocuments.newChangeBuffer();
          return i.mutationQueue.acknowledgeBatch(t, r.batch, r.streamToken).next(function () {
            return i.applyWriteToRemoteDocuments(t, r, n)
          }).next(function () {
            return n.apply(t)
          }).next(function () {
            return i.mutationQueue.performConsistencyCheck(t)
          }).next(function () {
            return i.localDocuments.getDocuments(t, e)
          })
        })
      }, Ic.prototype.rejectBatch = function (t) {
        var r = this;
        return this.persistence.runTransaction("Reject batch", "readwrite-primary", function (e) {
          var n;
          return r.mutationQueue.lookupMutationBatch(e, t).next(function (t) {
            return xr(null !== t, "Attempt to reject nonexistent batch!"), n = t.keys(), r.mutationQueue.removeMutationBatch(e, t)
          }).next(function () {
            return r.mutationQueue.performConsistencyCheck(e)
          }).next(function () {
            return r.localDocuments.getDocuments(e, n)
          })
        })
      }, Ic.prototype.getLastStreamToken = function () {
        var e = this;
        return this.persistence.runTransaction("Get last stream token", "readonly", function (t) {
          return e.mutationQueue.getLastStreamToken(t)
        })
      }, Ic.prototype.setLastStreamToken = function (e) {
        var n = this;
        return this.persistence.runTransaction("Set last stream token", "readwrite-primary", function (t) {
          return n.mutationQueue.setLastStreamToken(t, e)
        })
      }, Ic.prototype.getLastRemoteSnapshotVersion = function () {
        var e = this;
        return this.persistence.runTransaction("Get last remote snapshot version", "readonly", function (t) {
          return e.queryCache.getLastRemoteSnapshotVersion(t)
        })
      }, Ic.prototype.applyRemoteEvent = function (u) {
        var c = this, h = this.remoteDocuments.newChangeBuffer();
        return this.persistence.runTransaction("Apply remote event", "readwrite-primary", function (o) {
          var a = [], s = Ao();
          zr(u.targetChanges, function (t, e) {
            var n = c.queryDataByTarget[t];
            if (n) {
              e.addedDocuments.forEach(function (t) {
                s = s.add(t)
              }), e.modifiedDocuments.forEach(function (t) {
                s = s.add(t)
              }), a.push(c.queryCache.removeMatchingKeys(o, e.removedDocuments, t).next(function () {
                return c.queryCache.addMatchingKeys(o, e.addedDocuments, t)
              }));
              var r = e.resumeToken;
              if (0 < r.length) {
                var i = n;
                n = n.copy({
                  resumeToken: r,
                  snapshotVersion: u.snapshotVersion
                }), c.queryDataByTarget[t] = n, Ic.shouldPersistQueryData(i, n, e) && a.push(c.queryCache.updateQueryData(o, n))
              }
            }
          });
          var i = Eo(), n = Ao();
          u.documentUpdates.forEach(function (t, e) {
            n = n.add(t)
          }), a.push(h.getEntries(o, n).next(function (r) {
            u.documentUpdates.forEach(function (t, e) {
              var n = r.get(t);
              null == n || e.version.isEqual(oo.MIN) || s.has(e.key) && !n.hasPendingWrites || 0 <= e.version.compareTo(n.version) ? (h.addEntry(e), i = i.insert(t, e)) : _r("LocalStore", "Ignoring outdated watch update for ", t, ". Current version:", n.version, " Watch version:", e.version), u.resolvedLimboDocuments.has(t) && a.push(c.persistence.referenceDelegate.updateLimboDocument(o, t))
            })
          }));
          var e = u.snapshotVersion;
          if (!e.isEqual(oo.MIN)) {
            var t = c.queryCache.getLastRemoteSnapshotVersion(o).next(function (t) {
              return xr(0 <= e.compareTo(t), "Watch stream reverted to previous snapshot?? " + e + " < " + t), c.queryCache.setTargetsMetadata(o, o.currentSequenceNumber, e)
            });
            a.push(t)
          }
          return Po.waitFor(a).next(function () {
            return h.apply(o)
          }).next(function () {
            return c.localDocuments.getLocalViewOfDocuments(o, i)
          })
        })
      }, Ic.shouldPersistQueryData = function (t, e, n) {
        return 0 !== e.resumeToken.length && (0 === t.resumeToken.length || e.snapshotVersion.toMicroseconds() - t.snapshotVersion.toMicroseconds() >= this.RESUME_TOKEN_MAX_AGE_MICROS || 0 < n.addedDocuments.size + n.modifiedDocuments.size + n.removedDocuments.size)
      }, Ic.prototype.notifyLocalViewChanges = function (t) {
        var n = this;
        return this.persistence.runTransaction("notifyLocalViewChanges", "readwrite", function (e) {
          return Po.forEach(t, function (t) {
            return n.localViewReferences.addReferences(t.addedKeys, t.targetId), n.localViewReferences.removeReferences(t.removedKeys, t.targetId), Po.forEach(t.removedKeys, function (t) {
              return n.persistence.referenceDelegate.removeReference(e, t)
            })
          })
        })
      }, Ic.prototype.nextMutationBatch = function (e) {
        var n = this;
        return this.persistence.runTransaction("Get next mutation batch", "readonly", function (t) {
          return void 0 === e && (e = -1), n.mutationQueue.getNextMutationBatchAfterBatchId(t, e)
        })
      }, Ic.prototype.readDocument = function (e) {
        var n = this;
        return this.persistence.runTransaction("read document", "readonly", function (t) {
          return n.localDocuments.getDocument(t, e)
        })
      }, Ic.prototype.allocateQuery = function (r) {
        var i = this;
        return this.persistence.runTransaction("Allocate query", "readwrite", function (e) {
          var n;
          return i.queryCache.getQueryData(e, r).next(function (t) {
            return t ? (n = t, Po.resolve()) : i.queryCache.allocateTargetId(e).next(function (t) {
              return n = new Ds(r, t, ws.Listen, e.currentSequenceNumber), i.queryCache.addQueryData(e, n)
            })
          }).next(function () {
            return xr(!i.queryDataByTarget[n.targetId], "Tried to allocate an already allocated query: " + r), i.queryDataByTarget[n.targetId] = n
          })
        })
      }, Ic.prototype.releaseQuery = function (o, a) {
        var s = this, t = a ? "readwrite" : "readwrite-primary";
        return this.persistence.runTransaction("Release query", t, function (i) {
          return s.queryCache.getQueryData(i, o).next(function (t) {
            xr(null != t, "Tried to release nonexistent query: " + o);
            var e = t.targetId, n = s.queryDataByTarget[e], r = s.localViewReferences.removeReferencesForId(e);
            return delete s.queryDataByTarget[e], a ? Po.resolve() : Po.forEach(r, function (t) {
              return s.persistence.referenceDelegate.removeReference(i, t)
            }).next(function () {
              return s.persistence.referenceDelegate.removeTarget(i, n)
            })
          })
        })
      }, Ic.prototype.executeQuery = function (e) {
        var n = this;
        return this.persistence.runTransaction("Execute query", "readonly", function (t) {
          return n.localDocuments.getDocumentsMatchingQuery(t, e)
        })
      }, Ic.prototype.remoteDocumentKeys = function (e) {
        var n = this;
        return this.persistence.runTransaction("Remote document keys", "readonly", function (t) {
          return n.queryCache.getMatchingKeysForTargetId(t, e)
        })
      }, Ic.prototype.getActiveClients = function () {
        return this.persistence.getActiveClients()
      }, Ic.prototype.removeCachedMutationBatchMetadata = function (t) {
        this.mutationQueue.removeCachedMutationKeys(t)
      }, Ic.prototype.setNetworkEnabled = function (t) {
        this.persistence.setNetworkEnabled(t)
      }, Ic.prototype.applyWriteToRemoteDocuments = function (t, i, o) {
        var e = this, a = i.batch, n = a.keys(), s = Po.resolve();
        return n.forEach(function (r) {
          s = s.next(function () {
            return o.getEntry(t, r)
          }).next(function (t) {
            var e = t, n = i.docVersions.get(r);
            xr(null !== n, "ackVersions should contain every doc in the write."), (!e || e.version.compareTo(n) < 0) && ((e = a.applyToRemoteDocument(r, e, i)) ? o.addEntry(e) : xr(!t, "Mutation batch " + a + " applied to document " + t + " resulted in null"))
          })
        }), s.next(function () {
          return e.mutationQueue.removeMutationBatch(t, a)
        })
      }, Ic.prototype.collectGarbage = function (e) {
        var n = this;
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", function (t) {
          return e.collect(t, n.queryDataByTarget)
        })
      }, Ic.prototype.getQueryForTarget = function (e) {
        var n = this;
        return this.queryDataByTarget[e] ? Promise.resolve(this.queryDataByTarget[e].query) : this.persistence.runTransaction("Get query data", "readonly", function (t) {
          return n.queryCache.getQueryDataForTarget(t, e).next(function (t) {
            return t ? t.query : null
          })
        })
      }, Ic.prototype.getNewDocumentChanges = function () {
        var e = this;
        return this.persistence.runTransaction("Get new document changes", "readonly", function (t) {
          return e.remoteDocuments.getNewDocumentChanges(t)
        })
      }, Ic.RESUME_TOKEN_MAX_AGE_MICROS = 3e8, Ic);

      function Ic(t, e) {
        this.persistence = t, this.localViewReferences = new bc, this.queryDataByTarget = {}, xr(t.started, "LocalStore was passed an unstarted persistence implementation"), this.persistence.referenceDelegate.setInMemoryPins(this.localViewReferences), this.mutationQueue = t.getMutationQueue(e), this.remoteDocuments = t.getRemoteDocumentCache(), this.queryCache = t.getQueryCache(), this.localDocuments = new gc(this.remoteDocuments, this.mutationQueue, this.persistence.getIndexManager())
      }

      var Cc = (Dc.prototype.checkEmpty = function (t) {
        return Po.resolve(0 === this.mutationQueue.length)
      }, Dc.prototype.acknowledgeBatch = function (t, e, n) {
        var r = e.batchId, i = this.indexOfExistingBatchId(r, "acknowledged");
        xr(0 === i, "Can only acknowledge the first batch in the mutation queue");
        var o = this.mutationQueue[i];
        return xr(r === o.batchId, "Queue ordering failure: expected batch " + r + ", got batch " + o.batchId), this.lastStreamToken = n, Po.resolve()
      }, Dc.prototype.getLastStreamToken = function (t) {
        return Po.resolve(this.lastStreamToken)
      }, Dc.prototype.setLastStreamToken = function (t, e) {
        return this.lastStreamToken = e, Po.resolve()
      }, Dc.prototype.addMutationBatch = function (t, e, n, r) {
        xr(0 !== r.length, "Mutation batches should not be empty");
        var i = this.nextBatchId;
        this.nextBatchId++, 0 < this.mutationQueue.length && xr(this.mutationQueue[this.mutationQueue.length - 1].batchId < i, "Mutation batchIDs must be monotonically increasing order");
        var o = new Mo(i, e, n, r);
        this.mutationQueue.push(o);
        for (var a = 0, s = r; a < s.length; a++) {
          var u = s[a];
          this.batchesByDocumentKey = this.batchesByDocumentKey.add(new Ec(u.key, i)), this.indexManager.addToCollectionParentIndex(t, u.key.path.popLast())
        }
        return Po.resolve(o)
      }, Dc.prototype.lookupMutationBatch = function (t, e) {
        return Po.resolve(this.findMutationBatch(e))
      }, Dc.prototype.lookupMutationKeys = function (t, e) {
        var n = this.findMutationBatch(e);
        return xr(null != n, "Failed to find local mutation batch."), Po.resolve(n.keys())
      }, Dc.prototype.getNextMutationBatchAfterBatchId = function (t, e) {
        var n = e + 1, r = this.indexOfBatchId(n), i = r < 0 ? 0 : r;
        return Po.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null)
      }, Dc.prototype.getAllMutationBatches = function (t) {
        return Po.resolve(this.mutationQueue.slice())
      }, Dc.prototype.getAllMutationBatchesAffectingDocumentKey = function (t, n) {
        var r = this, e = new Ec(n, 0), i = new Ec(n, Number.POSITIVE_INFINITY), o = [];
        return this.batchesByDocumentKey.forEachInRange([e, i], function (t) {
          xr(n.isEqual(t.key), "Should only iterate over a single key's batches");
          var e = r.findMutationBatch(t.targetOrBatchId);
          xr(null !== e, "Batches in the index must exist in the main table"), o.push(e)
        }), Po.resolve(o)
      }, Dc.prototype.getAllMutationBatchesAffectingDocumentKeys = function (t, e) {
        var r = this, i = new yo(yi);
        return e.forEach(function (e) {
          var t = new Ec(e, 0), n = new Ec(e, Number.POSITIVE_INFINITY);
          r.batchesByDocumentKey.forEachInRange([t, n], function (t) {
            xr(e.isEqual(t.key), "For each key, should only iterate over a single key's batches"), i = i.add(t.targetOrBatchId)
          })
        }), Po.resolve(this.findMutationBatches(i))
      }, Dc.prototype.getAllMutationBatchesAffectingQuery = function (t, e) {
        xr(!e.isCollectionGroupQuery(), "CollectionGroup queries should be handled in LocalDocumentsView");
        var n = e.path, r = n.length + 1, i = n;
        Bi.isDocumentKey(i) || (i = i.child(""));
        var o = new Ec(new Bi(i), 0), a = new yo(yi);
        return this.batchesByDocumentKey.forEachWhile(function (t) {
          var e = t.key.path;
          return !!n.isPrefixOf(e) && (e.length === r && (a = a.add(t.targetOrBatchId)), !0)
        }, o), Po.resolve(this.findMutationBatches(a))
      }, Dc.prototype.findMutationBatches = function (t) {
        var n = this, r = [];
        return t.forEach(function (t) {
          var e = n.findMutationBatch(t);
          null !== e && r.push(e)
        }), r
      }, Dc.prototype.removeMutationBatch = function (n, r) {
        var i = this;
        xr(0 === this.indexOfExistingBatchId(r.batchId, "removed"), "Can only remove the first entry of the mutation queue"), this.mutationQueue.shift();
        var o = this.batchesByDocumentKey;
        return Po.forEach(r.mutations, function (t) {
          var e = new Ec(t.key, r.batchId);
          return o = o.delete(e), i.referenceDelegate.removeMutationReference(n, t.key)
        }).next(function () {
          i.batchesByDocumentKey = o
        })
      }, Dc.prototype.removeCachedMutationKeys = function (t) {
      }, Dc.prototype.containsKey = function (t, e) {
        var n = new Ec(e, 0), r = this.batchesByDocumentKey.firstAfterOrEqual(n);
        return Po.resolve(e.isEqual(r && r.key))
      }, Dc.prototype.performConsistencyCheck = function (t) {
        return 0 === this.mutationQueue.length && xr(this.batchesByDocumentKey.isEmpty(), "Document leak -- detected dangling mutation references when queue is empty."), Po.resolve()
      }, Dc.prototype.indexOfExistingBatchId = function (t, e) {
        var n = this.indexOfBatchId(t);
        return xr(0 <= n && n < this.mutationQueue.length, "Batches must exist to be " + e), n
      }, Dc.prototype.indexOfBatchId = function (t) {
        return 0 === this.mutationQueue.length ? 0 : t - this.mutationQueue[0].batchId
      }, Dc.prototype.findMutationBatch = function (t) {
        var e = this.indexOfBatchId(t);
        if (e < 0 || e >= this.mutationQueue.length) return null;
        var n = this.mutationQueue[e];
        return xr(n.batchId === t, "If found batch must match"), n
      }, Dc);

      function Dc(t, e) {
        this.indexManager = t, this.referenceDelegate = e, this.mutationQueue = [], this.nextBatchId = 1, this.lastStreamToken = Vr(), this.batchesByDocumentKey = new yo(Ec.compareByKey)
      }

      var Nc = (Ac.prototype.getTargetCount = function (t) {
        return Po.resolve(this.targetCount)
      }, Ac.prototype.forEachTarget = function (t, n) {
        return this.queries.forEach(function (t, e) {
          return n(e)
        }), Po.resolve()
      }, Ac.prototype.getLastRemoteSnapshotVersion = function (t) {
        return Po.resolve(this.lastRemoteSnapshotVersion)
      }, Ac.prototype.getHighestSequenceNumber = function (t) {
        return Po.resolve(this.highestSequenceNumber)
      }, Ac.prototype.allocateTargetId = function (t) {
        var e = this.targetIdGenerator.after(this.highestTargetId);
        return this.highestTargetId = e, Po.resolve(e)
      }, Ac.prototype.setTargetsMetadata = function (t, e, n) {
        return n && (this.lastRemoteSnapshotVersion = n), e > this.highestSequenceNumber && (this.highestSequenceNumber = e), Po.resolve()
      }, Ac.prototype.saveQueryData = function (t) {
        this.queries.set(t.query, t);
        var e = t.targetId;
        e > this.highestTargetId && (this.highestTargetId = e), t.sequenceNumber > this.highestSequenceNumber && (this.highestSequenceNumber = t.sequenceNumber)
      }, Ac.prototype.addQueryData = function (t, e) {
        return xr(!this.queries.has(e.query), "Adding a query that already exists"), this.saveQueryData(e), this.targetCount += 1, Po.resolve()
      }, Ac.prototype.updateQueryData = function (t, e) {
        return xr(this.queries.has(e.query), "Updating a non-existent query"), this.saveQueryData(e), Po.resolve()
      }, Ac.prototype.removeQueryData = function (t, e) {
        return xr(0 < this.targetCount, "Removing a target from an empty cache"), xr(this.queries.has(e.query), "Removing a non-existent target from the cache"), this.queries.delete(e.query), this.references.removeReferencesForId(e.targetId), this.targetCount -= 1, Po.resolve()
      }, Ac.prototype.removeTargets = function (n, r, i) {
        var o = this, a = 0, s = [];
        return this.queries.forEach(function (t, e) {
          e.sequenceNumber <= r && !i[e.targetId] && (o.queries.delete(t), s.push(o.removeMatchingKeysForTargetId(n, e.targetId)), a++)
        }), Po.waitFor(s).next(function () {
          return a
        })
      }, Ac.prototype.getQueryCount = function (t) {
        return Po.resolve(this.targetCount)
      }, Ac.prototype.getQueryData = function (t, e) {
        var n = this.queries.get(e) || null;
        return Po.resolve(n)
      }, Ac.prototype.getQueryDataForTarget = function (t, e) {
        return Pr("Not yet implemented.")
      }, Ac.prototype.addMatchingKeys = function (e, t, n) {
        this.references.addReferences(t, n);
        var r = this.persistence.referenceDelegate, i = [];
        return r && t.forEach(function (t) {
          i.push(r.addReference(e, t))
        }), Po.waitFor(i)
      }, Ac.prototype.removeMatchingKeys = function (e, t, n) {
        this.references.removeReferences(t, n);
        var r = this.persistence.referenceDelegate, i = [];
        return r && t.forEach(function (t) {
          i.push(r.removeReference(e, t))
        }), Po.waitFor(i)
      }, Ac.prototype.removeMatchingKeysForTargetId = function (t, e) {
        return this.references.removeReferencesForId(e), Po.resolve()
      }, Ac.prototype.getMatchingKeysForTargetId = function (t, e) {
        var n = this.references.referencesForId(e);
        return Po.resolve(n)
      }, Ac.prototype.containsKey = function (t, e) {
        return Po.resolve(this.references.containsKey(e))
      }, Ac);

      function Ac(t) {
        this.persistence = t, this.queries = new Ia(function (t) {
          return t.canonicalId()
        }), this.lastRemoteSnapshotVersion = oo.MIN, this.highestTargetId = 0, this.highestSequenceNumber = 0, this.references = new bc, this.targetCount = 0, this.targetIdGenerator = zo.forQueryCache()
      }

      var kc = (Rc.prototype.addEntries = function (t, e, n) {
        for (var r = [], i = 0, o = e; i < o.length; i++) {
          var a = o[i], s = a.maybeDocument.key;
          this.docs = this.docs.insert(s, a), this.newDocumentChanges = this.newDocumentChanges.add(s), r.push(this.indexManager.addToCollectionParentIndex(t, s.path.popLast()))
        }
        return this.size += n, Po.waitFor(r)
      }, Rc.prototype.removeEntry = function (t, e) {
        var n = this.docs.get(e);
        return n ? (this.docs = this.docs.remove(e), this.size -= n.size, Po.resolve(n.size)) : Po.resolve(0)
      }, Rc.prototype.getEntry = function (t, e) {
        var n = this.docs.get(e);
        return Po.resolve(n ? n.maybeDocument : null)
      }, Rc.prototype.getSizedEntry = function (t, e) {
        return Po.resolve(this.docs.get(e))
      }, Rc.prototype.getEntries = function (t, e) {
        var n = this, r = So();
        return e.forEach(function (t) {
          var e = n.docs.get(t);
          r = r.insert(t, e ? e.maybeDocument : null)
        }), Po.resolve(r)
      }, Rc.prototype.getSizedEntries = function (t, e) {
        var n = this, r = So(), i = new so(Bi.comparator);
        return e.forEach(function (t) {
          var e = n.docs.get(t);
          r = r.insert(t, e ? e.maybeDocument : null), i = i.insert(t, e ? e.size : 0)
        }), Po.resolve({maybeDocuments: r, sizeMap: i})
      }, Rc.prototype.getDocumentsMatchingQuery = function (t, e) {
        xr(!e.isCollectionGroupQuery(), "CollectionGroup queries should be handled in LocalDocumentsView");
        for (var n = Io(), r = new Bi(e.path.child("")), i = this.docs.getIteratorFrom(r); i.hasNext();) {
          var o = i.getNext(), a = o.key, s = o.value.maybeDocument;
          if (!e.path.isPrefixOf(a.path)) break;
          s instanceof ya && e.matches(s) && (n = n.insert(s.key, s))
        }
        return Po.resolve(n)
      }, Rc.prototype.forEachDocumentKey = function (t, e) {
        return Po.forEach(this.docs, function (t) {
          return e(t)
        })
      }, Rc.prototype.getNewDocumentChanges = function (t) {
        var r = this, i = Eo();
        return this.newDocumentChanges.forEach(function (t) {
          var e = r.docs.get(t), n = e ? e.maybeDocument : new ba(t, oo.forDeletedDoc());
          i = i.insert(t, n)
        }), this.newDocumentChanges = Ao(), Po.resolve(i)
      }, Rc.prototype.newChangeBuffer = function () {
        return new _c(this.sizer, this)
      }, Rc.prototype.getSize = function (t) {
        return Po.resolve(this.size)
      }, Rc);

      function Rc(t, e) {
        this.indexManager = t, this.sizer = e, this.docs = new so(Bi.comparator), this.newDocumentChanges = Ao(), this.size = 0
      }

      var Mc, _c = (s(Oc, Mc = Da), Oc.prototype.applyChanges = function (t) {
        var i = this, e = this.assertChanges(), o = 0, a = [];
        return e.forEach(function (t, e) {
          var n = i.documentSizes.get(t);
          xr(void 0 !== n, "Attempting to change document " + t.toString() + " without having read it first");
          var r = i.sizer(e);
          o += r - n, a.push({maybeDocument: e, size: r})
        }), this.documentCache.addEntries(t, a, o)
      }, Oc.prototype.getFromCache = function (t, e) {
        return this.documentCache.getSizedEntry(t, e)
      }, Oc.prototype.getAllFromCache = function (t, e) {
        return this.documentCache.getSizedEntries(t, e)
      }, Oc);

      function Oc(t, e) {
        var n = Mc.call(this) || this;
        return n.sizer = t, n.documentCache = e, n
      }

      var Lc = (Pc.createLruPersistence = function (t, e, n) {
        return new Pc(t, function (t) {
          return new Vc(t, new As(e), n)
        })
      }, Pc.createEagerPersistence = function (t) {
        return new Pc(t, function (t) {
          return new qc(t)
        })
      }, Pc.prototype.shutdown = function () {
        return this._started = !1, Promise.resolve()
      }, Object.defineProperty(Pc.prototype, "started", {
        get: function () {
          return this._started
        }, enumerable: !0, configurable: !0
      }), Pc.prototype.getActiveClients = function () {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            return [2, [this.clientId]]
          })
        })
      }, Pc.prototype.setPrimaryStateListener = function (t) {
        return t(!0)
      }, Pc.prototype.setDatabaseDeletedListener = function () {
      }, Pc.prototype.setNetworkEnabled = function (t) {
      }, Pc.prototype.getIndexManager = function () {
        return this.indexManager
      }, Pc.prototype.getMutationQueue = function (t) {
        var e = this.mutationQueues[t.toKey()];
        return e || (e = new Cc(this.indexManager, this.referenceDelegate), this.mutationQueues[t.toKey()] = e), e
      }, Pc.prototype.getQueryCache = function () {
        return this.queryCache
      }, Pc.prototype.getRemoteDocumentCache = function () {
        return this.remoteDocumentCache
      }, Pc.prototype.runTransaction = function (t, e, n) {
        var r = this;
        _r("MemoryPersistence", "Starting transaction:", t);
        var i = new xc(this.listenSequence.next());
        return this.referenceDelegate.onTransactionStarted(), n(i).next(function (t) {
          return r.referenceDelegate.onTransactionCommitted(i).next(function () {
            return t
          })
        }).toPromise()
      }, Pc.prototype.mutationQueuesContainKey = function (e, n) {
        return Po.or(function (t) {
          var n = [];
          return Hr(t, function (t, e) {
            return n.push(e)
          }), n
        }(this.mutationQueues).map(function (t) {
          return function () {
            return t.containsKey(e, n)
          }
        }))
      }, Pc);

      function Pc(t, e) {
        var n = this;
        this.clientId = t, this.mutationQueues = {}, this.listenSequence = new Ai(0), this._started = !1, this._started = !0, this.referenceDelegate = e(this), this.queryCache = new Nc(this);
        this.indexManager = new Va, this.remoteDocumentCache = new kc(this.indexManager, function (t) {
          return n.referenceDelegate.documentSize(t)
        })
      }

      var xc = function (t) {
        this.currentSequenceNumber = t
      }, qc = (Fc.prototype.setInMemoryPins = function (t) {
        this.inMemoryPins = t
      }, Fc.prototype.addReference = function (t, e) {
        return this.orphanedDocuments.delete(e), Po.resolve()
      }, Fc.prototype.removeReference = function (t, e) {
        return this.orphanedDocuments.add(e), Po.resolve()
      }, Fc.prototype.removeMutationReference = function (t, e) {
        return this.orphanedDocuments.add(e), Po.resolve()
      }, Fc.prototype.removeTarget = function (t, e) {
        var n = this, r = this.persistence.getQueryCache();
        return r.getMatchingKeysForTargetId(t, e.targetId).next(function (t) {
          t.forEach(function (t) {
            return n.orphanedDocuments.add(t)
          })
        }).next(function () {
          return r.removeQueryData(t, e)
        })
      }, Fc.prototype.onTransactionStarted = function () {
        this.orphanedDocuments = new Set
      }, Fc.prototype.onTransactionCommitted = function (n) {
        var t = this, r = this.persistence.getRemoteDocumentCache();
        return Po.forEach(this.orphanedDocuments, function (e) {
          return t.isReferenced(n, e).next(function (t) {
            return t ? Po.resolve() : r.removeEntry(n, e).next(function () {
            })
          })
        })
      }, Fc.prototype.updateLimboDocument = function (t, e) {
        var n = this;
        return this.isReferenced(t, e).next(function (t) {
          t ? n.orphanedDocuments.delete(e) : n.orphanedDocuments.add(e)
        })
      }, Fc.prototype.documentSize = function (t) {
        return 0
      }, Fc.prototype.isReferenced = function (t, e) {
        var n = this;
        return Po.or([function () {
          return n.persistence.getQueryCache().containsKey(t, e)
        }, function () {
          return n.persistence.mutationQueuesContainKey(t, e)
        }, function () {
          return Po.resolve(n.inMemoryPins.containsKey(e))
        }])
      }, Fc);

      function Fc(t) {
        this.persistence = t
      }

      var Vc = (Bc.prototype.onTransactionStarted = function () {
      }, Bc.prototype.onTransactionCommitted = function (t) {
        return Po.resolve()
      }, Bc.prototype.forEachTarget = function (t, e) {
        return this.persistence.getQueryCache().forEachTarget(t, e)
      }, Bc.prototype.getSequenceNumberCount = function (t) {
        var n = this.orphanedDocumentCount(t);
        return this.persistence.getQueryCache().getTargetCount(t).next(function (e) {
          return n.next(function (t) {
            return e + t
          })
        })
      }, Bc.prototype.orphanedDocumentCount = function (t) {
        var e = 0;
        return this.forEachOrphanedDocumentSequenceNumber(t, function (t) {
          e++
        }).next(function () {
          return e
        })
      }, Bc.prototype.forEachOrphanedDocumentSequenceNumber = function (n, r) {
        var i = this;
        return Po.forEach(this.orphanedSequenceNumbers, function (t, e) {
          return i.isPinned(n, t, e).next(function (t) {
            return t ? Po.resolve() : r(e)
          })
        })
      }, Bc.prototype.setInMemoryPins = function (t) {
        this.inMemoryPins = t
      }, Bc.prototype.removeTargets = function (t, e, n) {
        return this.persistence.getQueryCache().removeTargets(t, e, n)
      }, Bc.prototype.removeOrphanedDocuments = function (n, t) {
        var r = this, i = 0, o = this.persistence.getRemoteDocumentCache();
        return o.forEachDocumentKey(n, function (e) {
          return r.isPinned(n, e, t).next(function (t) {
            return t ? Po.resolve() : (i++, o.removeEntry(n, e).next())
          })
        }).next(function () {
          return i
        })
      }, Bc.prototype.removeMutationReference = function (t, e) {
        return this.orphanedSequenceNumbers.set(e, t.currentSequenceNumber), Po.resolve()
      }, Bc.prototype.removeTarget = function (t, e) {
        var n = e.copy({sequenceNumber: t.currentSequenceNumber});
        return this.persistence.getQueryCache().updateQueryData(t, n)
      }, Bc.prototype.addReference = function (t, e) {
        return this.orphanedSequenceNumbers.set(e, t.currentSequenceNumber), Po.resolve()
      }, Bc.prototype.removeReference = function (t, e) {
        return this.orphanedSequenceNumbers.set(e, t.currentSequenceNumber), Po.resolve()
      }, Bc.prototype.updateLimboDocument = function (t, e) {
        return this.orphanedSequenceNumbers.set(e, t.currentSequenceNumber), Po.resolve()
      }, Bc.prototype.documentSize = function (t) {
        var e, n = this.serializer.toDbRemoteDocument(t);
        if (n.document) e = n.document; else if (n.unknownDocument) e = n.unknownDocument; else {
          if (!n.noDocument) throw Pr("Unknown remote document type");
          e = n.noDocument
        }
        return JSON.stringify(e).length
      }, Bc.prototype.isPinned = function (t, e, n) {
        var r = this;
        return Po.or([function () {
          return r.persistence.mutationQueuesContainKey(t, e)
        }, function () {
          return Po.resolve(r.inMemoryPins.containsKey(e))
        }, function () {
          return r.persistence.getQueryCache().containsKey(t, e)
        }, function () {
          var t = r.orphanedSequenceNumbers.get(e);
          return Po.resolve(void 0 !== t && n < t)
        }])
      }, Bc.prototype.getCacheSize = function (t) {
        return this.persistence.getRemoteDocumentCache().getSize(t)
      }, Bc);

      function Bc(t, e, n) {
        this.persistence = t, this.serializer = e, this.orphanedSequenceNumbers = new Ia(function (t) {
          return Zi(t.path)
        }), this.garbageCollector = new Fs(this, n)
      }

      var Uc = Number, Qc = Uc.MIN_SAFE_INTEGER || -(Math.pow(2, 53) - 1),
        Kc = Uc.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1, Gc = Uc.isInteger || function (t) {
          return "number" == typeof t && isFinite(t) && Math.floor(t) === t
        };

      function jc(t) {
        return null == t
      }

      function Wc(t) {
        return Gc(t) && t <= Kc && Qc <= t
      }

      var zc = (Hc.prototype.reset = function () {
        this.currentBaseMs = 0
      }, Hc.prototype.resetToMax = function () {
        this.currentBaseMs = this.maxDelayMs
      }, Hc.prototype.backoffAndRun = function (t) {
        var e = this;
        this.cancel();
        var n = Math.floor(this.currentBaseMs + this.jitterDelayMs()),
          r = Math.max(0, Date.now() - this.lastAttemptTime), i = Math.max(0, n - r);
        0 < this.currentBaseMs && _r("ExponentialBackoff", "Backing off for " + i + " ms (base delay: " + this.currentBaseMs + " ms, delay with jitter: " + n + " ms, last attempt: " + r + " ms ago)"), this.timerPromise = this.queue.enqueueAfterDelay(this.timerId, i, function () {
          return e.lastAttemptTime = Date.now(), t()
        }), this.currentBaseMs *= this.backoffFactor, this.currentBaseMs < this.initialDelayMs && (this.currentBaseMs = this.initialDelayMs), this.currentBaseMs > this.maxDelayMs && (this.currentBaseMs = this.maxDelayMs)
      }, Hc.prototype.cancel = function () {
        null !== this.timerPromise && (this.timerPromise.cancel(), this.timerPromise = null)
      }, Hc.prototype.jitterDelayMs = function () {
        return (Math.random() - .5) * this.currentBaseMs
      }, Hc);

      function Hc(t, e, n, r, i) {
        this.queue = t, this.timerId = e, this.initialDelayMs = n, this.backoffFactor = r, this.maxDelayMs = i, this.timerPromise = null, this.lastAttemptTime = Date.now(), this.reset()
      }

      var Yc, Xc, Jc = "PersistentStream";
      (Xc = Yc = Yc || {})[Xc.Initial = 0] = "Initial", Xc[Xc.Starting = 1] = "Starting", Xc[Xc.Open = 2] = "Open", Xc[Xc.Error = 3] = "Error", Xc[Xc.Backoff = 4] = "Backoff";
      var $c = (Zc.prototype.isStarted = function () {
        return this.state === Yc.Starting || this.state === Yc.Open || this.state === Yc.Backoff
      }, Zc.prototype.isOpen = function () {
        return this.state === Yc.Open
      }, Zc.prototype.start = function () {
        this.state !== Yc.Error ? (xr(this.state === Yc.Initial, "Already started"), this.auth()) : this.performBackoff()
      }, Zc.prototype.stop = function () {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return this.isStarted() ? [4, this.close(Yc.Initial)] : [3, 2];
              case 1:
                t.sent(), t.label = 2;
              case 2:
                return [2]
            }
          })
        })
      }, Zc.prototype.inhibitBackoff = function () {
        xr(!this.isStarted(), "Can only inhibit backoff in a stopped state"), this.state = Yc.Initial, this.backoff.reset()
      }, Zc.prototype.markIdle = function () {
        var t = this;
        this.isOpen() && null === this.idleTimer && (this.idleTimer = this.queue.enqueueAfterDelay(this.idleTimerId, 6e4, function () {
          return t.handleIdleCloseTimer()
        }))
      }, Zc.prototype.sendRequest = function (t) {
        this.cancelIdleCheck(), this.stream.send(t)
      }, Zc.prototype.handleIdleCloseTimer = function () {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            return this.isOpen() ? [2, this.close(Yc.Initial)] : [2]
          })
        })
      }, Zc.prototype.cancelIdleCheck = function () {
        this.idleTimer && (this.idleTimer.cancel(), this.idleTimer = null)
      }, Zc.prototype.close = function (e, n) {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return xr(this.isStarted(), "Only started streams should be closed."), xr(e === Yc.Error || jc(n), "Can't provide an error when not in an error state."), this.cancelIdleCheck(), this.backoff.cancel(), this.closeCount++, e !== Yc.Error ? this.backoff.reset() : n && n.code === Ur.RESOURCE_EXHAUSTED ? (Or(n.toString()), Or("Using maximum backoff delay to prevent overloading the backend."), this.backoff.resetToMax()) : n && n.code === Ur.UNAUTHENTICATED && this.credentialsProvider.invalidateToken(), null !== this.stream && (this.tearDown(), this.stream.close(), this.stream = null), this.state = e, [4, this.listener.onClose(n)];
              case 1:
                return t.sent(), [2]
            }
          })
        })
      }, Zc.prototype.tearDown = function () {
      }, Zc.prototype.auth = function () {
        var n = this;
        xr(this.state === Yc.Initial, "Must be in initial state to auth"), this.state = Yc.Starting;
        var t = this.getCloseGuardedDispatcher(this.closeCount), e = this.closeCount;
        this.credentialsProvider.getToken().then(function (t) {
          n.closeCount === e && n.startStream(t)
        }, function (e) {
          t(function () {
            var t = new Qr(Ur.UNKNOWN, "Fetching auth token failed: " + e.message);
            return n.handleStreamClose(t)
          })
        })
      }, Zc.prototype.startStream = function (t) {
        var e = this;
        xr(this.state === Yc.Starting, "Trying to start stream in a non-starting state");
        var n = this.getCloseGuardedDispatcher(this.closeCount);
        this.stream = this.startRpc(t), this.stream.onOpen(function () {
          n(function () {
            return xr(e.state === Yc.Starting, "Expected stream to be in state Starting, but was " + e.state), e.state = Yc.Open, e.listener.onOpen()
          })
        }), this.stream.onClose(function (t) {
          n(function () {
            return e.handleStreamClose(t)
          })
        }), this.stream.onMessage(function (t) {
          n(function () {
            return e.onMessage(t)
          })
        })
      }, Zc.prototype.performBackoff = function () {
        var t = this;
        xr(this.state === Yc.Error, "Should only perform backoff when in Error state"), this.state = Yc.Backoff, this.backoff.backoffAndRun(function () {
          return p(t, void 0, void 0, function () {
            return d(this, function (t) {
              return xr(this.state === Yc.Backoff, "Backoff elapsed but state is now: " + this.state), this.state = Yc.Initial, this.start(), xr(this.isStarted(), "PersistentStream should have started"), [2]
            })
          })
        })
      }, Zc.prototype.handleStreamClose = function (t) {
        return xr(this.isStarted(), "Can't handle server close on non-started stream"), _r(Jc, "close with error: " + t), this.stream = null, this.close(Yc.Error, t)
      }, Zc.prototype.getCloseGuardedDispatcher = function (e) {
        var n = this;
        return function (t) {
          n.queue.enqueueAndForget(function () {
            return n.closeCount === e ? t() : (_r(Jc, "stream callback skipped by getCloseGuardedDispatcher."), Promise.resolve())
          })
        }
      }, Zc);

      function Zc(t, e, n, r, i, o) {
        this.queue = t, this.idleTimerId = n, this.connection = r, this.credentialsProvider = i, this.listener = o, this.state = Yc.Initial, this.closeCount = 0, this.idleTimer = null, this.stream = null, this.backoff = new zc(t, e, 1e3, 1.5, 6e4)
      }

      var th, eh = (s(nh, th = $c), nh.prototype.startRpc = function (t) {
        return this.connection.openStream("Listen", t)
      }, nh.prototype.onMessage = function (t) {
        this.backoff.reset();
        var e = this.serializer.fromWatchChange(t), n = this.serializer.versionFromListenResponse(t);
        return this.listener.onWatchChange(e, n)
      }, nh.prototype.watch = function (t) {
        var e = {};
        e.database = this.serializer.encodedDatabaseId, e.addTarget = this.serializer.toTarget(t);
        var n = this.serializer.toListenRequestLabels(t);
        n && (e.labels = n), this.sendRequest(e)
      }, nh.prototype.unwatch = function (t) {
        var e = {};
        e.database = this.serializer.encodedDatabaseId, e.removeTarget = t, this.sendRequest(e)
      }, nh);

      function nh(t, e, n, r, i) {
        var o = th.call(this, t, Qi.ListenStreamConnectionBackoff, Qi.ListenStreamIdle, e, n, i) || this;
        return o.serializer = r, o
      }

      var rh, ih = (s(oh, rh = $c), Object.defineProperty(oh.prototype, "handshakeComplete", {
        get: function () {
          return this.handshakeComplete_
        }, enumerable: !0, configurable: !0
      }), oh.prototype.start = function () {
        this.handshakeComplete_ = !1, rh.prototype.start.call(this)
      }, oh.prototype.tearDown = function () {
        this.handshakeComplete_ && this.writeMutations([])
      }, oh.prototype.startRpc = function (t) {
        return this.connection.openStream("Write", t)
      }, oh.prototype.onMessage = function (t) {
        if (xr(!!t.streamToken, "Got a write response without a stream token"), this.lastStreamToken = t.streamToken, this.handshakeComplete_) {
          this.backoff.reset();
          var e = this.serializer.fromWriteResults(t.writeResults, t.commitTime),
            n = this.serializer.fromVersion(t.commitTime);
          return this.listener.onMutationResult(n, e)
        }
        return xr(!t.writeResults || 0 === t.writeResults.length, "Got mutation results for handshake"), this.handshakeComplete_ = !0, this.listener.onHandshakeComplete()
      }, oh.prototype.writeHandshake = function () {
        xr(this.isOpen(), "Writing handshake requires an opened stream"), xr(!this.handshakeComplete_, "Handshake already completed");
        var t = {};
        t.database = this.serializer.encodedDatabaseId, this.sendRequest(t)
      }, oh.prototype.writeMutations = function (t) {
        var e = this;
        xr(this.isOpen(), "Writing mutations requires an opened stream"), xr(this.handshakeComplete_, "Handshake must be complete before writing mutations"), xr(0 < this.lastStreamToken.length, "Trying to write mutation without a token");
        var n = {
          streamToken: this.lastStreamToken, writes: t.map(function (t) {
            return e.serializer.toMutation(t)
          })
        };
        this.sendRequest(n)
      }, oh);

      function oh(t, e, n, r, i) {
        var o = rh.call(this, t, Qi.WriteStreamConnectionBackoff, Qi.WriteStreamIdle, e, n, i) || this;
        return o.serializer = r, o.handshakeComplete_ = !1, o
      }

      var ah = (sh.prototype.newPersistentWriteStream = function (t) {
        return new ih(this.queue, this.connection, this.credentials, this.serializer, t)
      }, sh.prototype.newPersistentWatchStream = function (t) {
        return new eh(this.queue, this.connection, this.credentials, this.serializer, t)
      }, sh.prototype.commit = function (t) {
        var e = this, n = {
          database: this.serializer.encodedDatabaseId, writes: t.map(function (t) {
            return e.serializer.toMutation(t)
          })
        };
        return this.invokeRPC("Commit", n).then(function (t) {
          return e.serializer.fromWriteResults(t.writeResults, t.commitTime)
        })
      }, sh.prototype.lookup = function (e) {
        var i = this, t = {
          database: this.serializer.encodedDatabaseId, documents: e.map(function (t) {
            return i.serializer.toName(t)
          })
        };
        return this.invokeStreamingRPC("BatchGetDocuments", t).then(function (t) {
          var n = Eo();
          t.forEach(function (t) {
            var e = i.serializer.fromMaybeDocument(t);
            n = n.insert(e.key, e)
          });
          var r = [];
          return e.forEach(function (t) {
            var e = n.get(t);
            xr(!!e, "Missing entity in write response for " + t), r.push(e)
          }), r
        })
      }, sh.prototype.invokeRPC = function (e, n) {
        var r = this;
        return this.credentials.getToken().then(function (t) {
          return r.connection.invokeRPC(e, n, t)
        }).catch(function (t) {
          throw t.code === Ur.UNAUTHENTICATED && r.credentials.invalidateToken(), t
        })
      }, sh.prototype.invokeStreamingRPC = function (e, n) {
        var r = this;
        return this.credentials.getToken().then(function (t) {
          return r.connection.invokeStreamingRPC(e, n, t)
        }).catch(function (t) {
          throw t.code === Ur.UNAUTHENTICATED && r.credentials.invalidateToken(), t
        })
      }, sh);

      function sh(t, e, n, r) {
        this.queue = t, this.connection = e, this.credentials = n, this.serializer = r
      }

      var uh, ch, hh, lh, fh = (ph.prototype.lookup = function (r) {
        return p(this, void 0, void 0, function () {
          var e, n = this;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                if (this.ensureCommitNotCalled(), 0 < this.mutations.length) throw new Qr(Ur.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
                return [4, this.datastore.lookup(r)];
              case 1:
                return (e = t.sent()).forEach(function (t) {
                  t instanceof ba || t instanceof ya ? n.recordVersion(t) : Pr("Document in a transaction was a " + t.constructor.name)
                }), [2, e]
            }
          })
        })
      }, ph.prototype.set = function (t, e) {
        this.write(e.toMutations(t, this.precondition(t))), this.writtenDocs.add(t)
      }, ph.prototype.update = function (t, e) {
        try {
          this.write(e.toMutations(t, this.preconditionForUpdate(t)))
        } catch (t) {
          this.lastWriteError = t
        }
        this.writtenDocs.add(t)
      }, ph.prototype.delete = function (t) {
        this.write([new mc(t, this.precondition(t))]), this.writtenDocs.add(t)
      }, ph.prototype.commit = function () {
        return p(this, void 0, void 0, function () {
          var e;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                if (this.ensureCommitNotCalled(), this.lastWriteError) throw this.lastWriteError;
                if (e = this.readVersions, this.mutations.forEach(function (t) {
                  e = e.remove(t.key)
                }), !e.isEmpty()) throw new Qr(Ur.INVALID_ARGUMENT, "Every document read in a transaction must also be written.");
                return [4, this.datastore.commit(this.mutations)];
              case 1:
                return t.sent(), this.committed = !0, [2]
            }
          })
        })
      }, ph.prototype.recordVersion = function (t) {
        var e;
        if (t instanceof ya) e = t.version; else {
          if (!(t instanceof ba)) throw Pr("Document in a transaction was a " + t.constructor.name);
          e = oo.forDeletedDoc()
        }
        var n = this.readVersions.get(t.key);
        if (null !== n) {
          if (!e.isEqual(n)) throw new Qr(Ur.ABORTED, "Document version changed between two reads.")
        } else this.readVersions = this.readVersions.insert(t.key, e)
      }, ph.prototype.precondition = function (t) {
        var e = this.readVersions.get(t);
        return !this.writtenDocs.has(t) && e ? ec.updateTime(e) : ec.NONE
      }, ph.prototype.preconditionForUpdate = function (t) {
        var e = this.readVersions.get(t);
        if (this.writtenDocs.has(t) || !e) return ec.exists(!0);
        if (e.isEqual(oo.forDeletedDoc())) throw new Qr(Ur.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
        return ec.updateTime(e)
      }, ph.prototype.write = function (t) {
        this.ensureCommitNotCalled(), this.mutations = this.mutations.concat(t)
      }, ph.prototype.ensureCommitNotCalled = function () {
        xr(!this.committed, "A transaction object cannot be used after its update callback has been invoked.")
      }, ph);

      function ph(t) {
        this.datastore = t, this.readVersions = Do(), this.mutations = [], this.committed = !1, this.writtenDocs = new Set
      }

      (ch = uh = uh || {})[ch.Unknown = 0] = "Unknown", ch[ch.Online = 1] = "Online", ch[ch.Offline = 2] = "Offline", (lh = hh = hh || {})[lh.RemoteStore = 0] = "RemoteStore", lh[lh.SharedClientState = 1] = "SharedClientState";
      var dh, mh, yh = (gh.prototype.handleWatchStreamStart = function () {
        var t = this;
        0 === this.watchStreamFailures && (this.setAndBroadcast(uh.Unknown), xr(null === this.onlineStateTimer, "onlineStateTimer shouldn't be started yet"), this.onlineStateTimer = this.asyncQueue.enqueueAfterDelay(Qi.OnlineStateTimeout, 1e4, function () {
          return t.onlineStateTimer = null, xr(t.state === uh.Unknown, "Timer should be canceled if we transitioned to a different state."), t.logClientOfflineWarningIfNecessary("Backend didn't respond within 10 seconds."), t.setAndBroadcast(uh.Offline), Promise.resolve()
        }))
      }, gh.prototype.handleWatchStreamFailure = function (t) {
        this.state === uh.Online ? (this.setAndBroadcast(uh.Unknown), xr(0 === this.watchStreamFailures, "watchStreamFailures must be 0"), xr(null === this.onlineStateTimer, "onlineStateTimer must be null")) : (this.watchStreamFailures++, 1 <= this.watchStreamFailures && (this.clearOnlineStateTimer(), this.logClientOfflineWarningIfNecessary("Connection failed 1 times. Most recent error: " + t.toString()), this.setAndBroadcast(uh.Offline)))
      }, gh.prototype.set = function (t) {
        this.clearOnlineStateTimer(), this.watchStreamFailures = 0, t === uh.Online && (this.shouldWarnClientIsOffline = !1), this.setAndBroadcast(t)
      }, gh.prototype.setAndBroadcast = function (t) {
        t !== this.state && (this.state = t, this.onlineStateHandler(t))
      }, gh.prototype.logClientOfflineWarningIfNecessary = function (t) {
        var e = "Could not reach Cloud Firestore backend. " + t + "\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.";
        this.shouldWarnClientIsOffline ? (Or(e), this.shouldWarnClientIsOffline = !1) : _r("OnlineStateTracker", e)
      }, gh.prototype.clearOnlineStateTimer = function () {
        null !== this.onlineStateTimer && (this.onlineStateTimer.cancel(), this.onlineStateTimer = null)
      }, gh);

      function gh(t, e) {
        this.asyncQueue = t, this.onlineStateHandler = e, this.state = uh.Unknown, this.watchStreamFailures = 0, this.onlineStateTimer = null, this.shouldWarnClientIsOffline = !0
      }

      function vh(t) {
        switch (t) {
          case Ur.OK:
            return Pr("Treated status OK as error");
          case Ur.CANCELLED:
          case Ur.UNKNOWN:
          case Ur.DEADLINE_EXCEEDED:
          case Ur.RESOURCE_EXHAUSTED:
          case Ur.INTERNAL:
          case Ur.UNAVAILABLE:
          case Ur.UNAUTHENTICATED:
            return !1;
          case Ur.INVALID_ARGUMENT:
          case Ur.NOT_FOUND:
          case Ur.ALREADY_EXISTS:
          case Ur.PERMISSION_DENIED:
          case Ur.FAILED_PRECONDITION:
          case Ur.ABORTED:
          case Ur.OUT_OF_RANGE:
          case Ur.UNIMPLEMENTED:
          case Ur.DATA_LOSS:
            return !0;
          default:
            return Pr("Unknown status code: " + t)
        }
      }

      function bh(t) {
        if (void 0 === t) return Or("GRPC error has no .code"), Ur.UNKNOWN;
        switch (t) {
          case dh.OK:
            return Ur.OK;
          case dh.CANCELLED:
            return Ur.CANCELLED;
          case dh.UNKNOWN:
            return Ur.UNKNOWN;
          case dh.DEADLINE_EXCEEDED:
            return Ur.DEADLINE_EXCEEDED;
          case dh.RESOURCE_EXHAUSTED:
            return Ur.RESOURCE_EXHAUSTED;
          case dh.INTERNAL:
            return Ur.INTERNAL;
          case dh.UNAVAILABLE:
            return Ur.UNAVAILABLE;
          case dh.UNAUTHENTICATED:
            return Ur.UNAUTHENTICATED;
          case dh.INVALID_ARGUMENT:
            return Ur.INVALID_ARGUMENT;
          case dh.NOT_FOUND:
            return Ur.NOT_FOUND;
          case dh.ALREADY_EXISTS:
            return Ur.ALREADY_EXISTS;
          case dh.PERMISSION_DENIED:
            return Ur.PERMISSION_DENIED;
          case dh.FAILED_PRECONDITION:
            return Ur.FAILED_PRECONDITION;
          case dh.ABORTED:
            return Ur.ABORTED;
          case dh.OUT_OF_RANGE:
            return Ur.OUT_OF_RANGE;
          case dh.UNIMPLEMENTED:
            return Ur.UNIMPLEMENTED;
          case dh.DATA_LOSS:
            return Ur.DATA_LOSS;
          default:
            return Pr("Unknown status code: " + t)
        }
      }

      (mh = dh = dh || {})[mh.OK = 0] = "OK", mh[mh.CANCELLED = 1] = "CANCELLED", mh[mh.UNKNOWN = 2] = "UNKNOWN", mh[mh.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", mh[mh.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", mh[mh.NOT_FOUND = 5] = "NOT_FOUND", mh[mh.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", mh[mh.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", mh[mh.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", mh[mh.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", mh[mh.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", mh[mh.ABORTED = 10] = "ABORTED", mh[mh.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", mh[mh.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", mh[mh.INTERNAL = 13] = "INTERNAL", mh[mh.UNAVAILABLE = 14] = "UNAVAILABLE", mh[mh.DATA_LOSS = 15] = "DATA_LOSS";
      var wh, Eh, Sh, Th, Ih = (Ch.emptySet = function (t) {
        return new Ch(t.comparator)
      }, Ch.prototype.has = function (t) {
        return null != this.keyedMap.get(t)
      }, Ch.prototype.get = function (t) {
        return this.keyedMap.get(t)
      }, Ch.prototype.first = function () {
        return this.sortedSet.minKey()
      }, Ch.prototype.last = function () {
        return this.sortedSet.maxKey()
      }, Ch.prototype.isEmpty = function () {
        return this.sortedSet.isEmpty()
      }, Ch.prototype.indexOf = function (t) {
        var e = this.keyedMap.get(t);
        return e ? this.sortedSet.indexOf(e) : -1
      }, Object.defineProperty(Ch.prototype, "size", {
        get: function () {
          return this.sortedSet.size
        }, enumerable: !0, configurable: !0
      }), Ch.prototype.forEach = function (n) {
        this.sortedSet.inorderTraversal(function (t, e) {
          return n(t), !1
        })
      }, Ch.prototype.add = function (t) {
        var e = this.delete(t.key);
        return e.copy(e.keyedMap.insert(t.key, t), e.sortedSet.insert(t, null))
      }, Ch.prototype.delete = function (t) {
        var e = this.get(t);
        return e ? this.copy(this.keyedMap.remove(t), this.sortedSet.remove(e)) : this
      }, Ch.prototype.isEqual = function (t) {
        if (!(t instanceof Ch)) return !1;
        if (this.size !== t.size) return !1;
        for (var e = this.sortedSet.getIterator(), n = t.sortedSet.getIterator(); e.hasNext();) {
          var r = e.getNext().key, i = n.getNext().key;
          if (!r.isEqual(i)) return !1
        }
        return !0
      }, Ch.prototype.toString = function () {
        var e = [];
        return this.forEach(function (t) {
          e.push(t.toString())
        }), 0 === e.length ? "DocumentSet ()" : "DocumentSet (\n  " + e.join("  \n") + "\n)"
      }, Ch.prototype.copy = function (t, e) {
        var n = new Ch;
        return n.comparator = this.comparator, n.keyedMap = t, n.sortedSet = e, n
      }, Ch);

      function Ch(n) {
        this.comparator = n ? function (t, e) {
          return n(t, e) || Bi.comparator(t.key, e.key)
        } : function (t, e) {
          return Bi.comparator(t.key, e.key)
        }, this.keyedMap = Io(), this.sortedSet = new so(this.comparator)
      }

      (Eh = wh = wh || {})[Eh.Added = 0] = "Added", Eh[Eh.Removed = 1] = "Removed", Eh[Eh.Modified = 2] = "Modified", Eh[Eh.Metadata = 3] = "Metadata", (Th = Sh = Sh || {})[Th.Local = 0] = "Local", Th[Th.Synced = 1] = "Synced";
      var Dh = (Nh.prototype.track = function (t) {
        var e = t.doc.key, n = this.changeMap.get(e);
        n ? t.type !== wh.Added && n.type === wh.Metadata ? this.changeMap = this.changeMap.insert(e, t) : t.type === wh.Metadata && n.type !== wh.Removed ? this.changeMap = this.changeMap.insert(e, {
          type: n.type,
          doc: t.doc
        }) : t.type === wh.Modified && n.type === wh.Modified ? this.changeMap = this.changeMap.insert(e, {
          type: wh.Modified,
          doc: t.doc
        }) : t.type === wh.Modified && n.type === wh.Added ? this.changeMap = this.changeMap.insert(e, {
          type: wh.Added,
          doc: t.doc
        }) : t.type === wh.Removed && n.type === wh.Added ? this.changeMap = this.changeMap.remove(e) : t.type === wh.Removed && n.type === wh.Modified ? this.changeMap = this.changeMap.insert(e, {
          type: wh.Removed,
          doc: n.doc
        }) : t.type === wh.Added && n.type === wh.Removed ? this.changeMap = this.changeMap.insert(e, {
          type: wh.Modified,
          doc: t.doc
        }) : Pr("unsupported combination of changes: " + JSON.stringify(t) + " after " + JSON.stringify(n)) : this.changeMap = this.changeMap.insert(e, t)
      }, Nh.prototype.getChanges = function () {
        var n = [];
        return this.changeMap.inorderTraversal(function (t, e) {
          n.push(e)
        }), n
      }, Nh);

      function Nh() {
        this.changeMap = new so(Bi.comparator)
      }

      var Ah = (kh.fromInitialDocuments = function (t, e, n, r) {
        var i = [];
        return e.forEach(function (t) {
          i.push({type: wh.Added, doc: t})
        }), new kh(t, e, Ih.emptySet(e), i, n, r, !0, !1)
      }, Object.defineProperty(kh.prototype, "hasPendingWrites", {
        get: function () {
          return !this.mutatedKeys.isEmpty()
        }, enumerable: !0, configurable: !0
      }), kh.prototype.isEqual = function (t) {
        if (!(this.fromCache === t.fromCache && this.syncStateChanged === t.syncStateChanged && this.mutatedKeys.isEqual(t.mutatedKeys) && this.query.isEqual(t.query) && this.docs.isEqual(t.docs) && this.oldDocs.isEqual(t.oldDocs))) return !1;
        var e = this.docChanges, n = t.docChanges;
        if (e.length !== n.length) return !1;
        for (var r = 0; r < e.length; r++) if (e[r].type !== n[r].type || !e[r].doc.isEqual(n[r].doc)) return !1;
        return !0
      }, kh);

      function kh(t, e, n, r, i, o, a, s) {
        this.query = t, this.docs = e, this.oldDocs = n, this.docChanges = r, this.mutatedKeys = i, this.fromCache = o, this.syncStateChanged = a, this.excludesMetadataChanges = s
      }

      var Rh = (Mh.createSynthesizedRemoteEventForCurrentChange = function (t, e) {
        var n, r = ((n = {})[t] = _h.createSynthesizedTargetChangeForCurrentChange(t, e), n);
        return new Mh(oo.MIN, r, Ro(), Eo(), Ao())
      }, Mh);

      function Mh(t, e, n, r, i) {
        this.snapshotVersion = t, this.targetChanges = e, this.targetMismatches = n, this.documentUpdates = r, this.resolvedLimboDocuments = i
      }

      var _h = (Oh.createSynthesizedTargetChangeForCurrentChange = function (t, e) {
        return new Oh(Vr(), e, Ao(), Ao(), Ao())
      }, Oh);

      function Oh(t, e, n, r, i) {
        this.resumeToken = t, this.current = e, this.addedDocuments = n, this.modifiedDocuments = r, this.removedDocuments = i
      }

      var Lh, Ph, xh = function (t, e, n, r) {
        this.updatedTargetIds = t, this.removedTargetIds = e, this.key = n, this.newDoc = r
      }, qh = function (t, e) {
        this.targetId = t, this.existenceFilter = e
      };
      (Ph = Lh = Lh || {})[Ph.NoChange = 0] = "NoChange", Ph[Ph.Added = 1] = "Added", Ph[Ph.Removed = 2] = "Removed", Ph[Ph.Current = 3] = "Current", Ph[Ph.Reset = 4] = "Reset";
      var Fh = function (t, e, n, r) {
        void 0 === n && (n = Vr()), void 0 === r && (r = null), this.state = t, this.targetIds = e, this.resumeToken = n, this.cause = r
      }, Vh = (Object.defineProperty(Bh.prototype, "current", {
        get: function () {
          return this._current
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(Bh.prototype, "resumeToken", {
        get: function () {
          return this._resumeToken
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(Bh.prototype, "isPending", {
        get: function () {
          return 0 !== this.pendingResponses
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(Bh.prototype, "hasPendingChanges", {
        get: function () {
          return this._hasPendingChanges
        }, enumerable: !0, configurable: !0
      }), Bh.prototype.updateResumeToken = function (t) {
        0 < t.length && (this._hasPendingChanges = !0, this._resumeToken = t)
      }, Bh.prototype.toTargetChange = function () {
        var n = Ao(), r = Ao(), i = Ao();
        return this.documentChanges.forEach(function (t, e) {
          switch (e) {
            case wh.Added:
              n = n.add(t);
              break;
            case wh.Modified:
              r = r.add(t);
              break;
            case wh.Removed:
              i = i.add(t);
              break;
            default:
              Pr("Encountered invalid change type: " + e)
          }
        }), new _h(this._resumeToken, this._current, n, r, i)
      }, Bh.prototype.clearPendingChanges = function () {
        this._hasPendingChanges = !1, this.documentChanges = Gh()
      }, Bh.prototype.addDocumentChange = function (t, e) {
        this._hasPendingChanges = !0, this.documentChanges = this.documentChanges.insert(t, e)
      }, Bh.prototype.removeDocumentChange = function (t) {
        this._hasPendingChanges = !0, this.documentChanges = this.documentChanges.remove(t)
      }, Bh.prototype.recordPendingTargetRequest = function () {
        this.pendingResponses += 1
      }, Bh.prototype.recordTargetResponse = function () {
        this.pendingResponses -= 1
      }, Bh.prototype.markCurrent = function () {
        this._hasPendingChanges = !0, this._current = !0
      }, Bh);

      function Bh() {
        this.pendingResponses = 0, this.documentChanges = Gh(), this._resumeToken = Vr(), this._current = !1, this._hasPendingChanges = !0
      }

      var Uh = (Qh.prototype.handleDocumentChange = function (t) {
        for (var e = 0, n = t.updatedTargetIds; e < n.length; e++) {
          var r = n[e];
          t.newDoc instanceof ya ? this.addDocumentToTarget(r, t.newDoc) : t.newDoc instanceof ba && this.removeDocumentFromTarget(r, t.key, t.newDoc)
        }
        for (var i = 0, o = t.removedTargetIds; i < o.length; i++) r = o[i], this.removeDocumentFromTarget(r, t.key, t.newDoc)
      }, Qh.prototype.handleTargetChange = function (n) {
        var r = this;
        this.forEachTarget(n, function (t) {
          var e = r.ensureTargetState(t);
          switch (n.state) {
            case Lh.NoChange:
              r.isActiveTarget(t) && e.updateResumeToken(n.resumeToken);
              break;
            case Lh.Added:
              e.recordTargetResponse(), e.isPending || e.clearPendingChanges(), e.updateResumeToken(n.resumeToken);
              break;
            case Lh.Removed:
              e.recordTargetResponse(), e.isPending || r.removeTarget(t), xr(!n.cause, "WatchChangeAggregator does not handle errored targets");
              break;
            case Lh.Current:
              r.isActiveTarget(t) && (e.markCurrent(), e.updateResumeToken(n.resumeToken));
              break;
            case Lh.Reset:
              r.isActiveTarget(t) && (r.resetTarget(t), e.updateResumeToken(n.resumeToken));
              break;
            default:
              Pr("Unknown target watch change state: " + n.state)
          }
        })
      }, Qh.prototype.forEachTarget = function (t, e) {
        0 < t.targetIds.length ? t.targetIds.forEach(e) : zr(this.targetStates, e)
      }, Qh.prototype.handleExistenceFilter = function (t) {
        var e = t.targetId, n = t.existenceFilter.count, r = this.queryDataForActiveTarget(e);
        if (r) {
          var i = r.query;
          if (i.isDocumentQuery()) if (0 === n) {
            var o = new Bi(i.path);
            this.removeDocumentFromTarget(e, o, new ba(o, oo.forDeletedDoc()))
          } else xr(1 === n, "Single document existence filter with count: " + n); else this.getCurrentDocumentCountForTarget(e) !== n && (this.resetTarget(e), this.pendingTargetResets = this.pendingTargetResets.add(e))
        }
      }, Qh.prototype.createRemoteEvent = function (i) {
        var o = this, a = {};
        zr(this.targetStates, function (t, e) {
          var n = o.queryDataForActiveTarget(t);
          if (n) {
            if (e.current && n.query.isDocumentQuery()) {
              var r = new Bi(n.query.path);
              null !== o.pendingDocumentUpdates.get(r) || o.targetContainsDocument(t, r) || o.removeDocumentFromTarget(t, r, new ba(r, i))
            }
            e.hasPendingChanges && (a[t] = e.toTargetChange(), e.clearPendingChanges())
          }
        });
        var r = Ao();
        this.pendingDocumentTargetMapping.forEach(function (t, e) {
          var n = !0;
          e.forEachWhile(function (t) {
            var e = o.queryDataForActiveTarget(t);
            return !e || e.purpose === ws.LimboResolution || (n = !1)
          }), n && (r = r.add(t))
        });
        var t = new Rh(i, a, this.pendingTargetResets, this.pendingDocumentUpdates, r);
        return this.pendingDocumentUpdates = Eo(), this.pendingDocumentTargetMapping = Kh(), this.pendingTargetResets = new yo(yi), t
      }, Qh.prototype.addDocumentToTarget = function (t, e) {
        if (this.isActiveTarget(t)) {
          var n = this.targetContainsDocument(t, e.key) ? wh.Modified : wh.Added;
          this.ensureTargetState(t).addDocumentChange(e.key, n), this.pendingDocumentUpdates = this.pendingDocumentUpdates.insert(e.key, e), this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(e.key, this.ensureDocumentTargetMapping(e.key).add(t))
        }
      }, Qh.prototype.removeDocumentFromTarget = function (t, e, n) {
        if (this.isActiveTarget(t)) {
          var r = this.ensureTargetState(t);
          this.targetContainsDocument(t, e) ? r.addDocumentChange(e, wh.Removed) : r.removeDocumentChange(e), this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(e, this.ensureDocumentTargetMapping(e).delete(t)), n && (this.pendingDocumentUpdates = this.pendingDocumentUpdates.insert(e, n))
        }
      }, Qh.prototype.removeTarget = function (t) {
        delete this.targetStates[t]
      }, Qh.prototype.getCurrentDocumentCountForTarget = function (t) {
        var e = this.ensureTargetState(t).toTargetChange();
        return this.metadataProvider.getRemoteKeysForTarget(t).size + e.addedDocuments.size - e.removedDocuments.size
      }, Qh.prototype.recordPendingTargetRequest = function (t) {
        this.ensureTargetState(t).recordPendingTargetRequest()
      }, Qh.prototype.ensureTargetState = function (t) {
        return this.targetStates[t] || (this.targetStates[t] = new Vh), this.targetStates[t]
      }, Qh.prototype.ensureDocumentTargetMapping = function (t) {
        var e = this.pendingDocumentTargetMapping.get(t);
        return e || (e = new yo(yi), this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(t, e)), e
      }, Qh.prototype.isActiveTarget = function (t) {
        var e = null !== this.queryDataForActiveTarget(t);
        return e || _r("WatchChangeAggregator", "Detected inactive target", t), e
      }, Qh.prototype.queryDataForActiveTarget = function (t) {
        var e = this.targetStates[t];
        return e && e.isPending ? null : this.metadataProvider.getQueryDataForTarget(t)
      }, Qh.prototype.resetTarget = function (e) {
        var n = this;
        xr(!this.targetStates[e].isPending, "Should only reset active targets"), this.targetStates[e] = new Vh, this.metadataProvider.getRemoteKeysForTarget(e).forEach(function (t) {
          n.removeDocumentFromTarget(e, t, null)
        })
      }, Qh.prototype.targetContainsDocument = function (t, e) {
        return this.metadataProvider.getRemoteKeysForTarget(t).has(e)
      }, Qh);

      function Qh(t) {
        this.metadataProvider = t, this.targetStates = {}, this.pendingDocumentUpdates = Eo(), this.pendingDocumentTargetMapping = Kh(), this.pendingTargetResets = new yo(yi)
      }

      function Kh() {
        return new so(Bi.comparator)
      }

      function Gh() {
        return new so(Bi.comparator)
      }

      var jh = "RemoteStore", Wh = (zh.prototype.start = function () {
        return this.enableNetwork()
      }, zh.prototype.enableNetwork = function () {
        return p(this, void 0, void 0, function () {
          var e;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return this.networkEnabled = !0, this.canUseNetwork() ? (e = this.writeStream, [4, this.localStore.getLastStreamToken()]) : [3, 3];
              case 1:
                return e.lastStreamToken = t.sent(), this.shouldStartWatchStream() ? this.startWatchStream() : this.onlineStateTracker.set(uh.Unknown), [4, this.fillWritePipeline()];
              case 2:
                t.sent(), t.label = 3;
              case 3:
                return [2]
            }
          })
        })
      }, zh.prototype.disableNetwork = function () {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return this.networkEnabled = !1, [4, this.disableNetworkInternal()];
              case 1:
                return t.sent(), this.onlineStateTracker.set(uh.Offline), [2]
            }
          })
        })
      }, zh.prototype.disableNetworkInternal = function () {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return [4, this.writeStream.stop()];
              case 1:
                return t.sent(), [4, this.watchStream.stop()];
              case 2:
                return t.sent(), 0 < this.writePipeline.length && (_r(jh, "Stopping write stream with " + this.writePipeline.length + " pending writes"), this.writePipeline = []), this.cleanUpWatchStreamState(), [2]
            }
          })
        })
      }, zh.prototype.shutdown = function () {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return _r(jh, "RemoteStore shutting down."), this.networkEnabled = !1, [4, this.disableNetworkInternal()];
              case 1:
                return t.sent(), this.connectivityMonitor.shutdown(), this.onlineStateTracker.set(uh.Unknown), [2]
            }
          })
        })
      }, zh.prototype.listen = function (t) {
        xr(!jr(this.listenTargets, t.targetId), "listen called with duplicate targetId!"), this.listenTargets[t.targetId] = t, this.shouldStartWatchStream() ? this.startWatchStream() : this.watchStream.isOpen() && this.sendWatchRequest(t)
      }, zh.prototype.unlisten = function (t) {
        xr(jr(this.listenTargets, t), "unlisten called without assigned target ID!"), delete this.listenTargets[t], this.watchStream.isOpen() && this.sendUnwatchRequest(t), Yr(this.listenTargets) && (this.watchStream.isOpen() ? this.watchStream.markIdle() : this.canUseNetwork() && this.onlineStateTracker.set(uh.Unknown))
      }, zh.prototype.getQueryDataForTarget = function (t) {
        return this.listenTargets[t] || null
      }, zh.prototype.getRemoteKeysForTarget = function (t) {
        return this.syncEngine.getRemoteKeysForTarget(t)
      }, zh.prototype.sendWatchRequest = function (t) {
        this.watchChangeAggregator.recordPendingTargetRequest(t.targetId), this.watchStream.watch(t)
      }, zh.prototype.sendUnwatchRequest = function (t) {
        this.watchChangeAggregator.recordPendingTargetRequest(t), this.watchStream.unwatch(t)
      }, zh.prototype.startWatchStream = function () {
        xr(this.shouldStartWatchStream(), "startWatchStream() called when shouldStartWatchStream() is false."), this.watchChangeAggregator = new Uh(this), this.watchStream.start(), this.onlineStateTracker.handleWatchStreamStart()
      }, zh.prototype.shouldStartWatchStream = function () {
        return this.canUseNetwork() && !this.watchStream.isStarted() && !Yr(this.listenTargets)
      }, zh.prototype.canUseNetwork = function () {
        return this.isPrimary && this.networkEnabled
      }, zh.prototype.cleanUpWatchStreamState = function () {
        this.watchChangeAggregator = null
      }, zh.prototype.onWatchStreamOpen = function () {
        return p(this, void 0, void 0, function () {
          var n = this;
          return d(this, function (t) {
            return zr(this.listenTargets, function (t, e) {
              n.sendWatchRequest(e)
            }), [2]
          })
        })
      }, zh.prototype.onWatchStreamClose = function (e) {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            return void 0 === e && xr(!this.shouldStartWatchStream(), "Watch stream was stopped gracefully while still needed."), this.cleanUpWatchStreamState(), this.shouldStartWatchStream() ? (this.onlineStateTracker.handleWatchStreamFailure(e), this.startWatchStream()) : this.onlineStateTracker.set(uh.Unknown), [2]
          })
        })
      }, zh.prototype.onWatchStreamChange = function (n, r) {
        return p(this, void 0, void 0, function () {
          var e;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return this.onlineStateTracker.set(uh.Online), n instanceof Fh && n.state === Lh.Removed && n.cause ? [2, this.handleTargetError(n)] : (n instanceof xh ? this.watchChangeAggregator.handleDocumentChange(n) : n instanceof qh ? this.watchChangeAggregator.handleExistenceFilter(n) : (xr(n instanceof Fh, "Expected watchChange to be an instance of WatchTargetChange"), this.watchChangeAggregator.handleTargetChange(n)), r.isEqual(oo.MIN) ? [3, 3] : [4, this.localStore.getLastRemoteSnapshotVersion()]);
              case 1:
                return e = t.sent(), 0 <= r.compareTo(e) ? [4, this.raiseWatchSnapshot(r)] : [3, 3];
              case 2:
                t.sent(), t.label = 3;
              case 3:
                return [2]
            }
          })
        })
      }, zh.prototype.raiseWatchSnapshot = function (r) {
        var i = this;
        xr(!r.isEqual(oo.MIN), "Can't raise event for unknown SnapshotVersion");
        var t = this.watchChangeAggregator.createRemoteEvent(r);
        return zr(t.targetChanges, function (t, e) {
          if (0 < e.resumeToken.length) {
            var n = i.listenTargets[t];
            n && (i.listenTargets[t] = n.copy({resumeToken: e.resumeToken, snapshotVersion: r}))
          }
        }), t.targetMismatches.forEach(function (t) {
          var e = i.listenTargets[t];
          if (e) {
            i.listenTargets[t] = e.copy({resumeToken: Vr()}), i.sendUnwatchRequest(t);
            var n = new Ds(e.query, t, ws.ExistenceFilterMismatch, e.sequenceNumber);
            i.sendWatchRequest(n)
          }
        }), this.syncEngine.applyRemoteEvent(t)
      }, zh.prototype.handleTargetError = function (t) {
        var n = this;
        xr(!!t.cause, "Handling target error without a cause");
        var r = t.cause, i = Promise.resolve();
        return t.targetIds.forEach(function (e) {
          i = i.then(function () {
            return p(n, void 0, void 0, function () {
              return d(this, function (t) {
                return jr(this.listenTargets, e) ? (delete this.listenTargets[e], this.watchChangeAggregator.removeTarget(e), [2, this.syncEngine.rejectListen(e, r)]) : [2]
              })
            })
          })
        }), i
      }, zh.prototype.fillWritePipeline = function () {
        return p(this, void 0, void 0, function () {
          var e, n;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return this.canAddToWritePipeline() ? (e = 0 < this.writePipeline.length ? this.writePipeline[this.writePipeline.length - 1].batchId : -1, [4, this.localStore.nextMutationBatch(e)]) : [3, 4];
              case 1:
                return null !== (n = t.sent()) ? [3, 2] : (0 === this.writePipeline.length && this.writeStream.markIdle(), [3, 4]);
              case 2:
                return this.addToWritePipeline(n), [4, this.fillWritePipeline()];
              case 3:
                t.sent(), t.label = 4;
              case 4:
                return this.shouldStartWriteStream() && this.startWriteStream(), [2]
            }
          })
        })
      }, zh.prototype.canAddToWritePipeline = function () {
        return this.canUseNetwork() && this.writePipeline.length < 10
      }, zh.prototype.outstandingWrites = function () {
        return this.writePipeline.length
      }, zh.prototype.addToWritePipeline = function (t) {
        xr(this.canAddToWritePipeline(), "addToWritePipeline called when pipeline is full"), this.writePipeline.push(t), this.writeStream.isOpen() && this.writeStream.handshakeComplete && this.writeStream.writeMutations(t.mutations)
      }, zh.prototype.shouldStartWriteStream = function () {
        return this.canUseNetwork() && !this.writeStream.isStarted() && 0 < this.writePipeline.length
      }, zh.prototype.startWriteStream = function () {
        xr(this.shouldStartWriteStream(), "startWriteStream() called when shouldStartWriteStream() is false."), this.writeStream.start()
      }, zh.prototype.onWriteStreamOpen = function () {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            return this.writeStream.writeHandshake(), [2]
          })
        })
      }, zh.prototype.onWriteHandshakeComplete = function () {
        var r = this;
        return this.localStore.setLastStreamToken(this.writeStream.lastStreamToken).then(function () {
          for (var t = 0, e = r.writePipeline; t < e.length; t++) {
            var n = e[t];
            r.writeStream.writeMutations(n.mutations)
          }
        }).catch(Hs)
      }, zh.prototype.onMutationResult = function (t, e) {
        var n = this;
        xr(0 < this.writePipeline.length, "Got result for empty write pipeline");
        var r = this.writePipeline.shift(), i = Oo.from(r, t, e, this.writeStream.lastStreamToken);
        return this.syncEngine.applySuccessfulWrite(i).then(function () {
          return n.fillWritePipeline()
        })
      }, zh.prototype.onWriteStreamClose = function (n) {
        return p(this, void 0, void 0, function () {
          var e = this;
          return d(this, function (t) {
            return void 0 === n && xr(!this.shouldStartWriteStream(), "Write stream was stopped gracefully while still needed."), n && 0 < this.writePipeline.length ? [2, (this.writeStream.handshakeComplete ? this.handleWriteError(n) : this.handleHandshakeError(n)).then(function () {
              e.shouldStartWriteStream() && e.startWriteStream()
            })] : [2]
          })
        })
      }, zh.prototype.handleHandshakeError = function (e) {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            return vh(e.code) ? (_r(jh, "RemoteStore error before completed handshake; resetting stream token: ", this.writeStream.lastStreamToken), this.writeStream.lastStreamToken = Vr(), [2, this.localStore.setLastStreamToken(Vr()).catch(Hs)]) : [2]
          })
        })
      }, zh.prototype.handleWriteError = function (r) {
        return p(this, void 0, void 0, function () {
          var e, n = this;
          return d(this, function (t) {
            return function (t) {
              return vh(t) && t !== Ur.ABORTED
            }(r.code) ? (e = this.writePipeline.shift(), this.writeStream.inhibitBackoff(), [2, this.syncEngine.rejectFailedWrite(e.batchId, r).then(function () {
              return n.fillWritePipeline()
            })]) : [2]
          })
        })
      }, zh.prototype.createTransaction = function () {
        return new fh(this.datastore)
      }, zh.prototype.restartNetwork = function () {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return this.networkEnabled = !1, [4, this.disableNetworkInternal()];
              case 1:
                return t.sent(), this.onlineStateTracker.set(uh.Unknown), [4, this.enableNetwork()];
              case 2:
                return t.sent(), [2]
            }
          })
        })
      }, zh.prototype.handleCredentialChange = function () {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return this.canUseNetwork() ? (_r(jh, "RemoteStore restarting streams for new credential"), [4, this.restartNetwork()]) : [3, 2];
              case 1:
                t.sent(), t.label = 2;
              case 2:
                return [2]
            }
          })
        })
      }, zh.prototype.applyPrimaryState = function (e) {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return (this.isPrimary = e) && this.networkEnabled ? [4, this.enableNetwork()] : [3, 2];
              case 1:
                return t.sent(), [3, 4];
              case 2:
                return e ? [3, 4] : [4, this.disableNetworkInternal()];
              case 3:
                t.sent(), this.onlineStateTracker.set(uh.Unknown), t.label = 4;
              case 4:
                return [2]
            }
          })
        })
      }, zh);

      function zh(t, e, n, r, i) {
        var o = this;
        this.localStore = t, this.datastore = e, this.writePipeline = [], this.listenTargets = {}, this.watchChangeAggregator = null, this.networkEnabled = !1, this.isPrimary = !1, this.connectivityMonitor = i, this.connectivityMonitor.addCallback(function (t) {
          n.enqueueAndForget(function () {
            return p(o, void 0, void 0, function () {
              return d(this, function (t) {
                switch (t.label) {
                  case 0:
                    return this.canUseNetwork() ? (_r(jh, "Restarting streams for network reachability change."), [4, this.restartNetwork()]) : [3, 2];
                  case 1:
                    t.sent(), t.label = 2;
                  case 2:
                    return [2]
                }
              })
            })
          })
        }), this.onlineStateTracker = new yh(n, r), this.watchStream = this.datastore.newPersistentWatchStream({
          onOpen: this.onWatchStreamOpen.bind(this),
          onClose: this.onWatchStreamClose.bind(this),
          onWatchChange: this.onWatchStreamChange.bind(this)
        }), this.writeStream = this.datastore.newPersistentWriteStream({
          onOpen: this.onWriteStreamOpen.bind(this),
          onClose: this.onWriteStreamClose.bind(this),
          onHandshakeComplete: this.onWriteHandshakeComplete.bind(this),
          onMutationResult: this.onMutationResult.bind(this)
        })
      }

      var Hh = (Object.defineProperty(Yh.prototype, "latitude", {
        get: function () {
          return this._lat
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(Yh.prototype, "longitude", {
        get: function () {
          return this._long
        }, enumerable: !0, configurable: !0
      }), Yh.prototype.isEqual = function (t) {
        return this._lat === t._lat && this._long === t._long
      }, Yh.prototype._compareTo = function (t) {
        return yi(this._lat, t._lat) || yi(this._long, t._long)
      }, Yh);

      function Yh(t, e) {
        if (Jr("GeoPoint", arguments, 2), ti("GeoPoint", "number", 1, t), ti("GeoPoint", "number", 2, e), !isFinite(t) || t < -90 || 90 < t) throw new Qr(Ur.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
        if (!isFinite(e) || e < -180 || 180 < e) throw new Qr(Ur.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
        this._lat = t, this._long = e
      }

      var Xh = (Jh.atPath = function (t) {
        return new Jh(t)
      }, Object.defineProperty(Jh.prototype, "orderBy", {
        get: function () {
          if (null === this.memoizedOrderBy) {
            var t = this.getInequalityFilterField(), e = this.getFirstOrderByField();
            if (null !== t && null === e) t.isKeyField() ? this.memoizedOrderBy = [Cl] : this.memoizedOrderBy = [new Tl(t), Cl]; else {
              xr(null === t || null !== e && t.isEqual(e), "First orderBy should match inequality field.");
              for (var n = !(this.memoizedOrderBy = []), r = 0, i = this.explicitOrderBy; r < i.length; r++) {
                var o = i[r];
                this.memoizedOrderBy.push(o), o.field.isKeyField() && (n = !0)
              }
              if (!n) {
                var a = 0 < this.explicitOrderBy.length ? this.explicitOrderBy[this.explicitOrderBy.length - 1].dir : bl.ASCENDING;
                this.memoizedOrderBy.push(a === bl.ASCENDING ? Cl : Dl)
              }
            }
          }
          return this.memoizedOrderBy
        }, enumerable: !0, configurable: !0
      }), Jh.prototype.addFilter = function (t) {
        xr(null == this.getInequalityFilterField() || !(t instanceof nl) || !t.isInequality() || t.field.isEqual(this.getInequalityFilterField()), "Query must only have one inequality field."), xr(!this.isDocumentQuery(), "No filtering allowed for document query");
        var e = this.filters.concat([t]);
        return new Jh(this.path, this.collectionGroup, this.explicitOrderBy.slice(), e, this.limit, this.startAt, this.endAt)
      }, Jh.prototype.addOrderBy = function (t) {
        xr(!this.startAt && !this.endAt, "Bounds must be set after orderBy");
        var e = this.explicitOrderBy.concat([t]);
        return new Jh(this.path, this.collectionGroup, e, this.filters.slice(), this.limit, this.startAt, this.endAt)
      }, Jh.prototype.withLimit = function (t) {
        return new Jh(this.path, this.collectionGroup, this.explicitOrderBy.slice(), this.filters.slice(), t, this.startAt, this.endAt)
      }, Jh.prototype.withStartAt = function (t) {
        return new Jh(this.path, this.collectionGroup, this.explicitOrderBy.slice(), this.filters.slice(), this.limit, t, this.endAt)
      }, Jh.prototype.withEndAt = function (t) {
        return new Jh(this.path, this.collectionGroup, this.explicitOrderBy.slice(), this.filters.slice(), this.limit, this.startAt, t)
      }, Jh.prototype.asCollectionQueryAtPath = function (t) {
        return new Jh(t, null, this.explicitOrderBy.slice(), this.filters.slice(), this.limit, this.startAt, this.endAt)
      }, Jh.prototype.canonicalId = function () {
        if (null === this.memoizedCanonicalId) {
          var t = this.path.canonicalString();
          this.isCollectionGroupQuery() && (t += "|cg:" + this.collectionGroup), t += "|f:";
          for (var e = 0, n = this.filters; e < n.length; e++) t += n[e].canonicalId(), t += ",";
          t += "|ob:";
          for (var r = 0, i = this.orderBy; r < i.length; r++) t += i[r].canonicalId(), t += ",";
          jc(this.limit) || (t += "|l:", t += this.limit), this.startAt && (t += "|lb:", t += this.startAt.canonicalId()), this.endAt && (t += "|ub:", t += this.endAt.canonicalId()), this.memoizedCanonicalId = t
        }
        return this.memoizedCanonicalId
      }, Jh.prototype.toString = function () {
        var t = "Query(" + this.path.canonicalString();
        return this.isCollectionGroupQuery() && (t += " collectionGroup=" + this.collectionGroup), 0 < this.filters.length && (t += ", filters: [" + this.filters.join(", ") + "]"), jc(this.limit) || (t += ", limit: " + this.limit), 0 < this.explicitOrderBy.length && (t += ", orderBy: [" + this.explicitOrderBy.join(", ") + "]"), this.startAt && (t += ", startAt: " + this.startAt.canonicalId()), this.endAt && (t += ", endAt: " + this.endAt.canonicalId()), t + ")"
      }, Jh.prototype.isEqual = function (t) {
        if (this.limit !== t.limit) return !1;
        if (this.orderBy.length !== t.orderBy.length) return !1;
        for (var e = 0; e < this.orderBy.length; e++) if (!this.orderBy[e].isEqual(t.orderBy[e])) return !1;
        if (this.filters.length !== t.filters.length) return !1;
        for (e = 0; e < this.filters.length; e++) if (!this.filters[e].isEqual(t.filters[e])) return !1;
        return this.collectionGroup === t.collectionGroup && !!this.path.isEqual(t.path) && !(null !== this.startAt ? !this.startAt.isEqual(t.startAt) : null !== t.startAt) && (null !== this.endAt ? this.endAt.isEqual(t.endAt) : null === t.endAt)
      }, Jh.prototype.docComparator = function (t, e) {
        for (var n = !1, r = 0, i = this.orderBy; r < i.length; r++) {
          var o = i[r], a = o.compare(t, e);
          if (0 !== a) return a;
          n = n || o.field.isKeyField()
        }
        return xr(n, "orderBy used that doesn't compare on key field"), 0
      }, Jh.prototype.matches = function (t) {
        return this.matchesPathAndCollectionGroup(t) && this.matchesOrderBy(t) && this.matchesFilters(t) && this.matchesBounds(t)
      }, Jh.prototype.hasLimit = function () {
        return !jc(this.limit)
      }, Jh.prototype.getFirstOrderByField = function () {
        return 0 < this.explicitOrderBy.length ? this.explicitOrderBy[0].field : null
      }, Jh.prototype.getInequalityFilterField = function () {
        for (var t = 0, e = this.filters; t < e.length; t++) {
          var n = e[t];
          if (n instanceof nl && n.isInequality()) return n.field
        }
        return null
      }, Jh.prototype.findFilterOperator = function (t) {
        for (var e = 0, n = this.filters; e < n.length; e++) {
          var r = n[e];
          if (r instanceof nl && 0 <= t.indexOf(r.op)) return r.op
        }
        return null
      }, Jh.prototype.isDocumentQuery = function () {
        return Bi.isDocumentKey(this.path) && null === this.collectionGroup && 0 === this.filters.length
      }, Jh.prototype.isCollectionGroupQuery = function () {
        return null !== this.collectionGroup
      }, Jh.prototype.matchesPathAndCollectionGroup = function (t) {
        var e = t.key.path;
        return null !== this.collectionGroup ? t.key.hasCollectionId(this.collectionGroup) && this.path.isPrefixOf(e) : Bi.isDocumentKey(this.path) ? this.path.isEqual(e) : this.path.isImmediateParentOf(e)
      }, Jh.prototype.matchesOrderBy = function (t) {
        for (var e = 0, n = this.explicitOrderBy; e < n.length; e++) {
          var r = n[e];
          if (!r.field.isKeyField() && null === t.field(r.field)) return !1
        }
        return !0
      }, Jh.prototype.matchesFilters = function (t) {
        for (var e = 0, n = this.filters; e < n.length; e++) if (!n[e].matches(t)) return !1;
        return !0
      }, Jh.prototype.matchesBounds = function (t) {
        return !(this.startAt && !this.startAt.sortsBeforeDocument(this.orderBy, t) || this.endAt && this.endAt.sortsBeforeDocument(this.orderBy, t))
      }, Jh.prototype.assertValidBound = function (t) {
        xr(t.position.length <= this.orderBy.length, "Bound is longer than orderBy")
      }, Jh);

      function Jh(t, e, n, r, i, o, a) {
        void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), void 0 === i && (i = null), void 0 === o && (o = null), void 0 === a && (a = null), this.path = t, this.collectionGroup = e, this.explicitOrderBy = n, this.filters = r, this.limit = i, this.startAt = o, this.endAt = a, this.memoizedCanonicalId = null, this.memoizedOrderBy = null, this.startAt && this.assertValidBound(this.startAt), this.endAt && this.assertValidBound(this.endAt)
      }

      function $h() {
      }

      var Zh = (tl.fromString = function (t) {
        switch (t) {
          case"<":
            return tl.LESS_THAN;
          case"<=":
            return tl.LESS_THAN_OR_EQUAL;
          case"==":
            return tl.EQUAL;
          case">=":
            return tl.GREATER_THAN_OR_EQUAL;
          case">":
            return tl.GREATER_THAN;
          case"array-contains":
            return tl.ARRAY_CONTAINS;
          case"in":
            return tl.IN;
          case"array-contains-any":
            return tl.ARRAY_CONTAINS_ANY;
          default:
            return Pr("Unknown FieldFilter operator: " + t)
        }
      }, tl.prototype.toString = function () {
        return this.name
      }, tl.prototype.isEqual = function (t) {
        return this.name === t.name
      }, tl.LESS_THAN = new tl("<"), tl.LESS_THAN_OR_EQUAL = new tl("<="), tl.EQUAL = new tl("=="), tl.GREATER_THAN = new tl(">"), tl.GREATER_THAN_OR_EQUAL = new tl(">="), tl.ARRAY_CONTAINS = new tl("array-contains"), tl.IN = new tl("in"), tl.ARRAY_CONTAINS_ANY = new tl("array-contains-any"), tl);

      function tl(t) {
        this.name = t
      }

      var el, nl = (s(rl, el = $h), rl.create = function (t, e, n) {
        if (t.isKeyField()) return e === Zh.IN ? (xr(n instanceof Wu, "Comparing on key with IN, but filter value not an ArrayValue"), xr(n.internalValue.every(function (t) {
          return t instanceof qu
        }), "Comparing on key with IN, but an array value was not a RefValue"), new ul(t, n)) : (xr(n instanceof qu, "Comparing on key, but filter value not a RefValue"), xr(e !== Zh.ARRAY_CONTAINS && e !== Zh.ARRAY_CONTAINS_ANY, "'" + e.toString() + "' queries don't make sense on document keys."), new ol(t, e, n));
        if (n.isEqual(cu.INSTANCE)) {
          if (e !== Zh.EQUAL) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid query. Null supports only equality comparisons.");
          return new rl(t, e, n)
        }
        if (n.isEqual(Su.NAN)) {
          if (e !== Zh.EQUAL) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid query. NaN supports only equality comparisons.");
          return new rl(t, e, n)
        }
        return e === Zh.ARRAY_CONTAINS ? new ll(t, n) : e === Zh.IN ? (xr(n instanceof Wu, "IN filter has invalid value: " + n.toString()), new dl(t, n)) : e === Zh.ARRAY_CONTAINS_ANY ? (xr(n instanceof Wu, "ARRAY_CONTAINS_ANY filter has invalid value: " + n.toString()), new gl(t, n)) : new rl(t, e, n)
      }, rl.prototype.matches = function (t) {
        var e = t.field(this.field);
        return null !== e && this.value.typeOrder === e.typeOrder && this.matchesComparison(e.compareTo(this.value))
      }, rl.prototype.matchesComparison = function (t) {
        switch (this.op) {
          case Zh.LESS_THAN:
            return t < 0;
          case Zh.LESS_THAN_OR_EQUAL:
            return t <= 0;
          case Zh.EQUAL:
            return 0 === t;
          case Zh.GREATER_THAN:
            return 0 < t;
          case Zh.GREATER_THAN_OR_EQUAL:
            return 0 <= t;
          default:
            return Pr("Unknown FieldFilter operator: " + this.op)
        }
      }, rl.prototype.isInequality = function () {
        return 0 <= [Zh.LESS_THAN, Zh.LESS_THAN_OR_EQUAL, Zh.GREATER_THAN, Zh.GREATER_THAN_OR_EQUAL].indexOf(this.op)
      }, rl.prototype.canonicalId = function () {
        return this.field.canonicalString() + this.op.toString() + this.value.toString()
      }, rl.prototype.isEqual = function (t) {
        return t instanceof rl && this.op.isEqual(t.op) && this.field.isEqual(t.field) && this.value.isEqual(t.value)
      }, rl.prototype.toString = function () {
        return this.field.canonicalString() + " " + this.op + " " + this.value.value()
      }, rl);

      function rl(t, e, n) {
        var r = el.call(this) || this;
        return r.field = t, r.op = e, r.value = n, r
      }

      var il, ol = (s(al, il = nl), al.prototype.matches = function (t) {
        var e = this.value, n = Bi.comparator(t.key, e.key);
        return this.matchesComparison(n)
      }, al);

      function al() {
        return null !== il && il.apply(this, arguments) || this
      }

      var sl, ul = (s(cl, sl = nl), cl.prototype.matches = function (e) {
        return this.value.internalValue.some(function (t) {
          return e.key.isEqual(t.key)
        })
      }, cl);

      function cl(t, e) {
        var n = sl.call(this, t, Zh.IN, e) || this;
        return n.value = e, n
      }

      var hl, ll = (s(fl, hl = nl), fl.prototype.matches = function (t) {
        var e = t.field(this.field);
        return e instanceof Wu && e.contains(this.value)
      }, fl);

      function fl(t, e) {
        return hl.call(this, t, Zh.ARRAY_CONTAINS, e) || this
      }

      var pl, dl = (s(ml, pl = nl), ml.prototype.matches = function (t) {
        var e = this.value, n = t.field(this.field);
        return null !== n && e.contains(n)
      }, ml);

      function ml(t, e) {
        var n = pl.call(this, t, Zh.IN, e) || this;
        return n.value = e, n
      }

      var yl, gl = (s(vl, yl = nl), vl.prototype.matches = function (t) {
        var e = this, n = t.field(this.field);
        return n instanceof Wu && n.internalValue.some(function (t) {
          return e.value.contains(t)
        })
      }, vl);

      function vl(t, e) {
        var n = yl.call(this, t, Zh.ARRAY_CONTAINS_ANY, e) || this;
        return n.value = e, n
      }

      var bl = (wl.prototype.toString = function () {
        return this.name
      }, wl.ASCENDING = new wl("asc"), wl.DESCENDING = new wl("desc"), wl);

      function wl(t) {
        this.name = t
      }

      var El = (Sl.prototype.canonicalId = function () {
        for (var t = this.before ? "b:" : "a:", e = 0, n = this.position; e < n.length; e++) t += n[e].toString();
        return t
      }, Sl.prototype.sortsBeforeDocument = function (t, e) {
        xr(this.position.length <= t.length, "Bound has more components than query's orderBy");
        for (var n = 0, r = 0; r < this.position.length; r++) {
          var i = t[r], o = this.position[r];
          if (i.field.isKeyField()) xr(o instanceof qu, "Bound has a non-key value where the key path is being used."), n = Bi.comparator(o.key, e.key); else {
            var a = e.field(i.field);
            xr(void 0 !== a, "Field should exist since document matched the orderBy already."), n = o.compareTo(a)
          }
          if (i.dir === bl.DESCENDING && (n *= -1), 0 !== n) break
        }
        return this.before ? n <= 0 : n < 0
      }, Sl.prototype.isEqual = function (t) {
        if (null === t) return !1;
        if (this.before !== t.before || this.position.length !== t.position.length) return !1;
        for (var e = 0; e < this.position.length; e++) {
          var n = this.position[e], r = t.position[e];
          if (!n.isEqual(r)) return !1
        }
        return !0
      }, Sl);

      function Sl(t, e) {
        this.position = t, this.before = e
      }

      var Tl = (Il.prototype.compare = function (t, e) {
        var n = this.isKeyOrderBy ? ya.compareByKey(t, e) : ya.compareByField(this.field, t, e);
        switch (this.dir) {
          case bl.ASCENDING:
            return n;
          case bl.DESCENDING:
            return -1 * n;
          default:
            return Pr("Unknown direction: " + this.dir)
        }
      }, Il.prototype.canonicalId = function () {
        return this.field.canonicalString() + this.dir.toString()
      }, Il.prototype.toString = function () {
        return this.field.canonicalString() + " (" + this.dir + ")"
      }, Il.prototype.isEqual = function (t) {
        return this.dir === t.dir && this.field.isEqual(t.field)
      }, Il);

      function Il(t, e) {
        this.field = t, void 0 === e && (e = bl.ASCENDING), this.dir = e, this.isKeyOrderBy = t.isKeyField()
      }

      var Cl = new Tl(Fi.keyField(), bl.ASCENDING), Dl = new Tl(Fi.keyField(), bl.DESCENDING),
        Nl = (Al.prototype.applyToLocalView = function (t, e) {
          return new Mu(e, t)
        }, Al.prototype.applyToRemoteDocument = function (t, e) {
          return e
        }, Al.prototype.computeBaseValue = function (t) {
          return null
        }, Al.prototype.isEqual = function (t) {
          return t instanceof Al
        }, Al.instance = new Al, Al);

      function Al() {
      }

      var kl = (Rl.prototype.applyToLocalView = function (t, e) {
        return this.apply(t)
      }, Rl.prototype.applyToRemoteDocument = function (t, e) {
        return this.apply(t)
      }, Rl.prototype.apply = function (t) {
        for (var n = Pl(t), e = function (e) {
          n.find(function (t) {
            return t.isEqual(e)
          }) || n.push(e)
        }, r = 0, i = this.elements; r < i.length; r++) e(i[r]);
        return new Wu(n)
      }, Rl.prototype.computeBaseValue = function (t) {
        return null
      }, Rl.prototype.isEqual = function (t) {
        return t instanceof Rl && gi(t.elements, this.elements)
      }, Rl);

      function Rl(t) {
        this.elements = t
      }

      var Ml = (_l.prototype.applyToLocalView = function (t, e) {
        return this.apply(t)
      }, _l.prototype.applyToRemoteDocument = function (t, e) {
        return this.apply(t)
      }, _l.prototype.apply = function (t) {
        for (var n = Pl(t), e = function (e) {
          n = n.filter(function (t) {
            return !t.isEqual(e)
          })
        }, r = 0, i = this.elements; r < i.length; r++) e(i[r]);
        return new Wu(n)
      }, _l.prototype.computeBaseValue = function (t) {
        return null
      }, _l.prototype.isEqual = function (t) {
        return t instanceof _l && gi(t.elements, this.elements)
      }, _l);

      function _l(t) {
        this.elements = t
      }

      var Ol = (Ll.prototype.applyToLocalView = function (t, e) {
        var n = this.computeBaseValue(t);
        if (n instanceof bu && this.operand instanceof bu) {
          var r = n.internalValue + this.operand.internalValue;
          return new bu(r)
        }
        return r = n.internalValue + this.operand.internalValue, new Su(r)
      }, Ll.prototype.applyToRemoteDocument = function (t, e) {
        return xr(null !== e, "Didn't receive transformResult for NUMERIC_ADD transform"), e
      }, Ll.prototype.computeBaseValue = function (t) {
        return t instanceof mu ? t : new bu(0)
      }, Ll.prototype.isEqual = function (t) {
        return t instanceof Ll && this.operand.isEqual(t.operand)
      }, Ll);

      function Ll(t) {
        this.operand = t
      }

      function Pl(t) {
        return t instanceof Wu ? t.internalValue.slice() : []
      }

      var xl = (ql.prototype.isEqual = function (t) {
        return t && t.count === this.count
      }, ql);

      function ql(t) {
        this.count = t
      }

      var Fl, Vl, Bl = ((Fl = {})[bl.ASCENDING.name] = "ASCENDING", Fl[bl.DESCENDING.name] = "DESCENDING", Fl),
        Ul = ((Vl = {})[Zh.LESS_THAN.name] = "LESS_THAN", Vl[Zh.LESS_THAN_OR_EQUAL.name] = "LESS_THAN_OR_EQUAL", Vl[Zh.GREATER_THAN.name] = "GREATER_THAN", Vl[Zh.GREATER_THAN_OR_EQUAL.name] = "GREATER_THAN_OR_EQUAL", Vl[Zh.EQUAL.name] = "EQUAL", Vl[Zh.ARRAY_CONTAINS.name] = "ARRAY_CONTAINS", Vl[Zh.IN.name] = "IN", Vl[Zh.ARRAY_CONTAINS_ANY.name] = "ARRAY_CONTAINS_ANY", Vl),
        Ql = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

      function Kl(t, e) {
        xr(!jc(t), e + " is missing")
      }

      function Gl(t) {
        return "number" == typeof t ? t : "string" == typeof t ? Number(t) : Pr("can't parse " + t)
      }

      var jl = (Wl.prototype.emptyByteString = function () {
        return this.options.useProto3Json ? "" : new Uint8Array(0)
      }, Wl.prototype.unsafeCastProtoByteString = function (t) {
        return t
      }, Wl.prototype.fromRpcStatus = function (t) {
        var e = void 0 === t.code ? Ur.UNKNOWN : bh(t.code);
        return new Qr(e, t.message || "")
      }, Wl.prototype.toInt32Value = function (t) {
        return jc(t) ? void 0 : {value: t}
      }, Wl.prototype.fromInt32Value = function (t) {
        var e;
        return jc(e = "object" == typeof t ? t.value : t) ? null : e
      }, Wl.prototype.toTimestamp = function (t) {
        return {seconds: "" + t.seconds, nanos: t.nanoseconds}
      }, Wl.prototype.fromTimestamp = function (t) {
        if ("string" == typeof t) return this.fromIso8601String(t);
        xr(!!t, "Cannot deserialize null or undefined timestamp.");
        var e = Gl(t.seconds || "0"), n = t.nanos || 0;
        return new ro(e, n)
      }, Wl.prototype.fromIso8601String = function (t) {
        var e = 0, n = Ql.exec(t);
        if (xr(!!n, "invalid timestamp: " + t), n[1]) {
          var r = n[1];
          r = (r + "000000000").substr(0, 9), e = Number(r)
        }
        var i = new Date(t), o = Math.floor(i.getTime() / 1e3);
        return new ro(o, e)
      }, Wl.prototype.toBytes = function (t) {
        return this.options.useProto3Json ? t.toBase64() : this.unsafeCastProtoByteString(t.toUint8Array())
      }, Wl.prototype.fromBlob = function (t) {
        return "string" == typeof t ? (xr(this.options.useProto3Json, "Expected bytes to be passed in as Uint8Array, but got a string instead."), Ei.fromBase64String(t)) : (xr(!this.options.useProto3Json, "Expected bytes to be passed in as Uint8Array, but got a string instead."), Ei.fromUint8Array(t))
      }, Wl.prototype.toVersion = function (t) {
        return this.toTimestamp(t.toTimestamp())
      }, Wl.prototype.fromVersion = function (t) {
        return xr(!!t, "Trying to deserialize version that isn't set"), oo.fromTimestamp(this.fromTimestamp(t))
      }, Wl.prototype.toResourceName = function (t, e) {
        return this.fullyQualifiedPrefixPath(t).child("documents").child(e).canonicalString()
      }, Wl.prototype.fromResourceName = function (t) {
        var e = Li.fromString(t);
        return xr(this.isValidResourceName(e), "Tried to deserialize invalid key " + e.toString()), e
      }, Wl.prototype.toName = function (t) {
        return this.toResourceName(this.databaseId, t.path)
      }, Wl.prototype.fromName = function (t) {
        var e = this.fromResourceName(t);
        return xr(e.get(1) === this.databaseId.projectId, "Tried to deserialize key from different project: " + e.get(1) + " vs " + this.databaseId.projectId), xr(!e.get(3) && !this.databaseId.database || e.get(3) === this.databaseId.database, "Tried to deserialize key from different database: " + e.get(3) + " vs " + this.databaseId.database), new Bi(this.extractLocalPathFromResourceName(e))
      }, Wl.prototype.toQueryPath = function (t) {
        return this.toResourceName(this.databaseId, t)
      }, Wl.prototype.fromQueryPath = function (t) {
        var e = this.fromResourceName(t);
        return 4 === e.length ? Li.EMPTY_PATH : this.extractLocalPathFromResourceName(e)
      }, Object.defineProperty(Wl.prototype, "encodedDatabaseId", {
        get: function () {
          return new Li(["projects", this.databaseId.projectId, "databases", this.databaseId.database]).canonicalString()
        }, enumerable: !0, configurable: !0
      }), Wl.prototype.fullyQualifiedPrefixPath = function (t) {
        return new Li(["projects", t.projectId, "databases", t.database])
      }, Wl.prototype.extractLocalPathFromResourceName = function (t) {
        return xr(4 < t.length && "documents" === t.get(4), "tried to deserialize invalid key " + t.toString()), t.popFirst(5)
      }, Wl.prototype.isValidResourceName = function (t) {
        return 4 <= t.length && "projects" === t.get(0) && "databases" === t.get(2)
      }, Wl.prototype.toValue = function (t) {
        if (t instanceof cu) return {nullValue: "NULL_VALUE"};
        if (t instanceof fu) return {booleanValue: t.value()};
        if (t instanceof bu) return {integerValue: "" + t.value()};
        if (t instanceof Su) {
          var e = t.value();
          if (this.options.useProto3Json) {
            if (isNaN(e)) return {doubleValue: "NaN"};
            if (e === 1 / 0) return {doubleValue: "Infinity"};
            if (e === -1 / 0) return {doubleValue: "-Infinity"}
          }
          return {doubleValue: t.value()}
        }
        return t instanceof Cu ? {stringValue: t.value()} : t instanceof Ku ? {mapValue: this.toMapValue(t)} : t instanceof Wu ? {arrayValue: this.toArrayValue(t)} : t instanceof Au ? {timestampValue: this.toTimestamp(t.internalValue)} : t instanceof Bu ? {
          geoPointValue: {
            latitude: t.value().latitude,
            longitude: t.value().longitude
          }
        } : t instanceof Lu ? {bytesValue: this.toBytes(t.value())} : t instanceof qu ? {referenceValue: this.toResourceName(t.databaseId, t.key.path)} : Pr("Unknown FieldValue " + JSON.stringify(t))
      }, Wl.prototype.fromValue = function (t) {
        var e = this;
        if ("nullValue" in t) return cu.INSTANCE;
        if ("booleanValue" in t) return fu.of(t.booleanValue);
        if ("integerValue" in t) return new bu(Gl(t.integerValue));
        if ("doubleValue" in t) {
          if (this.options.useProto3Json) {
            if ("NaN" === t.doubleValue) return Su.NAN;
            if ("Infinity" === t.doubleValue) return Su.POSITIVE_INFINITY;
            if ("-Infinity" === t.doubleValue) return Su.NEGATIVE_INFINITY
          }
          return new Su(t.doubleValue)
        }
        if ("stringValue" in t) return new Cu(t.stringValue);
        if ("mapValue" in t) return this.fromFields(t.mapValue.fields || {});
        if ("arrayValue" in t) {
          Kl(t.arrayValue, "arrayValue");
          var n = t.arrayValue.values || [];
          return new Wu(n.map(function (t) {
            return e.fromValue(t)
          }))
        }
        if ("timestampValue" in t) return Kl(t.timestampValue, "timestampValue"), new Au(this.fromTimestamp(t.timestampValue));
        if ("geoPointValue" in t) {
          Kl(t.geoPointValue, "geoPointValue");
          var r = t.geoPointValue.latitude || 0, i = t.geoPointValue.longitude || 0;
          return new Bu(new Hh(r, i))
        }
        if ("bytesValue" in t) {
          Kl(t.bytesValue, "bytesValue");
          var o = this.fromBlob(t.bytesValue);
          return new Lu(o)
        }
        if ("referenceValue" in t) {
          Kl(t.referenceValue, "referenceValue");
          var a = this.fromResourceName(t.referenceValue), s = new Di(a.get(1), a.get(3)),
            u = new Bi(this.extractLocalPathFromResourceName(a));
          return new qu(s, u)
        }
        return Pr("Unknown Value proto " + JSON.stringify(t))
      }, Wl.prototype.toMutationDocument = function (t, e) {
        return {name: this.toName(t), fields: this.toFields(e)}
      }, Wl.prototype.toDocument = function (t) {
        return xr(!t.hasLocalMutations, "Can't serialize documents with mutations."), {
          name: this.toName(t.key),
          fields: this.toFields(t.data),
          updateTime: this.toTimestamp(t.version.toTimestamp())
        }
      }, Wl.prototype.fromDocument = function (t, e) {
        return new ya(this.fromName(t.name), this.fromVersion(t.updateTime), this.fromFields(t.fields || {}), {hasCommittedMutations: !!e})
      }, Wl.prototype.toFields = function (t) {
        var n = this, r = {};
        return t.forEach(function (t, e) {
          r[t] = n.toValue(e)
        }), r
      }, Wl.prototype.fromFields = function (t) {
        var n = this, e = t, r = Ku.EMPTY;
        return Hr(e, function (t, e) {
          r = r.set(new Fi([t]), n.fromValue(e))
        }), r
      }, Wl.prototype.toMapValue = function (t) {
        return {fields: this.toFields(t)}
      }, Wl.prototype.toArrayValue = function (t) {
        var e = this, n = [];
        return t.forEach(function (t) {
          n.push(e.toValue(t))
        }), {values: n}
      }, Wl.prototype.fromFound = function (t) {
        xr(!!t.found, "Tried to deserialize a found document from a missing document."), Kl(t.found.name, "doc.found.name"), Kl(t.found.updateTime, "doc.found.updateTime");
        var e = this.fromName(t.found.name), n = this.fromVersion(t.found.updateTime),
          r = this.fromFields(t.found.fields || {});
        return new ya(e, n, r, {}, t.found)
      }, Wl.prototype.fromMissing = function (t) {
        xr(!!t.missing, "Tried to deserialize a missing document from a found document."), xr(!!t.readTime, "Tried to deserialize a missing document without a read time.");
        var e = this.fromName(t.missing), n = this.fromVersion(t.readTime);
        return new ba(e, n)
      }, Wl.prototype.fromMaybeDocument = function (t) {
        return "found" in t ? this.fromFound(t) : "missing" in t ? this.fromMissing(t) : Pr("invalid batch get response: " + JSON.stringify(t))
      }, Wl.prototype.toWatchTargetChangeState = function (t) {
        switch (t) {
          case Lh.Added:
            return "ADD";
          case Lh.Current:
            return "CURRENT";
          case Lh.NoChange:
            return "NO_CHANGE";
          case Lh.Removed:
            return "REMOVE";
          case Lh.Reset:
            return "RESET";
          default:
            return Pr("Unknown WatchTargetChangeState: " + t)
        }
      }, Wl.prototype.toTestWatchChange = function (t) {
        if (t instanceof qh) return {filter: {count: t.existenceFilter.count, targetId: t.targetId}};
        if (t instanceof xh) {
          if (t.newDoc instanceof ya) {
            var e = t.newDoc;
            return {
              documentChange: {
                document: {
                  name: this.toName(e.key),
                  fields: this.toFields(e.data),
                  updateTime: this.toVersion(e.version)
                }, targetIds: t.updatedTargetIds, removedTargetIds: t.removedTargetIds
              }
            }
          }
          if (t.newDoc instanceof ba) return e = t.newDoc, {
            documentDelete: {
              document: this.toName(e.key),
              readTime: this.toVersion(e.version),
              removedTargetIds: t.removedTargetIds
            }
          };
          if (null === t.newDoc) return {
            documentRemove: {
              document: this.toName(t.key),
              removedTargetIds: t.removedTargetIds
            }
          }
        }
        if (t instanceof Fh) {
          var n = void 0;
          return t.cause && (n = {
            code: function (t) {
              if (void 0 === t) return dh.OK;
              switch (t) {
                case Ur.OK:
                  return dh.OK;
                case Ur.CANCELLED:
                  return dh.CANCELLED;
                case Ur.UNKNOWN:
                  return dh.UNKNOWN;
                case Ur.DEADLINE_EXCEEDED:
                  return dh.DEADLINE_EXCEEDED;
                case Ur.RESOURCE_EXHAUSTED:
                  return dh.RESOURCE_EXHAUSTED;
                case Ur.INTERNAL:
                  return dh.INTERNAL;
                case Ur.UNAVAILABLE:
                  return dh.UNAVAILABLE;
                case Ur.UNAUTHENTICATED:
                  return dh.UNAUTHENTICATED;
                case Ur.INVALID_ARGUMENT:
                  return dh.INVALID_ARGUMENT;
                case Ur.NOT_FOUND:
                  return dh.NOT_FOUND;
                case Ur.ALREADY_EXISTS:
                  return dh.ALREADY_EXISTS;
                case Ur.PERMISSION_DENIED:
                  return dh.PERMISSION_DENIED;
                case Ur.FAILED_PRECONDITION:
                  return dh.FAILED_PRECONDITION;
                case Ur.ABORTED:
                  return dh.ABORTED;
                case Ur.OUT_OF_RANGE:
                  return dh.OUT_OF_RANGE;
                case Ur.UNIMPLEMENTED:
                  return dh.UNIMPLEMENTED;
                case Ur.DATA_LOSS:
                  return dh.DATA_LOSS;
                default:
                  return Pr("Unknown status code: " + t)
              }
            }(t.cause.code), message: t.cause.message
          }), {
            targetChange: {
              targetChangeType: this.toWatchTargetChangeState(t.state),
              targetIds: t.targetIds,
              resumeToken: this.unsafeCastProtoByteString(t.resumeToken),
              cause: n
            }
          }
        }
        return Pr("Unrecognized watch change: " + JSON.stringify(t))
      }, Wl.prototype.fromWatchChange = function (t) {
        var e;
        if ("targetChange" in t) {
          Kl(t.targetChange, "targetChange");
          var n = this.fromWatchTargetChangeState(t.targetChange.targetChangeType || "NO_CHANGE"),
            r = t.targetChange.targetIds || [], i = t.targetChange.resumeToken || this.emptyByteString(),
            o = t.targetChange.cause, a = o && this.fromRpcStatus(o);
          e = new Fh(n, r, i, a || null)
        } else if ("documentChange" in t) {
          Kl(t.documentChange, "documentChange"), Kl(t.documentChange.document, "documentChange.name"), Kl(t.documentChange.document.name, "documentChange.document.name"), Kl(t.documentChange.document.updateTime, "documentChange.document.updateTime");
          var s = t.documentChange, u = this.fromName(s.document.name), c = this.fromVersion(s.document.updateTime),
            h = this.fromFields(s.document.fields || {}), l = new ya(u, c, h, {}, s.document), f = s.targetIds || [],
            p = s.removedTargetIds || [];
          e = new xh(f, p, l.key, l)
        } else if ("documentDelete" in t) {
          Kl(t.documentDelete, "documentDelete"), Kl(t.documentDelete.document, "documentDelete.document");
          var d = t.documentDelete;
          u = this.fromName(d.document), c = d.readTime ? this.fromVersion(d.readTime) : oo.forDeletedDoc(), l = new ba(u, c), p = d.removedTargetIds || [], e = new xh([], p, l.key, l)
        } else if ("documentRemove" in t) {
          Kl(t.documentRemove, "documentRemove"), Kl(t.documentRemove.document, "documentRemove");
          var m = t.documentRemove;
          u = this.fromName(m.document), p = m.removedTargetIds || [], e = new xh([], p, u, null)
        } else {
          if (!("filter" in t)) return Pr("Unknown change type " + JSON.stringify(t));
          Kl(t.filter, "filter"), Kl(t.filter.targetId, "filter.targetId");
          var y = t.filter, g = y.count || 0, v = new xl(g), b = y.targetId;
          e = new qh(b, v)
        }
        return e
      }, Wl.prototype.fromWatchTargetChangeState = function (t) {
        return "NO_CHANGE" === t ? Lh.NoChange : "ADD" === t ? Lh.Added : "REMOVE" === t ? Lh.Removed : "CURRENT" === t ? Lh.Current : "RESET" === t ? Lh.Reset : Pr("Got unexpected TargetChange.state: " + t)
      }, Wl.prototype.versionFromListenResponse = function (t) {
        if (!("targetChange" in t)) return oo.MIN;
        var e = t.targetChange;
        return e.targetIds && e.targetIds.length ? oo.MIN : e.readTime ? this.fromVersion(e.readTime) : oo.MIN
      }, Wl.prototype.toMutation = function (t) {
        var e, n = this;
        if (t instanceof ac) e = {update: this.toMutationDocument(t.key, t.value)}; else if (t instanceof mc) e = {delete: this.toName(t.key)}; else if (t instanceof cc) e = {
          update: this.toMutationDocument(t.key, t.data),
          updateMask: this.toDocumentMask(t.fieldMask)
        }; else {
          if (!(t instanceof fc)) return Pr("Unknown mutation type " + t.type);
          e = {
            transform: {
              document: this.toName(t.key), fieldTransforms: t.fieldTransforms.map(function (t) {
                return n.toFieldTransform(t)
              })
            }
          }
        }
        return t.precondition.isNone || (e.currentDocument = this.toPrecondition(t.precondition)), e
      }, Wl.prototype.fromMutation = function (t) {
        var e = this, n = t.currentDocument ? this.fromPrecondition(t.currentDocument) : ec.NONE;
        if (t.update) {
          Kl(t.update.name, "name");
          var r = this.fromName(t.update.name), i = this.fromFields(t.update.fields || {});
          if (t.updateMask) {
            var o = this.fromDocumentMask(t.updateMask);
            return new cc(r, i, o, n)
          }
          return new ac(r, i, n)
        }
        if (t.delete) return r = this.fromName(t.delete), new mc(r, n);
        if (t.transform) {
          r = this.fromName(t.transform.document);
          var a = t.transform.fieldTransforms.map(function (t) {
            return e.fromFieldTransform(t)
          });
          return xr(!0 === n.exists, 'Transforms only support precondition "exists == true"'), new fc(r, a)
        }
        return Pr("unknown mutation proto: " + JSON.stringify(t))
      }, Wl.prototype.toPrecondition = function (t) {
        return xr(!t.isNone, "Can't serialize an empty precondition"), void 0 !== t.updateTime ? {updateTime: this.toVersion(t.updateTime)} : void 0 !== t.exists ? {exists: t.exists} : Pr("Unknown precondition")
      }, Wl.prototype.fromPrecondition = function (t) {
        return void 0 !== t.updateTime ? ec.updateTime(this.fromVersion(t.updateTime)) : void 0 !== t.exists ? ec.exists(t.exists) : ec.NONE
      }, Wl.prototype.fromWriteResult = function (t, e) {
        var n = this, r = t.updateTime ? this.fromVersion(t.updateTime) : this.fromVersion(e), i = null;
        return t.transformResults && 0 < t.transformResults.length && (i = t.transformResults.map(function (t) {
          return n.fromValue(t)
        })), new tc(r, i)
      }, Wl.prototype.fromWriteResults = function (t, e) {
        var n = this;
        return t && 0 < t.length ? (xr(void 0 !== e, "Received a write result without a commit time"), t.map(function (t) {
          return n.fromWriteResult(t, e)
        })) : []
      }, Wl.prototype.toFieldTransform = function (t) {
        var e = this, n = t.transform;
        if (n instanceof Nl) return {fieldPath: t.field.canonicalString(), setToServerValue: "REQUEST_TIME"};
        if (n instanceof kl) return {
          fieldPath: t.field.canonicalString(),
          appendMissingElements: {
            values: n.elements.map(function (t) {
              return e.toValue(t)
            })
          }
        };
        if (n instanceof Ml) return {
          fieldPath: t.field.canonicalString(),
          removeAllFromArray: {
            values: n.elements.map(function (t) {
              return e.toValue(t)
            })
          }
        };
        if (n instanceof Ol) return {fieldPath: t.field.canonicalString(), increment: this.toValue(n.operand)};
        throw Pr("Unknown transform: " + t.transform)
      }, Wl.prototype.fromFieldTransform = function (t) {
        var e = this, n = null;
        if ("setToServerValue" in t) xr("REQUEST_TIME" === t.setToServerValue, "Unknown server value transform proto: " + JSON.stringify(t)), n = Nl.instance; else if ("appendMissingElements" in t) {
          var r = t.appendMissingElements.values || [];
          n = new kl(r.map(function (t) {
            return e.fromValue(t)
          }))
        } else if ("removeAllFromArray" in t) r = t.removeAllFromArray.values || [], n = new Ml(r.map(function (t) {
          return e.fromValue(t)
        })); else if ("increment" in t) {
          var i = this.fromValue(t.increment);
          xr(i instanceof mu, "NUMERIC_ADD transform requires a NumberValue"), n = new Ol(i)
        } else Pr("Unknown transform proto: " + JSON.stringify(t));
        var o = Fi.fromServerFormat(t.fieldPath);
        return new Xu(o, n)
      }, Wl.prototype.toDocumentsTarget = function (t) {
        return {documents: [this.toQueryPath(t.path)]}
      }, Wl.prototype.fromDocumentsTarget = function (t) {
        var e = t.documents.length;
        xr(1 === e, "DocumentsTarget contained other than 1 document: " + e);
        var n = t.documents[0];
        return Xh.atPath(this.fromQueryPath(n))
      }, Wl.prototype.toQueryTarget = function (t) {
        var e = {structuredQuery: {}}, n = t.path;
        null !== t.collectionGroup ? (xr(n.length % 2 == 0, "Collection Group queries should be within a document path or root."), e.parent = this.toQueryPath(n), e.structuredQuery.from = [{
          collectionId: t.collectionGroup,
          allDescendants: !0
        }]) : (xr(n.length % 2 != 0, "Document queries with filters are not supported."), e.parent = this.toQueryPath(n.popLast()), e.structuredQuery.from = [{collectionId: n.lastSegment()}]);
        var r = this.toFilter(t.filters);
        r && (e.structuredQuery.where = r);
        var i = this.toOrder(t.orderBy);
        i && (e.structuredQuery.orderBy = i);
        var o = this.toInt32Value(t.limit);
        return void 0 !== o && (e.structuredQuery.limit = o), t.startAt && (e.structuredQuery.startAt = this.toCursor(t.startAt)), t.endAt && (e.structuredQuery.endAt = this.toCursor(t.endAt)), e
      }, Wl.prototype.fromQueryTarget = function (t) {
        var e = this.fromQueryPath(t.parent), n = t.structuredQuery, r = n.from ? n.from.length : 0, i = null;
        if (0 < r) {
          xr(1 === r, "StructuredQuery.from with more than one collection is not supported.");
          var o = n.from[0];
          o.allDescendants ? i = o.collectionId : e = e.child(o.collectionId)
        }
        var a = [];
        n.where && (a = this.fromFilter(n.where));
        var s = [];
        n.orderBy && (s = this.fromOrder(n.orderBy));
        var u = null;
        n.limit && (u = this.fromInt32Value(n.limit));
        var c = null;
        n.startAt && (c = this.fromCursor(n.startAt));
        var h = null;
        return n.endAt && (h = this.fromCursor(n.endAt)), new Xh(e, i, s, a, u, c, h)
      }, Wl.prototype.toListenRequestLabels = function (t) {
        var e = this.toLabel(t.purpose);
        return null == e ? null : {"goog-listen-tags": e}
      }, Wl.prototype.toLabel = function (t) {
        switch (t) {
          case ws.Listen:
            return null;
          case ws.ExistenceFilterMismatch:
            return "existence-filter-mismatch";
          case ws.LimboResolution:
            return "limbo-document";
          default:
            return Pr("Unrecognized query purpose: " + t)
        }
      }, Wl.prototype.toTarget = function (t) {
        var e, n = t.query;
        return (e = n.isDocumentQuery() ? {documents: this.toDocumentsTarget(n)} : {query: this.toQueryTarget(n)}).targetId = t.targetId, 0 < t.resumeToken.length && (e.resumeToken = this.unsafeCastProtoByteString(t.resumeToken)), e
      }, Wl.prototype.toFilter = function (t) {
        var e = this;
        if (0 !== t.length) {
          var n = t.map(function (t) {
            return t instanceof nl ? e.toUnaryOrFieldFilter(t) : Pr("Unrecognized filter: " + JSON.stringify(t))
          });
          return 1 === n.length ? n[0] : {compositeFilter: {op: "AND", filters: n}}
        }
      }, Wl.prototype.fromFilter = function (t) {
        var e = this;
        return t ? void 0 !== t.unaryFilter ? [this.fromUnaryFilter(t)] : void 0 !== t.fieldFilter ? [this.fromFieldFilter(t)] : void 0 !== t.compositeFilter ? t.compositeFilter.filters.map(function (t) {
          return e.fromFilter(t)
        }).reduce(function (t, e) {
          return t.concat(e)
        }) : Pr("Unknown filter: " + JSON.stringify(t)) : []
      }, Wl.prototype.toOrder = function (t) {
        var e = this;
        if (0 !== t.length) return t.map(function (t) {
          return e.toPropertyOrder(t)
        })
      }, Wl.prototype.fromOrder = function (t) {
        var e = this;
        return t.map(function (t) {
          return e.fromPropertyOrder(t)
        })
      }, Wl.prototype.toCursor = function (t) {
        var e = this;
        return {
          before: t.before, values: t.position.map(function (t) {
            return e.toValue(t)
          })
        }
      }, Wl.prototype.fromCursor = function (t) {
        var e = this, n = !!t.before, r = t.values.map(function (t) {
          return e.fromValue(t)
        });
        return new El(r, n)
      }, Wl.prototype.toDirection = function (t) {
        return Bl[t.name]
      }, Wl.prototype.fromDirection = function (t) {
        switch (t) {
          case"ASCENDING":
            return bl.ASCENDING;
          case"DESCENDING":
            return bl.DESCENDING;
          default:
            return
        }
      }, Wl.prototype.toOperatorName = function (t) {
        return Ul[t.name]
      }, Wl.prototype.fromOperatorName = function (t) {
        switch (t) {
          case"EQUAL":
            return Zh.EQUAL;
          case"GREATER_THAN":
            return Zh.GREATER_THAN;
          case"GREATER_THAN_OR_EQUAL":
            return Zh.GREATER_THAN_OR_EQUAL;
          case"LESS_THAN":
            return Zh.LESS_THAN;
          case"LESS_THAN_OR_EQUAL":
            return Zh.LESS_THAN_OR_EQUAL;
          case"ARRAY_CONTAINS":
            return Zh.ARRAY_CONTAINS;
          case"IN":
            return Zh.IN;
          case"ARRAY_CONTAINS_ANY":
            return Zh.ARRAY_CONTAINS_ANY;
          case"OPERATOR_UNSPECIFIED":
            return Pr("Unspecified operator");
          default:
            return Pr("Unknown operator")
        }
      }, Wl.prototype.toFieldPathReference = function (t) {
        return {fieldPath: t.canonicalString()}
      }, Wl.prototype.fromFieldPathReference = function (t) {
        return Fi.fromServerFormat(t.fieldPath)
      }, Wl.prototype.toPropertyOrder = function (t) {
        return {field: this.toFieldPathReference(t.field), direction: this.toDirection(t.dir)}
      }, Wl.prototype.fromPropertyOrder = function (t) {
        return new Tl(this.fromFieldPathReference(t.field), this.fromDirection(t.direction))
      }, Wl.prototype.fromFieldFilter = function (t) {
        return nl.create(this.fromFieldPathReference(t.fieldFilter.field), this.fromOperatorName(t.fieldFilter.op), this.fromValue(t.fieldFilter.value))
      }, Wl.prototype.toUnaryOrFieldFilter = function (t) {
        if (t.op === Zh.EQUAL) {
          if (t.value.isEqual(Su.NAN)) return {unaryFilter: {field: this.toFieldPathReference(t.field), op: "IS_NAN"}};
          if (t.value.isEqual(cu.INSTANCE)) return {
            unaryFilter: {
              field: this.toFieldPathReference(t.field),
              op: "IS_NULL"
            }
          }
        }
        return {
          fieldFilter: {
            field: this.toFieldPathReference(t.field),
            op: this.toOperatorName(t.op),
            value: this.toValue(t.value)
          }
        }
      }, Wl.prototype.fromUnaryFilter = function (t) {
        switch (t.unaryFilter.op) {
          case"IS_NAN":
            var e = this.fromFieldPathReference(t.unaryFilter.field);
            return nl.create(e, Zh.EQUAL, Su.NAN);
          case"IS_NULL":
            var n = this.fromFieldPathReference(t.unaryFilter.field);
            return nl.create(n, Zh.EQUAL, cu.INSTANCE);
          case"OPERATOR_UNSPECIFIED":
            return Pr("Unspecified filter");
          default:
            return Pr("Unknown filter")
        }
      }, Wl.prototype.toDocumentMask = function (t) {
        var e = [];
        return t.fields.forEach(function (t) {
          return e.push(t.canonicalString())
        }), {fieldPaths: e}
      }, Wl.prototype.fromDocumentMask = function (t) {
        var e = (t.fieldPaths || []).map(function (t) {
          return Fi.fromServerFormat(t)
        });
        return Hu.fromArray(e)
      }, Wl);

      function Wl(t, e) {
        this.databaseId = t, this.options = e
      }

      var zl = function () {
        this.listeners = []
      }, Hl = (Yl.prototype.listen = function (t) {
        var e = t.query, n = !1, r = this.queries.get(e);
        return r || (n = !0, r = new zl, this.queries.set(e, r)), r.listeners.push(t), t.applyOnlineStateChange(this.onlineState), r.viewSnap && t.onViewSnapshot(r.viewSnap), n ? this.syncEngine.listen(e).then(function (t) {
          return r.targetId = t
        }) : Promise.resolve(r.targetId)
      }, Yl.prototype.unlisten = function (o) {
        return p(this, void 0, void 0, function () {
          var e, n, r, i;
          return d(this, function (t) {
            return e = o.query, n = !1, (r = this.queries.get(e)) && 0 <= (i = r.listeners.indexOf(o)) && (r.listeners.splice(i, 1), n = 0 === r.listeners.length), n ? (this.queries.delete(e), [2, this.syncEngine.unlisten(e)]) : [2]
          })
        })
      }, Yl.prototype.onWatchChange = function (t) {
        for (var e = 0, n = t; e < n.length; e++) {
          var r = n[e], i = r.query, o = this.queries.get(i);
          if (o) {
            for (var a = 0, s = o.listeners; a < s.length; a++) s[a].onViewSnapshot(r);
            o.viewSnap = r
          }
        }
      }, Yl.prototype.onWatchError = function (t, e) {
        var n = this.queries.get(t);
        if (n) for (var r = 0, i = n.listeners; r < i.length; r++) i[r].onError(e);
        this.queries.delete(t)
      }, Yl.prototype.onOnlineStateChange = function (i) {
        this.onlineState = i, this.queries.forEach(function (t, e) {
          for (var n = 0, r = e.listeners; n < r.length; n++) r[n].applyOnlineStateChange(i)
        })
      }, Yl);

      function Yl(t) {
        this.syncEngine = t, this.queries = new Ia(function (t) {
          return t.canonicalId()
        }), this.onlineState = uh.Unknown, this.syncEngine.subscribe(this)
      }

      var Xl = (Jl.prototype.onViewSnapshot = function (t) {
        if (xr(0 < t.docChanges.length || t.syncStateChanged, "We got a new snapshot with no changes?"), !this.options.includeMetadataChanges) {
          for (var e = [], n = 0, r = t.docChanges; n < r.length; n++) {
            var i = r[n];
            i.type !== wh.Metadata && e.push(i)
          }
          t = new Ah(t.query, t.docs, t.oldDocs, e, t.mutatedKeys, t.fromCache, t.syncStateChanged, !0)
        }
        this.raisedInitialEvent ? this.shouldRaiseEvent(t) && this.queryObserver.next(t) : this.shouldRaiseInitialEvent(t, this.onlineState) && this.raiseInitialEvent(t), this.snap = t
      }, Jl.prototype.onError = function (t) {
        this.queryObserver.error(t)
      }, Jl.prototype.applyOnlineStateChange = function (t) {
        this.onlineState = t, this.snap && !this.raisedInitialEvent && this.shouldRaiseInitialEvent(this.snap, t) && this.raiseInitialEvent(this.snap)
      }, Jl.prototype.shouldRaiseInitialEvent = function (t, e) {
        if (xr(!this.raisedInitialEvent, "Determining whether to raise first event but already had first event"), !t.fromCache) return !0;
        var n = e !== uh.Offline;
        return this.options.waitForSyncWhenOnline && n ? (xr(t.fromCache, "Waiting for sync, but snapshot is not from cache"), !1) : !t.docs.isEmpty() || e === uh.Offline
      }, Jl.prototype.shouldRaiseEvent = function (t) {
        if (0 < t.docChanges.length) return !0;
        var e = this.snap && this.snap.hasPendingWrites !== t.hasPendingWrites;
        return !(!t.syncStateChanged && !e) && !0 === this.options.includeMetadataChanges
      }, Jl.prototype.raiseInitialEvent = function (t) {
        xr(!this.raisedInitialEvent, "Trying to raise initial events for second time"), t = Ah.fromInitialDocuments(t.query, t.docs, t.mutatedKeys, t.fromCache), this.raisedInitialEvent = !0, this.queryObserver.next(t)
      }, Jl);

      function Jl(t, e, n) {
        this.query = t, this.queryObserver = e, this.raisedInitialEvent = !1, this.onlineState = uh.Unknown, this.options = n || {}
      }

      var $l = (Zl.fromSnapshot = function (t, e) {
        for (var n = Ao(), r = Ao(), i = 0, o = e.docChanges; i < o.length; i++) {
          var a = o[i];
          switch (a.type) {
            case wh.Added:
              n = n.add(a.doc.key);
              break;
            case wh.Removed:
              r = r.add(a.doc.key)
          }
        }
        return new Zl(t, n, r)
      }, Zl);

      function Zl(t, e, n) {
        this.targetId = t, this.addedKeys = e, this.removedKeys = n
      }

      var tf = function (t) {
        this.key = t
      }, ef = function (t) {
        this.key = t
      }, nf = (Object.defineProperty(rf.prototype, "syncedDocuments", {
        get: function () {
          return this._syncedDocuments
        }, enumerable: !0, configurable: !0
      }), rf.prototype.computeDocChanges = function (t, e) {
        var s = this, u = e ? e.changeSet : new Dh, c = e ? e.documentSet : this.documentSet,
          h = e ? e.mutatedKeys : this.mutatedKeys, l = c, f = !1,
          p = this.query.hasLimit() && c.size === this.query.limit ? c.last() : null;
        if (t.inorderTraversal(function (t, e) {
          var n = c.get(t), r = e instanceof ya ? e : null;
          r && (xr(t.isEqual(r.key), "Mismatching keys found in document changes: " + t + " != " + r.key), r = s.query.matches(r) ? r : null);
          var i = !!n && s.mutatedKeys.has(n.key),
            o = !!r && (r.hasLocalMutations || s.mutatedKeys.has(r.key) && r.hasCommittedMutations), a = !1;
          n && r ? n.data.isEqual(r.data) ? i !== o && (u.track({
            type: wh.Metadata,
            doc: r
          }), a = !0) : s.shouldWaitForSyncedDocument(n, r) || (u.track({
            type: wh.Modified,
            doc: r
          }), a = !0, p && 0 < s.query.docComparator(r, p) && (f = !0)) : !n && r ? (u.track({
            type: wh.Added,
            doc: r
          }), a = !0) : n && !r && (u.track({
            type: wh.Removed,
            doc: n
          }), a = !0, p && (f = !0)), a && (h = r ? (l = l.add(r), o ? h.add(t) : h.delete(t)) : (l = l.delete(t), h.delete(t)))
        }), this.query.hasLimit()) for (; l.size > this.query.limit;) {
          var n = l.last();
          l = l.delete(n.key), h = h.delete(n.key), u.track({type: wh.Removed, doc: n})
        }
        return xr(!f || !e, "View was refilled using docs that themselves needed refilling."), {
          documentSet: l,
          changeSet: u,
          needsRefill: f,
          mutatedKeys: h
        }
      }, rf.prototype.shouldWaitForSyncedDocument = function (t, e) {
        return t.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations
      }, rf.prototype.applyChanges = function (t, e, n) {
        var r = this;
        xr(!t.needsRefill, "Cannot apply changes that need a refill");
        var i = this.documentSet;
        this.documentSet = t.documentSet, this.mutatedKeys = t.mutatedKeys;
        var o = t.changeSet.getChanges();
        o.sort(function (t, e) {
          return function (t, e) {
            function n(t) {
              switch (t) {
                case wh.Added:
                  return 1;
                case wh.Modified:
                case wh.Metadata:
                  return 2;
                case wh.Removed:
                  return 0;
                default:
                  return Pr("Unknown ChangeType: " + t)
              }
            }

            return n(t) - n(e)
          }(t.type, e.type) || r.query.docComparator(t.doc, e.doc)
        }), this.applyTargetChange(n);
        var a = e ? this.updateLimboDocuments() : [],
          s = 0 === this.limboDocuments.size && this.current ? Sh.Synced : Sh.Local, u = s !== this.syncState;
        return this.syncState = s, 0 !== o.length || u ? {
          snapshot: new Ah(this.query, t.documentSet, i, o, t.mutatedKeys, s === Sh.Local, u, !1),
          limboChanges: a
        } : {limboChanges: a}
      }, rf.prototype.applyOnlineStateChange = function (t) {
        return this.current && t === uh.Offline ? (this.current = !1, this.applyChanges({
          documentSet: this.documentSet,
          changeSet: new Dh,
          mutatedKeys: this.mutatedKeys,
          needsRefill: !1
        }, !1)) : {limboChanges: []}
      }, rf.prototype.shouldBeInLimbo = function (t) {
        return !this._syncedDocuments.has(t) && !!this.documentSet.has(t) && !this.documentSet.get(t).hasLocalMutations
      }, rf.prototype.applyTargetChange = function (t) {
        var e = this;
        t && (t.addedDocuments.forEach(function (t) {
          return e._syncedDocuments = e._syncedDocuments.add(t)
        }), t.modifiedDocuments.forEach(function (t) {
          return xr(e._syncedDocuments.has(t), "Modified document " + t + " not found in view.")
        }), t.removedDocuments.forEach(function (t) {
          return e._syncedDocuments = e._syncedDocuments.delete(t)
        }), this.current = t.current)
      }, rf.prototype.updateLimboDocuments = function () {
        var e = this;
        if (!this.current) return [];
        var n = this.limboDocuments;
        this.limboDocuments = Ao(), this.documentSet.forEach(function (t) {
          e.shouldBeInLimbo(t.key) && (e.limboDocuments = e.limboDocuments.add(t.key))
        });
        var r = [];
        return n.forEach(function (t) {
          e.limboDocuments.has(t) || r.push(new ef(t))
        }), this.limboDocuments.forEach(function (t) {
          n.has(t) || r.push(new tf(t))
        }), r
      }, rf.prototype.synchronizeWithPersistedState = function (t, e) {
        this._syncedDocuments = e, this.limboDocuments = Ao();
        var n = this.computeDocChanges(t);
        return this.applyChanges(n, !0)
      }, rf.prototype.computeInitialSnapshot = function () {
        return Ah.fromInitialDocuments(this.query, this.documentSet, this.mutatedKeys, this.syncState === Sh.Local)
      }, rf);

      function rf(t, e) {
        this.query = t, this._syncedDocuments = e, this.syncState = null, this.current = !1, this.limboDocuments = Ao(), this.mutatedKeys = Ao(), this.documentSet = new Ih(t.docComparator.bind(t))
      }

      var of = "SyncEngine", af = function (t, e, n) {
        this.query = t, this.targetId = e, this.view = n
      }, sf = function (t) {
        this.key = t
      }, uf = (Object.defineProperty(cf.prototype, "isPrimaryClient", {
        get: function () {
          return !0 === this.isPrimary
        }, enumerable: !0, configurable: !0
      }), cf.prototype.subscribe = function (t) {
        xr(null !== t, "SyncEngine listener cannot be null"), xr(null === this.syncEngineListener, "SyncEngine already has a subscriber."), this.syncEngineListener = t
      }, cf.prototype.listen = function (a) {
        return p(this, void 0, void 0, function () {
          var e, n, r, i, o;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return this.assertSubscribed("listen()"), (r = this.queryViewsByQuery.get(a)) ? (e = r.targetId, this.sharedClientState.addLocalQueryTarget(e), n = r.view.computeInitialSnapshot(), [3, 4]) : [3, 1];
              case 1:
                return [4, this.localStore.allocateQuery(a)];
              case 2:
                return i = t.sent(), o = this.sharedClientState.addLocalQueryTarget(i.targetId), e = i.targetId, [4, this.initializeViewAndComputeSnapshot(i, "current" === o)];
              case 3:
                n = t.sent(), this.isPrimary && this.remoteStore.listen(i), t.label = 4;
              case 4:
                return this.syncEngineListener.onWatchChange([n]), [2, e]
            }
          })
        })
      }, cf.prototype.initializeViewAndComputeSnapshot = function (c, h) {
        return p(this, void 0, void 0, function () {
          var e, n, r, i, o, a, s, u;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return e = c.query, [4, this.localStore.executeQuery(e)];
              case 1:
                return n = t.sent(), [4, this.localStore.remoteDocumentKeys(c.targetId)];
              case 2:
                return r = t.sent(), i = new nf(e, r), o = i.computeDocChanges(n), a = _h.createSynthesizedTargetChangeForCurrentChange(c.targetId, h && this.onlineState !== uh.Offline), xr(0 === (s = i.applyChanges(o, !0 === this.isPrimary, a)).limboChanges.length, "View returned limbo docs before target ack from the server."), xr(!!s.snapshot, "applyChanges for new view should always return a snapshot"), u = new af(e, c.targetId, i), this.queryViewsByQuery.set(e, u), this.queryViewsByTarget[c.targetId] = u, [2, s.snapshot]
            }
          })
        })
      }, cf.prototype.synchronizeViewAndComputeSnapshot = function (i) {
        return p(this, void 0, void 0, function () {
          var e, n, r;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return [4, this.localStore.executeQuery(i.query)];
              case 1:
                return e = t.sent(), [4, this.localStore.remoteDocumentKeys(i.targetId)];
              case 2:
                return n = t.sent(), r = i.view.synchronizeWithPersistedState(e, n), this.isPrimary && this.updateTrackedLimbos(i.targetId, r.limboChanges), [2, r]
            }
          })
        })
      }, cf.prototype.unlisten = function (r) {
        return p(this, void 0, void 0, function () {
          var e, n = this;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return this.assertSubscribed("unlisten()"), xr(!!(e = this.queryViewsByQuery.get(r)), "Trying to unlisten on query not found:" + r), this.isPrimary ? (this.sharedClientState.removeLocalQueryTarget(e.targetId), this.sharedClientState.isActiveQueryTarget(e.targetId) ? [3, 2] : [4, this.localStore.releaseQuery(r, !1).then(function () {
                  n.sharedClientState.clearQueryState(e.targetId), n.remoteStore.unlisten(e.targetId), n.removeAndCleanupQuery(e)
                }).catch(Hs)]) : [3, 3];
              case 1:
                t.sent(), t.label = 2;
              case 2:
                return [3, 5];
              case 3:
                return this.removeAndCleanupQuery(e), [4, this.localStore.releaseQuery(r, !0)];
              case 4:
                t.sent(), t.label = 5;
              case 5:
                return [2]
            }
          })
        })
      }, cf.prototype.write = function (n, r) {
        return p(this, void 0, void 0, function () {
          var e;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return this.assertSubscribed("write()"), [4, this.localStore.localWrite(n)];
              case 1:
                return e = t.sent(), this.sharedClientState.addPendingMutation(e.batchId), this.addMutationCallback(e.batchId, r), [4, this.emitNewSnapsAndNotifyLocalStore(e.changes)];
              case 2:
                return t.sent(), [4, this.remoteStore.fillWritePipeline()];
              case 3:
                return t.sent(), [2]
            }
          })
        })
      }, cf.prototype.runTransaction = function (o, a) {
        return void 0 === a && (a = 5), p(this, void 0, void 0, function () {
          var e, n, r, i;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                if (xr(0 <= a, "Got negative number of retries for transaction."), e = this.remoteStore.createTransaction(), jc(n = o(e)) || !n.catch || !n.then) return [2, Promise.reject(Error("Transaction callback must return a Promise"))];
                t.label = 1;
              case 1:
                return t.trys.push([1, 4, , 5]), [4, n];
              case 2:
                return r = t.sent(), [4, e.commit()];
              case 3:
                return t.sent(), [2, r];
              case 4:
                return i = t.sent(), 0 < a && this.isRetryableTransactionError(i) ? [2, this.runTransaction(o, a - 1)] : [2, Promise.reject(i)];
              case 5:
                return [2]
            }
          })
        })
      }, cf.prototype.applyRemoteEvent = function (n) {
        return p(this, void 0, void 0, function () {
          var e, r = this;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                this.assertSubscribed("applyRemoteEvent()"), t.label = 1;
              case 1:
                return t.trys.push([1, 4, , 6]), [4, this.localStore.applyRemoteEvent(n)];
              case 2:
                return e = t.sent(), Hr(n.targetChanges, function (t, e) {
                  var n = r.limboResolutionsByTarget[Number(t)];
                  n && (xr(e.addedDocuments.size + e.modifiedDocuments.size + e.removedDocuments.size <= 1, "Limbo resolution for single document contains multiple changes."), 0 < e.addedDocuments.size ? n.receivedDocument = !0 : 0 < e.modifiedDocuments.size ? xr(n.receivedDocument, "Received change for limbo target document without add.") : 0 < e.removedDocuments.size && (xr(n.receivedDocument, "Received remove for limbo target document without add."), n.receivedDocument = !1))
                }), [4, this.emitNewSnapsAndNotifyLocalStore(e, n)];
              case 3:
                return t.sent(), [3, 6];
              case 4:
                return [4, Hs(t.sent())];
              case 5:
                return t.sent(), [3, 6];
              case 6:
                return [2]
            }
          })
        })
      }, cf.prototype.applyOnlineStateChange = function (r, t) {
        if (this.isPrimary && t === hh.RemoteStore || !this.isPrimary && t === hh.SharedClientState) {
          var i = [];
          this.queryViewsByQuery.forEach(function (t, e) {
            var n = e.view.applyOnlineStateChange(r);
            xr(0 === n.limboChanges.length, "OnlineState should not affect limbo documents."), n.snapshot && i.push(n.snapshot)
          }), this.syncEngineListener.onOnlineStateChange(r), this.syncEngineListener.onWatchChange(i), this.onlineState = r, this.isPrimary && this.sharedClientState.setOnlineState(r)
        }
      }, cf.prototype.rejectListen = function (u, c) {
        return p(this, void 0, void 0, function () {
          var e, n, r, i, o, a, s = this;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return this.assertSubscribed("rejectListens()"), this.sharedClientState.updateQueryState(u, "rejected", c), e = this.limboResolutionsByTarget[u], (n = e && e.key) ? (this.limboTargetsByKey = this.limboTargetsByKey.remove(n), delete this.limboResolutionsByTarget[u], r = (r = new so(Bi.comparator)).insert(n, new ba(n, oo.forDeletedDoc())), i = Ao().add(n), o = new Rh(oo.MIN, {}, new yo(yi), r, i), [2, this.applyRemoteEvent(o)]) : [3, 1];
              case 1:
                return xr(!!(a = this.queryViewsByTarget[u]), "Unknown targetId: " + u), [4, this.localStore.releaseQuery(a.query, !1).then(function () {
                  return s.removeAndCleanupQuery(a)
                }).catch(Hs)];
              case 2:
                t.sent(), this.syncEngineListener.onWatchError(a.query, c), t.label = 3;
              case 3:
                return [2]
            }
          })
        })
      }, cf.prototype.applyBatchState = function (n, r, i) {
        return p(this, void 0, void 0, function () {
          var e;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return this.assertSubscribed("applyBatchState()"), [4, this.localStore.lookupMutationDocuments(n)];
              case 1:
                return null === (e = t.sent()) ? (_r(of, "Cannot apply mutation batch with id: " + n), [2]) : "pending" !== r ? [3, 3] : [4, this.remoteStore.fillWritePipeline()];
              case 2:
                return t.sent(), [3, 4];
              case 3:
                "acknowledged" === r || "rejected" === r ? (this.processUserCallback(n, i || null), this.localStore.removeCachedMutationBatchMetadata(n)) : Pr("Unknown batchState: " + r), t.label = 4;
              case 4:
                return [4, this.emitNewSnapsAndNotifyLocalStore(e)];
              case 5:
                return t.sent(), [2]
            }
          })
        })
      }, cf.prototype.applySuccessfulWrite = function (r) {
        return p(this, void 0, void 0, function () {
          var e, n;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                this.assertSubscribed("applySuccessfulWrite()"), e = r.batch.batchId, this.processUserCallback(e, null), t.label = 1;
              case 1:
                return t.trys.push([1, 4, , 6]), [4, this.localStore.acknowledgeBatch(r)];
              case 2:
                return n = t.sent(), this.sharedClientState.updateMutationState(e, "acknowledged"), [4, this.emitNewSnapsAndNotifyLocalStore(n)];
              case 3:
                return t.sent(), [3, 6];
              case 4:
                return [4, Hs(t.sent())];
              case 5:
                return t.sent(), [3, 6];
              case 6:
                return [2]
            }
          })
        })
      }, cf.prototype.rejectFailedWrite = function (n, r) {
        return p(this, void 0, void 0, function () {
          var e;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                this.assertSubscribed("rejectFailedWrite()"), this.processUserCallback(n, r), t.label = 1;
              case 1:
                return t.trys.push([1, 4, , 6]), [4, this.localStore.rejectBatch(n)];
              case 2:
                return e = t.sent(), this.sharedClientState.updateMutationState(n, "rejected", r), [4, this.emitNewSnapsAndNotifyLocalStore(e)];
              case 3:
                return t.sent(), [3, 6];
              case 4:
                return [4, Hs(t.sent())];
              case 5:
                return t.sent(), [3, 6];
              case 6:
                return [2]
            }
          })
        })
      }, cf.prototype.addMutationCallback = function (t, e) {
        var n = this.mutationUserCallbacks[this.currentUser.toKey()];
        n = (n = n || new so(yi)).insert(t, e), this.mutationUserCallbacks[this.currentUser.toKey()] = n
      }, cf.prototype.processUserCallback = function (t, e) {
        var n = this.mutationUserCallbacks[this.currentUser.toKey()];
        if (n) {
          var r = n.get(t);
          r && (xr(t === n.minKey(), "Mutation callbacks processed out-of-order?"), e ? r.reject(e) : r.resolve(), n = n.remove(t)), this.mutationUserCallbacks[this.currentUser.toKey()] = n
        }
      }, cf.prototype.removeAndCleanupQuery = function (t) {
        var e = this;
        if (this.sharedClientState.removeLocalQueryTarget(t.targetId), this.queryViewsByQuery.delete(t.query), delete this.queryViewsByTarget[t.targetId], this.isPrimary) {
          var n = this.limboDocumentRefs.referencesForId(t.targetId);
          this.limboDocumentRefs.removeReferencesForId(t.targetId), n.forEach(function (t) {
            e.limboDocumentRefs.containsKey(t) || e.removeLimboTarget(t)
          })
        }
      }, cf.prototype.removeLimboTarget = function (t) {
        var e = this.limboTargetsByKey.get(t);
        null !== e && (this.remoteStore.unlisten(e), this.limboTargetsByKey = this.limboTargetsByKey.remove(t), delete this.limboResolutionsByTarget[e])
      }, cf.prototype.updateTrackedLimbos = function (t, e) {
        for (var n = 0, r = e; n < r.length; n++) {
          var i = r[n];
          i instanceof tf ? (this.limboDocumentRefs.addReference(i.key, t), this.trackLimboChange(i)) : i instanceof ef ? (_r(of, "Document no longer in limbo: " + i.key), this.limboDocumentRefs.removeReference(i.key, t), this.limboDocumentRefs.containsKey(i.key) || this.removeLimboTarget(i.key)) : Pr("Unknown limbo change: " + JSON.stringify(i))
        }
      }, cf.prototype.trackLimboChange = function (t) {
        var e = t.key;
        if (!this.limboTargetsByKey.get(e)) {
          _r(of, "New document in limbo: " + e);
          var n = this.limboTargetIdGenerator.next(), r = Xh.atPath(e.path);
          this.limboResolutionsByTarget[n] = new sf(e), this.remoteStore.listen(new Ds(r, n, ws.LimboResolution, Ai.INVALID)), this.limboTargetsByKey = this.limboTargetsByKey.insert(e, n)
        }
      }, cf.prototype.currentLimboDocs = function () {
        return this.limboTargetsByKey
      }, cf.prototype.emitNewSnapsAndNotifyLocalStore = function (n, u) {
        return p(this, void 0, void 0, function () {
          var o, a, e, s = this;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return o = [], a = [], e = [], this.queryViewsByQuery.forEach(function (t, i) {
                  e.push(Promise.resolve().then(function () {
                    var e = i.view.computeDocChanges(n);
                    return e.needsRefill ? s.localStore.executeQuery(i.query).then(function (t) {
                      return i.view.computeDocChanges(t, e)
                    }) : e
                  }).then(function (t) {
                    var e = u && u.targetChanges[i.targetId], n = i.view.applyChanges(t, !0 === s.isPrimary, e);
                    if (s.updateTrackedLimbos(i.targetId, n.limboChanges), n.snapshot) {
                      s.isPrimary && s.sharedClientState.updateQueryState(i.targetId, n.snapshot.fromCache ? "not-current" : "current"), o.push(n.snapshot);
                      var r = $l.fromSnapshot(i.targetId, n.snapshot);
                      a.push(r)
                    }
                  }))
                }), [4, Promise.all(e)];
              case 1:
                return t.sent(), this.syncEngineListener.onWatchChange(o), [4, this.localStore.notifyLocalViewChanges(a)];
              case 2:
                return t.sent(), [2]
            }
          })
        })
      }, cf.prototype.assertSubscribed = function (t) {
        xr(null !== this.syncEngineListener, "Trying to call " + t + " before calling subscribe().")
      }, cf.prototype.handleCredentialChange = function (r) {
        return p(this, void 0, void 0, function () {
          var e, n;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return e = !this.currentUser.isEqual(r), this.currentUser = r, e ? [4, this.localStore.handleUserChange(r)] : [3, 3];
              case 1:
                return n = t.sent(), this.sharedClientState.handleUserChange(r, n.removedBatchIds, n.addedBatchIds), [4, this.emitNewSnapsAndNotifyLocalStore(n.affectedDocuments)];
              case 2:
                t.sent(), t.label = 3;
              case 3:
                return [4, this.remoteStore.handleCredentialChange()];
              case 4:
                return t.sent(), [2]
            }
          })
        })
      }, cf.prototype.applyPrimaryState = function (c) {
        return p(this, void 0, void 0, function () {
          var e, n, r, i, o, a, s, u = this;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return !0 !== c || !0 === this.isPrimary ? [3, 3] : (this.isPrimary = !0, [4, this.remoteStore.applyPrimaryState(!0)]);
              case 1:
                return t.sent(), e = this.sharedClientState.getAllActiveQueryTargets(), [4, this.synchronizeQueryViewsAndRaiseSnapshots(e.toArray())];
              case 2:
                for (n = t.sent(), r = 0, i = n; r < i.length; r++) o = i[r], this.remoteStore.listen(o);
                return [3, 7];
              case 3:
                return !1 !== c || !1 === this.isPrimary ? [3, 7] : (this.isPrimary = !1, a = [], s = Promise.resolve(), zr(this.queryViewsByTarget, function (t, e) {
                  u.sharedClientState.isLocalQueryTarget(t) ? a.push(t) : s = s.then(function () {
                    return u.unlisten(e.query)
                  }), u.remoteStore.unlisten(e.targetId)
                }), [4, s]);
              case 4:
                return t.sent(), [4, this.synchronizeQueryViewsAndRaiseSnapshots(a)];
              case 5:
                return t.sent(), this.resetLimboDocuments(), [4, this.remoteStore.applyPrimaryState(!1)];
              case 6:
                t.sent(), t.label = 7;
              case 7:
                return [2]
            }
          })
        })
      }, cf.prototype.resetLimboDocuments = function () {
        var e = this;
        zr(this.limboResolutionsByTarget, function (t) {
          e.remoteStore.unlisten(t)
        }), this.limboDocumentRefs.removeAllReferences(), this.limboResolutionsByTarget = [], this.limboTargetsByKey = new so(Bi.comparator)
      }, cf.prototype.synchronizeQueryViewsAndRaiseSnapshots = function (h) {
        return p(this, void 0, void 0, function () {
          var e, n, r, i, o, a, s, u, c;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                e = [], n = [], r = 0, i = h, t.label = 1;
              case 1:
                return r < i.length ? (o = i[r], a = void 0, (s = this.queryViewsByTarget[o]) ? [4, this.localStore.releaseQuery(s.query, !0)] : [3, 5]) : [3, 11];
              case 2:
                return t.sent(), [4, this.localStore.allocateQuery(s.query)];
              case 3:
                return a = t.sent(), [4, this.synchronizeViewAndComputeSnapshot(s)];
              case 4:
                return (u = t.sent()).snapshot && n.push(u.snapshot), [3, 9];
              case 5:
                return xr(!0 === this.isPrimary, "A secondary tab should never have an active query without an active view."), [4, this.localStore.getQueryForTarget(o)];
              case 6:
                return xr(!!(c = t.sent()), "Query data for target " + o + " not found"), [4, this.localStore.allocateQuery(c)];
              case 7:
                return a = t.sent(), [4, this.initializeViewAndComputeSnapshot(a, !1)];
              case 8:
                t.sent(), t.label = 9;
              case 9:
                e.push(a), t.label = 10;
              case 10:
                return r++, [3, 1];
              case 11:
                return this.syncEngineListener.onWatchChange(n), [2, e]
            }
          })
        })
      }, cf.prototype.isRetryableTransactionError = function (t) {
        if ("FirebaseError" !== t.name) return !1;
        var e = t.code;
        return "aborted" === e || "failed-precondition" === e || !vh(e)
      }, cf.prototype.getActiveClients = function () {
        return this.localStore.getActiveClients()
      }, cf.prototype.applyTargetState = function (a, s, u) {
        return p(this, void 0, void 0, function () {
          var e, n, r, i, o;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                if (this.isPrimary) return _r(of, "Ignoring unexpected query state notification."), [2];
                if (!this.queryViewsByTarget[a]) return [3, 11];
                switch (s) {
                  case"current":
                  case"not-current":
                    return [3, 1];
                  case"rejected":
                    return [3, 8]
                }
                return [3, 10];
              case 1:
                return t.trys.push([1, 4, , 8]), [4, this.localStore.getNewDocumentChanges()];
              case 2:
                return e = t.sent(), n = Rh.createSynthesizedRemoteEventForCurrentChange(a, "current" === s), [4, this.emitNewSnapsAndNotifyLocalStore(e, n)];
              case 3:
                return t.sent(), [3, 11];
              case 4:
                return function (t) {
                  return t.code === Ur.DATA_LOSS && t.message === Aa
                }(r = t.sent()) ? (i = [], zr(this.queryViewsByTarget, function (t) {
                  return i.push(t)
                }), [4, this.synchronizeQueryViewsAndRaiseSnapshots(i)]) : [3, 6];
              case 5:
                return t.sent(), [3, 7];
              case 6:
                throw r;
              case 7:
                return [3, 8];
              case 8:
                return o = this.queryViewsByTarget[a], this.removeAndCleanupQuery(o), [4, this.localStore.releaseQuery(o.query, !0)];
              case 9:
                return t.sent(), this.syncEngineListener.onWatchError(o.query, u), [3, 11];
              case 10:
                Pr("Unexpected target state: " + s), t.label = 11;
              case 11:
                return [2]
            }
          })
        })
      }, cf.prototype.applyActiveTargetsChange = function (l, f) {
        return p(this, void 0, void 0, function () {
          var e, n, r, i, o, a, s, u, c, h = this;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                if (!this.isPrimary) return [2];
                e = 0, n = l, t.label = 1;
              case 1:
                return e < n.length ? (c = n[e], xr(!this.queryViewsByTarget[c], "Trying to add an already active target"), [4, this.localStore.getQueryForTarget(c)]) : [3, 6];
              case 2:
                return xr(!!(r = t.sent()), "Query data for active target " + c + " not found"), [4, this.localStore.allocateQuery(r)];
              case 3:
                return i = t.sent(), [4, this.initializeViewAndComputeSnapshot(i, !1)];
              case 4:
                t.sent(), this.remoteStore.listen(i), t.label = 5;
              case 5:
                return e++, [3, 1];
              case 6:
                o = function (e) {
                  var n;
                  return d(this, function (t) {
                    switch (t.label) {
                      case 0:
                        return (n = a.queryViewsByTarget[e]) ? [4, a.localStore.releaseQuery(n.query, !1).then(function () {
                          h.remoteStore.unlisten(e), h.removeAndCleanupQuery(n)
                        }).catch(Hs)] : [3, 2];
                      case 1:
                        t.sent(), t.label = 2;
                      case 2:
                        return [2]
                    }
                  })
                }, a = this, s = 0, u = f, t.label = 7;
              case 7:
                return s < u.length ? (c = u[s], [5, o(c)]) : [3, 10];
              case 8:
                t.sent(), t.label = 9;
              case 9:
                return s++, [3, 7];
              case 10:
                return [2]
            }
          })
        })
      }, cf.prototype.enableNetwork = function () {
        return this.localStore.setNetworkEnabled(!0), this.remoteStore.enableNetwork()
      }, cf.prototype.disableNetwork = function () {
        return this.localStore.setNetworkEnabled(!1), this.remoteStore.disableNetwork()
      }, cf.prototype.getRemoteKeysForTarget = function (t) {
        var e = this.limboResolutionsByTarget[t];
        return e && e.receivedDocument ? Ao().add(e.key) : this.queryViewsByTarget[t] ? this.queryViewsByTarget[t].view.syncedDocuments : Ao()
      }, cf);

      function cf(t, e, n, r) {
        this.localStore = t, this.remoteStore = e, this.sharedClientState = n, this.currentUser = r, this.syncEngineListener = null, this.queryViewsByQuery = new Ia(function (t) {
          return t.canonicalId()
        }), this.queryViewsByTarget = {}, this.limboTargetsByKey = new so(Bi.comparator), this.limboResolutionsByTarget = {}, this.limboDocumentRefs = new bc, this.mutationUserCallbacks = {}, this.limboTargetIdGenerator = zo.forSyncEngine(), this.isPrimary = void 0, this.onlineState = uh.Unknown
      }

      var hf = (lf.prototype.isAuthenticated = function () {
        return null != this.uid
      }, lf.prototype.toKey = function () {
        return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user"
      }, lf.prototype.isEqual = function (t) {
        return t.uid === this.uid
      }, lf.UNAUTHENTICATED = new lf(null), lf.GOOGLE_CREDENTIALS = new lf("google-credentials-uid"), lf.FIRST_PARTY = new lf("first-party-uid"), lf);

      function lf(t) {
        this.uid = t
      }

      var ff = "SharedClientState", pf = "firestore_clients", df = "firestore_mutations", mf = "firestore_targets",
        yf = (gf.fromWebStorageEntry = function (t, e, n) {
          var r = JSON.parse(n),
            i = "object" == typeof r && -1 !== ["pending", "acknowledged", "rejected"].indexOf(r.state) && (void 0 === r.error || "object" == typeof r.error),
            o = void 0;
          return i && r.error && (i = "string" == typeof r.error.message && "string" == typeof r.error.code) && (o = new Qr(r.error.code, r.error.message)), i ? new gf(t, e, r.state, o) : (Or(ff, "Failed to parse mutation state for ID '" + e + "': " + n), null)
        }, gf.prototype.toWebStorageJSON = function () {
          var t = {state: this.state, updateTimeMs: Date.now()};
          return this.error && (t.error = {code: this.error.code, message: this.error.message}), JSON.stringify(t)
        }, gf);

      function gf(t, e, n, r) {
        this.user = t, this.batchId = e, this.state = n, xr(void 0 !== (this.error = r) == ("rejected" === n), "MutationMetadata must contain an error iff state is 'rejected'")
      }

      var vf = (bf.fromWebStorageEntry = function (t, e) {
        var n = JSON.parse(e),
          r = "object" == typeof n && -1 !== ["not-current", "current", "rejected"].indexOf(n.state) && (void 0 === n.error || "object" == typeof n.error),
          i = void 0;
        return r && n.error && (r = "string" == typeof n.error.message && "string" == typeof n.error.code) && (i = new Qr(n.error.code, n.error.message)), r ? new bf(t, n.state, i) : (Or(ff, "Failed to parse target state for ID '" + t + "': " + e), null)
      }, bf.prototype.toWebStorageJSON = function () {
        var t = {state: this.state, updateTimeMs: Date.now()};
        return this.error && (t.error = {code: this.error.code, message: this.error.message}), JSON.stringify(t)
      }, bf);

      function bf(t, e, n) {
        this.targetId = t, this.state = e, xr(void 0 !== (this.error = n) == ("rejected" === e), "QueryTargetMetadata must contain an error iff state is 'rejected'")
      }

      var wf = (Ef.fromWebStorageEntry = function (t, e) {
        for (var n = JSON.parse(e), r = "object" == typeof n && n.activeTargetIds instanceof Array, i = Ro(), o = 0; r && o < n.activeTargetIds.length; ++o) r = Wc(n.activeTargetIds[o]), i = i.add(n.activeTargetIds[o]);
        return r ? new Ef(t, i) : (Or(ff, "Failed to parse client data for instance '" + t + "': " + e), null)
      }, Ef);

      function Ef(t, e) {
        this.clientId = t, this.activeTargetIds = e
      }

      var Sf = (Tf.fromWebStorageEntry = function (t) {
        var e = JSON.parse(t);
        return "object" == typeof e && e.onlineState in uh && "string" == typeof e.clientId ? new Tf(e.clientId, uh[e.onlineState]) : (Or(ff, "Failed to parse online state: " + t), null)
      }, Tf);

      function Tf(t, e) {
        this.clientId = t, this.onlineState = e
      }

      var If = (Cf.prototype.addQueryTarget = function (t) {
        xr(!this.activeTargetIds.has(t), "Target with ID '" + t + "' already active."), this.activeTargetIds = this.activeTargetIds.add(t)
      }, Cf.prototype.removeQueryTarget = function (t) {
        this.activeTargetIds = this.activeTargetIds.delete(t)
      }, Cf.prototype.toWebStorageJSON = function () {
        var t = {activeTargetIds: this.activeTargetIds.toArray(), updateTimeMs: Date.now()};
        return JSON.stringify(t)
      }, Cf);

      function Cf() {
        this.activeTargetIds = Ro()
      }

      var Df = (Nf.isAvailable = function (t) {
        return !(!t.window || null == t.window.localStorage)
      }, Nf.prototype.start = function () {
        return p(this, void 0, void 0, function () {
          var e, n, r, i, o, a, s, u, c, h, l, f = this;
          return d(this, function (t) {
            switch (t.label) {
              case 0:
                return xr(!this.started, "WebStorageSharedClientState already started"), xr(null !== this.syncEngine, "syncEngine property must be set before calling start()"), xr(null !== this.onlineStateHandler, "onlineStateHandler property must be set before calling start()"), [4, this.syncEngine.getActiveClients()];
              case 1:
                for (e = t.sent(), n = 0, r = e; n < r.length; n++) (i = r[n]) !== this.localClientId && (o = this.getItem(this.toWebStorageClientStateKey(i))) && (a = wf.fromWebStorageEntry(i, o)) && (this.activeClients[a.clientId] = a);
                for (this.persistClientState(), (s = this.storage.getItem(this.onlineStateKey)) && (u = this.fromWebStorageOnlineState(s)) && this.handleOnlineStateEvent(u), c = 0, h = this.earlyEvents; c < h.length; c++) l = h[c], this.handleWebStorageEvent(l);
                return this.earlyEvents = [], this.platform.window.addEventListener("unload", function () {
                  return f.shutdown()
                }), this.started = !0, [2]
            }
          })
        })
      }, Nf.prototype.writeSequenceNumber = function (t) {
        this.setItem(this.sequenceNumberKey, JSON.stringify(t))
      }, Nf.prototype.getAllActiveQueryTargets = function () {
        var n = Ro();
        return Hr(this.activeClients, function (t, e) {
          n = n.unionWith(e.activeTargetIds)
        }), n
      }, Nf.prototype.isActiveQueryTarget = function (t) {
        for (var e in this.activeClients) if (this.activeClients.hasOwnProperty(e) && this.activeClients[e].activeTargetIds.has(t)) return !0;
        return !1
      }, Nf.prototype.addPendingMutation = function (t) {
        this.persistMutationState(t, "pending")
      }, Nf.prototype.updateMutationState = function (t, e, n) {
        this.persistMutationState(t, e, n), this.removeMutationState(t)
      }, Nf.prototype.addLocalQueryTarget = function (t) {
        var e = "not-current";
        if (this.isActiveQueryTarget(t)) {
          var n = this.storage.getItem(this.toWebStorageQueryTargetMetadataKey(t));
          if (n) {
            var r = vf.fromWebStorageEntry(t, n);
            r && (e = r.state)
          }
        }
        return this.localClientState.addQueryTarget(t), this.persistClientState(), e
      }, Nf.prototype.removeLocalQueryTarget = function (t) {
        this.localClientState.removeQueryTarget(t), this.persistClientState()
      }, Nf.prototype.isLocalQueryTarget = function (t) {
        return this.localClientState.activeTargetIds.has(t)
      }, Nf.prototype.clearQueryState = function (t) {
        this.removeItem(this.toWebStorageQueryTargetMetadataKey(t))
      }, Nf.prototype.updateQueryState = function (t, e, n) {
        this.persistQueryTargetState(t, e, n)
      }, Nf.prototype.handleUserChange = function (t, e, n) {
        var r = this;
        e.forEach(function (t) {
          r.removeMutationState(t)
        }), this.currentUser = t, n.forEach(function (t) {
          r.addPendingMutation(t)
        })
      }, Nf.prototype.setOnlineState = function (t) {
        this.persistOnlineState(t)
      }, Nf.prototype.shutdown = function () {
        this.started && (this.platform.window.removeEventListener("storage", this.storageListener), this.removeItem(this.localClientStorageKey), this.started = !1)
      }, Nf.prototype.getItem = function (t) {
        var e = this.storage.getItem(t);
        return _r(ff, "READ", t, e), e
      }, Nf.prototype.setItem = function (t, e) {
        _r(ff, "SET", t, e), this.storage.setItem(t, e)
      }, Nf.prototype.removeItem = function (t) {
        _r(ff, "REMOVE", t), this.storage.removeItem(t)
      }, Nf.prototype.handleWebStorageEvent = function (s) {
        var t = this;
        if (s.storageArea === this.storage) {
          if (_r(ff, "EVENT", s.key, s.newValue), s.key === this.localClientStorageKey) return void Or("Received WebStorage notification for local change. Another client might have garbage-collected our state");
          this.queue.enqueueAndForget(function () {
            return p(t, void 0, void 0, function () {
              var e, n, r, i, o, a;
              return d(this, function (t) {
                if (!this.started) return this.earlyEvents.push(s), [2];
                if (null === s.key) return [2];
                if (this.clientStateKeyRe.test(s.key)) {
                  if (null == s.newValue) return n = this.fromWebStorageClientStateKey(s.key), [2, this.handleClientStateEvent(n, null)];
                  if (e = this.fromWebStorageClientState(s.key, s.newValue)) return [2, this.handleClientStateEvent(e.clientId, e)]
                } else if (this.mutationBatchKeyRe.test(s.key)) {
                  if (null !== s.newValue && (r = this.fromWebStorageMutationMetadata(s.key, s.newValue))) return [2, this.handleMutationBatchEvent(r)]
                } else if (this.queryTargetKeyRe.test(s.key)) {
                  if (null !== s.newValue && (i = this.fromWebStorageQueryTargetMetadata(s.key, s.newValue))) return [2, this.handleQueryTargetEvent(i)]
                } else if (s.key === this.onlineStateKey) {
                  if (null !== s.newValue && (o = this.fromWebStorageOnlineState(s.newValue))) return [2, this.handleOnlineStateEvent(o)]
                } else s.key === this.sequenceNumberKey && (xr(!!this.sequenceNumberHandler, "Missing sequenceNumberHandler"), (a = function (t) {
                  var e = Ai.INVALID;
                  if (null != t) try {
                    var n = JSON.parse(t);
                    xr("number" == typeof n, "Found non-numeric sequence number"), e = n
                  } catch (t) {
                    Or(ff, "Failed to read sequence number from WebStorage", t)
                  }
                  return e
                }(s.newValue)) !== Ai.INVALID && this.sequenceNumberHandler(a));
                return [2]
              })
            })
          })
        }
      }, Object.defineProperty(Nf.prototype, "localClientState", {
        get: function () {
          return this.activeClients[this.localClientId]
        }, enumerable: !0, configurable: !0
      }), Nf.prototype.persistClientState = function () {
        this.setItem(this.localClientStorageKey, this.localClientState.toWebStorageJSON())
      }, Nf.prototype.persistMutationState = function (t, e, n) {
        var r = new yf(this.currentUser, t, e, n), i = this.toWebStorageMutationBatchKey(t);
        this.setItem(i, r.toWebStorageJSON())
      }, Nf.prototype.removeMutationState = function (t) {
        var e = this.toWebStorageMutationBatchKey(t);
        this.removeItem(e)
      }, Nf.prototype.persistOnlineState = function (t) {
        var e = {clientId: this.localClientId, onlineState: uh[t]};
        this.storage.setItem(this.onlineStateKey, JSON.stringify(e))
      }, Nf.prototype.persistQueryTargetState = function (t, e, n) {
        var r = this.toWebStorageQueryTargetMetadataKey(t), i = new vf(t, e, n);
        this.setItem(r, i.toWebStorageJSON())
      }, Nf.prototype.toWebStorageClientStateKey = function (t) {
        return xr(-1 === t.indexOf("_"), "Client key cannot contain '_', but was '" + t + "'"), pf + "_" + this.persistenceKey + "_" + t
      }, Nf.prototype.toWebStorageQueryTargetMetadataKey = function (t) {
        return mf + "_" + this.persistenceKey + "_" + t
      }, Nf.prototype.toWebStorageMutationBatchKey = function (t) {
        var e = df + "_" + this.persistenceKey + "_" + t;
        return this.currentUser.isAuthenticated() && (e += "_" + this.currentUser.uid), e
      }, Nf.prototype.fromWebStorageClientStateKey = function (t) {
        var e = this.clientStateKeyRe.exec(t);
        return e ? e[1] : null
      }, Nf.prototype.fromWebStorageClientState = function (t, e) {
        var n = this.fromWebStorageClientStateKey(t);
        return xr(null !== n, "Cannot parse client state key '" + t + "'"), wf.fromWebStorageEntry(n, e)
      }, Nf.prototype.fromWebStorageMutationMetadata = function (t, e) {
        var n = this.mutationBatchKeyRe.exec(t);
        xr(null !== n, "Cannot parse mutation batch key '" + t + "'");
        var r = Number(n[1]), i = void 0 !== n[2] ? n[2] : null;
        return yf.fromWebStorageEntry(new hf(i), r, e)
      }, Nf.prototype.fromWebStorageQueryTargetMetadata = function (t, e) {
        var n = this.queryTargetKeyRe.exec(t);
        xr(null !== n, "Cannot parse query target key '" + t + "'");
        var r = Number(n[1]);
        return vf.fromWebStorageEntry(r, e)
      }, Nf.prototype.fromWebStorageOnlineState = function (t) {
        return Sf.fromWebStorageEntry(t)
      }, Nf.prototype.handleMutationBatchEvent = function (e) {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            return e.user.uid !== this.currentUser.uid ? (_r(ff, "Ignoring mutation for non-active user " + e.user.uid), [2]) : [2, this.syncEngine.applyBatchState(e.batchId, e.state, e.error)]
          })
        })
      }, Nf.prototype.handleQueryTargetEvent = function (t) {
        return this.syncEngine.applyTargetState(t.targetId, t.state, t.error)
      }, Nf.prototype.handleClientStateEvent = function (t, e) {
        var n = this, r = this.getAllActiveQueryTargets();
        e ? this.activeClients[t] = e : delete this.activeClients[t];
        var i = this.getAllActiveQueryTargets(), o = [], a = [];
        return i.forEach(function (e) {
          return p(n, void 0, void 0, function () {
            return d(this, function (t) {
              return r.has(e) || o.push(e), [2]
            })
          })
        }), r.forEach(function (e) {
          return p(n, void 0, void 0, function () {
            return d(this, function (t) {
              return i.has(e) || a.push(e), [2]
            })
          })
        }), this.syncEngine.applyActiveTargetsChange(o, a)
      }, Nf.prototype.handleOnlineStateEvent = function (t) {
        this.activeClients[t.clientId] && this.onlineStateHandler(t.onlineState)
      }, Nf);

      function Nf(t, e, n, r, i) {
        if (this.queue = t, this.platform = e, this.persistenceKey = n, this.localClientId = r, this.syncEngine = null, this.onlineStateHandler = null, this.sequenceNumberHandler = null, this.activeClients = {}, this.storageListener = this.handleWebStorageEvent.bind(this), this.started = !1, this.earlyEvents = [], !Nf.isAvailable(this.platform)) throw new Qr(Ur.UNIMPLEMENTED, "LocalStorage is not available on this platform.");
        var o = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        this.storage = this.platform.window.localStorage, this.currentUser = i, this.localClientStorageKey = this.toWebStorageClientStateKey(this.localClientId), this.sequenceNumberKey = "firestore_sequence_number_" + n, this.activeClients[this.localClientId] = new If, this.clientStateKeyRe = new RegExp("^" + pf + "_" + o + "_([^_]*)$"), this.mutationBatchKeyRe = new RegExp("^" + df + "_" + o + "_(\\d+)(?:_(.*))?$"), this.queryTargetKeyRe = new RegExp("^" + mf + "_" + o + "_(\\d+)$"), this.onlineStateKey = "firestore_online_state_" + n, this.platform.window.addEventListener("storage", this.storageListener)
      }

      var Af = (kf.prototype.addPendingMutation = function (t) {
      }, kf.prototype.updateMutationState = function (t, e, n) {
      }, kf.prototype.addLocalQueryTarget = function (t) {
        return this.localState.addQueryTarget(t), this.queryState[t] || "not-current"
      }, kf.prototype.updateQueryState = function (t, e, n) {
        this.queryState[t] = e
      }, kf.prototype.removeLocalQueryTarget = function (t) {
        this.localState.removeQueryTarget(t)
      }, kf.prototype.isLocalQueryTarget = function (t) {
        return this.localState.activeTargetIds.has(t)
      }, kf.prototype.clearQueryState = function (t) {
        delete this.queryState[t]
      }, kf.prototype.getAllActiveQueryTargets = function () {
        return this.localState.activeTargetIds
      }, kf.prototype.isActiveQueryTarget = function (t) {
        return this.localState.activeTargetIds.has(t)
      }, kf.prototype.start = function () {
        return this.localState = new If, Promise.resolve()
      }, kf.prototype.handleUserChange = function (t, e, n) {
      }, kf.prototype.setOnlineState = function (t) {
      }, kf.prototype.shutdown = function () {
      }, kf.prototype.writeSequenceNumber = function (t) {
      }, kf);

      function kf() {
        this.localState = new If, this.queryState = {}, this.syncEngine = null, this.onlineStateHandler = null, this.sequenceNumberHandler = null
      }

      var Rf = "FirestoreClient", Mf = (_f.prototype.lruParams = function () {
        return Ls.withCacheSize(this.cacheSizeBytes)
      }, _f);

      function _f(t, e) {
        this.cacheSizeBytes = t, this.synchronizeTabs = e
      }

      var Of = function () {
      }, Lf = (Pf.prototype.start = function (t) {
        var n = this;
        this.verifyNotShutdown();
        var r = new Gi, i = new Gi, o = !1;
        return this.credentials.setChangeListener(function (e) {
          o ? n.asyncQueue.enqueueAndForget(function () {
            return n.handleCredentialChange(e)
          }) : (o = !0, n.initializePersistence(t, i, e).then(function (t) {
            return n.initializeRest(e, t)
          }).then(r.resolve, r.reject))
        }), this.asyncQueue.enqueueAndForget(function () {
          return r.promise
        }), i.promise
      }, Pf.prototype.enableNetwork = function () {
        var t = this;
        return this.verifyNotShutdown(), this.asyncQueue.enqueue(function () {
          return t.syncEngine.enableNetwork()
        })
      }, Pf.prototype.initializePersistence = function (t, e, n) {
        var r = this;
        return t instanceof Mf ? this.startIndexedDbPersistence(n, t).then(function (t) {
          return e.resolve(), t
        }).catch(function (t) {
          if (e.reject(t), !r.canFallback(t)) throw t;
          return console.warn("Error enabling offline persistence. Falling back to persistence disabled: " + t), r.startMemoryPersistence()
        }) : (e.resolve(), this.startMemoryPersistence())
      }, Pf.prototype.canFallback = function (t) {
        return t instanceof Qr ? t.code === Ur.FAILED_PRECONDITION || t.code === Ur.UNIMPLEMENTED : !("undefined" != typeof DOMException && t instanceof DOMException) || 22 === t.code || 20 === t.code || 11 === t.code
      }, Pf.prototype.verifyNotShutdown = function () {
        if (this._clientShutdown) throw new Qr(Ur.FAILED_PRECONDITION, "The client has already been shutdown.")
      }, Pf.prototype.startIndexedDbPersistence = function (r, i) {
        var t = this, o = Ws.buildStoragePrefix(this.databaseInfo),
          a = new jl(this.databaseInfo.databaseId, {useProto3Json: !0});
        return Promise.resolve().then(function () {
          return p(t, void 0, void 0, function () {
            var e, n;
            return d(this, function (t) {
              switch (t.label) {
                case 0:
                  if (i.synchronizeTabs && !Df.isAvailable(this.platform)) throw new Qr(Ur.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
                  return n = i.lruParams(), i.synchronizeTabs ? (this.sharedClientState = new Df(this.asyncQueue, this.platform, o, this.clientId, r), [4, Ws.createMultiClientIndexedDbPersistence(o, this.clientId, this.platform, this.asyncQueue, a, n, {sequenceNumberSyncer: this.sharedClientState})]) : [3, 2];
                case 1:
                  return e = t.sent(), [3, 4];
                case 2:
                  return this.sharedClientState = new Af, [4, Ws.createIndexedDbPersistence(o, this.clientId, this.platform, this.asyncQueue, a, n)];
                case 3:
                  e = t.sent(), t.label = 4;
                case 4:
                  return [2, (this.persistence = e).referenceDelegate.garbageCollector]
              }
            })
          })
        })
      }, Pf.prototype.startMemoryPersistence = function () {
        return this.persistence = Lc.createEagerPersistence(this.clientId), this.sharedClientState = new Af, Promise.resolve(null)
      }, Pf.prototype.initializeRest = function (u, c) {
        var t = this;
        return _r(Rf, "Initializing. user=", u.uid), this.platform.loadConnection(this.databaseInfo).then(function (s) {
          return p(t, void 0, void 0, function () {
            var e, n, r, i, o, a = this;
            return d(this, function (t) {
              switch (t.label) {
                case 0:
                  return this.localStore = new Tc(this.persistence, u), c && (this.lruScheduler = new xs(c, this.asyncQueue, this.localStore)), e = this.platform.newConnectivityMonitor(), n = this.platform.newSerializer(this.databaseInfo.databaseId), r = new ah(this.asyncQueue, s, this.credentials, n), i = function (t) {
                    return a.syncEngine.applyOnlineStateChange(t, hh.RemoteStore)
                  }, o = function (t) {
                    return a.syncEngine.applyOnlineStateChange(t, hh.SharedClientState)
                  }, this.remoteStore = new Wh(this.localStore, r, this.asyncQueue, i, e), this.syncEngine = new uf(this.localStore, this.remoteStore, this.sharedClientState, u), this.sharedClientState.onlineStateHandler = o, this.remoteStore.syncEngine = this.syncEngine, this.sharedClientState.syncEngine = this.syncEngine, this.eventMgr = new Hl(this.syncEngine), [4, this.sharedClientState.start()];
                case 1:
                  return t.sent(), [4, this.remoteStore.start()];
                case 2:
                  return t.sent(), [4, this.persistence.setPrimaryStateListener(function (e) {
                    return p(a, void 0, void 0, function () {
                      return d(this, function (t) {
                        switch (t.label) {
                          case 0:
                            return [4, this.syncEngine.applyPrimaryState(e)];
                          case 1:
                            return t.sent(), this.lruScheduler && (e && !this.lruScheduler.started ? this.lruScheduler.start() : e || this.lruScheduler.stop()), [2]
                        }
                      })
                    })
                  })];
                case 3:
                  return t.sent(), [4, this.persistence.setDatabaseDeletedListener(function () {
                    return p(a, void 0, void 0, function () {
                      return d(this, function (t) {
                        switch (t.label) {
                          case 0:
                            return [4, this.shutdown()];
                          case 1:
                            return t.sent(), [2]
                        }
                      })
                    })
                  })];
                case 4:
                  return t.sent(), [2]
              }
            })
          })
        })
      }, Pf.prototype.handleCredentialChange = function (t) {
        return this.asyncQueue.verifyOperationInProgress(), _r(Rf, "Credential Changed. Current user: " + t.uid), this.syncEngine.handleCredentialChange(t)
      }, Pf.prototype.disableNetwork = function () {
        var t = this;
        return this.verifyNotShutdown(), this.asyncQueue.enqueue(function () {
          return t.syncEngine.disableNetwork()
        })
      }, Pf.prototype.shutdown = function () {
        var t = this;
        return this.asyncQueue.enqueue(function () {
          return p(t, void 0, void 0, function () {
            return d(this, function (t) {
              switch (t.label) {
                case 0:
                  return this._clientShutdown ? [3, 4] : (this.lruScheduler && this.lruScheduler.stop(), [4, this.remoteStore.shutdown()]);
                case 1:
                  return t.sent(), [4, this.sharedClientState.shutdown()];
                case 2:
                  return t.sent(), [4, this.persistence.shutdown()];
                case 3:
                  t.sent(), this.credentials.removeChangeListener(), this._clientShutdown = !0, t.label = 4;
                case 4:
                  return [2]
              }
            })
          })
        })
      }, Pf.prototype.listen = function (t, e, n) {
        var r = this;
        this.verifyNotShutdown();
        var i = new Xl(t, e, n);
        return this.asyncQueue.enqueueAndForget(function () {
          return r.eventMgr.listen(i)
        }), i
      }, Pf.prototype.unlisten = function (t) {
        var e = this;
        this.verifyNotShutdown(), this.asyncQueue.enqueueAndForget(function () {
          return e.eventMgr.unlisten(t)
        })
      }, Pf.prototype.getDocumentFromLocalCache = function (t) {
        var e = this;
        return this.verifyNotShutdown(), this.asyncQueue.enqueue(function () {
          return e.localStore.readDocument(t)
        }).then(function (t) {
          if (t instanceof ya) return t;
          if (t instanceof ba) return null;
          throw new Qr(Ur.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)")
        })
      }, Pf.prototype.getDocumentsFromLocalCache = function (i) {
        var t = this;
        return this.verifyNotShutdown(), this.asyncQueue.enqueue(function () {
          return t.localStore.executeQuery(i)
        }).then(function (t) {
          var e = Ao(), n = new nf(i, e), r = n.computeDocChanges(t);
          return n.applyChanges(r, !1).snapshot
        })
      }, Pf.prototype.write = function (t) {
        var e = this;
        this.verifyNotShutdown();
        var n = new Gi;
        return this.asyncQueue.enqueueAndForget(function () {
          return e.syncEngine.write(t, n)
        }), n.promise
      }, Pf.prototype.databaseId = function () {
        return this.databaseInfo.databaseId
      }, Object.defineProperty(Pf.prototype, "clientShutdown", {
        get: function () {
          return this._clientShutdown
        }, enumerable: !0, configurable: !0
      }), Pf.prototype.transaction = function (t) {
        var e = this;
        return this.verifyNotShutdown(), this.asyncQueue.enqueue(function () {
          return p(e, void 0, void 0, function () {
            return d(this, function (t) {
              return [2]
            })
          })
        }).then(function () {
          return e.syncEngine.runTransaction(t)
        })
      }, Pf);

      function Pf(t, e, n, r) {
        this.platform = t, this.databaseInfo = e, this.credentials = n, this.asyncQueue = r, this.clientId = di.newId(), this._clientShutdown = !1
      }

      var xf = (qf.prototype.next = function (t) {
        this.scheduleEvent(this.observer.next, t)
      }, qf.prototype.error = function (t) {
        this.scheduleEvent(this.observer.error, t)
      }, qf.prototype.mute = function () {
        this.muted = !0
      }, qf.prototype.scheduleEvent = function (t, e) {
        var n = this;
        this.muted || setTimeout(function () {
          n.muted || t(e)
        }, 0)
      }, qf);

      function qf(t) {
        this.observer = t, this.muted = !1
      }

      var Ff = (Vf.documentId = function () {
        return Vf._DOCUMENT_ID
      }, Vf.prototype.isEqual = function (t) {
        if (!(t instanceof Vf)) throw li("isEqual", "FieldPath", 1, t);
        return this._internalPath.isEqual(t._internalPath)
      }, Vf._DOCUMENT_ID = new Vf(Fi.keyField().canonicalString()), Vf);

      function Vf() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        !function (t, e, n, r) {
          if (!(e instanceof Array) || e.length < r) throw new Qr(Ur.INVALID_ARGUMENT, "Function " + t + "() requires its " + n + " argument to be an array with at least " + pi(r, "element") + ".")
        }("FieldPath", t, "fieldNames", 1);
        for (var n = 0; n < t.length; ++n) if (ti("FieldPath", "string", n, t[n]), 0 === t[n].length) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
        this._internalPath = new Fi(t)
      }

      var Bf = new RegExp("[~\\*/\\[\\]]");
      var Uf = function (t, e) {
        this.user = e, this.type = "OAuth", this.authHeaders = {Authorization: "Bearer " + t}
      }, Qf = (Kf.prototype.getToken = function () {
        return Promise.resolve(null)
      }, Kf.prototype.invalidateToken = function () {
      }, Kf.prototype.setChangeListener = function (t) {
        xr(!this.changeListener, "Can only call setChangeListener() once."), (this.changeListener = t)(hf.UNAUTHENTICATED)
      }, Kf.prototype.removeChangeListener = function () {
        xr(null !== this.changeListener, "removeChangeListener() when no listener registered"), this.changeListener = null
      }, Kf);

      function Kf() {
        this.changeListener = null
      }

      var Gf = (jf.prototype.getToken = function () {
        var e = this;
        xr(null != this.tokenListener, "getToken cannot be called after listener removed.");
        var n = this.tokenCounter, t = this.forceRefresh;
        return this.forceRefresh = !1, this.app.INTERNAL.getToken(t).then(function (t) {
          if (e.tokenCounter !== n) throw new Qr(Ur.ABORTED, "getToken aborted due to token change.");
          return t ? (xr("string" == typeof t.accessToken, "Invalid tokenData returned from getToken():" + t), new Uf(t.accessToken, e.currentUser)) : null
        })
      }, jf.prototype.invalidateToken = function () {
        this.forceRefresh = !0
      }, jf.prototype.setChangeListener = function (t) {
        xr(!this.changeListener, "Can only call setChangeListener() once."), this.changeListener = t, this.currentUser && t(this.currentUser)
      }, jf.prototype.removeChangeListener = function () {
        xr(null != this.tokenListener, "removeChangeListener() called twice"), xr(null !== this.changeListener, "removeChangeListener() called when no listener registered"), this.app.INTERNAL.removeAuthTokenListener(this.tokenListener), this.tokenListener = null, this.changeListener = null
      }, jf.prototype.getUser = function () {
        var t = this.app.INTERNAL.getUid();
        return xr(null === t || "string" == typeof t, "Received invalid UID: " + t), new hf(t)
      }, jf);

      function jf(t) {
        var e = this;
        this.app = t, this.tokenListener = null, this.tokenCounter = 0, this.changeListener = null, this.forceRefresh = !1, this.tokenListener = function () {
          e.tokenCounter++, e.currentUser = e.getUser(), e.changeListener && e.changeListener(e.currentUser)
        }, this.tokenCounter = 0, this.app.INTERNAL.addAuthTokenListener(this.tokenListener)
      }

      var Wf = (Object.defineProperty(zf.prototype, "authHeaders", {
        get: function () {
          var t = {"X-Goog-AuthUser": this.sessionIndex}, e = this.gapi.auth.getAuthHeaderValueForFirstParty([]);
          return e && (t.Authorization = e), t
        }, enumerable: !0, configurable: !0
      }), zf);

      function zf(t, e) {
        this.gapi = t, this.sessionIndex = e, this.type = "FirstParty", this.user = hf.FIRST_PARTY
      }

      var Hf = (Yf.prototype.getToken = function () {
        return Promise.resolve(new Wf(this.gapi, this.sessionIndex))
      }, Yf.prototype.setChangeListener = function (t) {
        t(hf.FIRST_PARTY)
      }, Yf.prototype.removeChangeListener = function () {
      }, Yf.prototype.invalidateToken = function () {
      }, Yf);

      function Yf(t, e) {
        this.gapi = t, this.sessionIndex = e
      }

      function Xf(t) {
        return function (t, e) {
          if ("object" != typeof t || null === t) return !1;
          for (var n = t, r = 0, i = e; r < i.length; r++) {
            var o = i[r];
            if (o in n && "function" == typeof n[o]) return !0
          }
          return !1
        }(t, ["next", "error", "complete"])
      }

      var Jf = ($f.delete = function () {
        return Xr("FieldValue.delete", arguments), tp.instance
      }, $f.serverTimestamp = function () {
        return Xr("FieldValue.serverTimestamp", arguments), rp.instance
      }, $f.arrayUnion = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return $r("FieldValue.arrayUnion", arguments, 1), new ap(t)
      }, $f.arrayRemove = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return $r("FieldValue.arrayRemove", arguments, 1), new cp(t)
      }, $f.increment = function (t) {
        return ti("FieldValue.increment", "number", 1, t), Jr("FieldValue.increment", arguments, 1), new fp(t)
      }, $f.prototype.isEqual = function (t) {
        return this === t
      }, $f);

      function $f(t) {
        this._methodName = t
      }

      var Zf, tp = (s(ep, Zf = Jf), ep.instance = new ep, ep);

      function ep() {
        return Zf.call(this, "FieldValue.delete") || this
      }

      var np, rp = (s(ip, np = Jf), ip.instance = new ip, ip);

      function ip() {
        return np.call(this, "FieldValue.serverTimestamp") || this
      }

      var op, ap = (s(sp, op = Jf), sp);

      function sp(t) {
        var e = op.call(this, "FieldValue.arrayUnion") || this;
        return e._elements = t, e
      }

      var up, cp = (s(hp, up = Jf), hp);

      function hp(t) {
        var e = up.call(this, "FieldValue.arrayRemove") || this;
        return e._elements = t, e
      }

      var lp, fp = (s(pp, lp = Jf), pp);

      function pp(t) {
        var e = lp.call(this, "FieldValue.increment") || this;
        return e._operand = t, e
      }

      var dp = Gr(Jf, "Use FieldValue.<field>() instead."), mp = /^__.*__$/,
        yp = (gp.prototype.toMutations = function (t, e) {
          var n = [];
          return null !== this.fieldMask ? n.push(new cc(t, this.data, this.fieldMask, e)) : n.push(new ac(t, this.data, e)), 0 < this.fieldTransforms.length && n.push(new fc(t, this.fieldTransforms)), n
        }, gp);

      function gp(t, e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n
      }

      var vp, bp, wp = (Ep.prototype.toMutations = function (t, e) {
        var n = [new cc(t, this.data, this.fieldMask, e)];
        return 0 < this.fieldTransforms.length && n.push(new fc(t, this.fieldTransforms)), n
      }, Ep);

      function Ep(t, e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n
      }

      function Sp(t) {
        switch (t) {
          case vp.Set:
          case vp.MergeSet:
          case vp.Update:
            return !0;
          case vp.Argument:
            return !1;
          default:
            throw Pr("Unexpected case for UserDataSource: " + t)
        }
      }

      (bp = vp = vp || {})[bp.Set = 0] = "Set", bp[bp.Update = 1] = "Update", bp[bp.MergeSet = 2] = "MergeSet", bp[bp.Argument = 3] = "Argument";
      var Tp = (Ip.prototype.childContextForField = function (t) {
        var e = null == this.path ? null : this.path.child(t),
          n = new Ip(this.dataSource, this.methodName, e, !1, this.fieldTransforms, this.fieldMask);
        return n.validatePathSegment(t), n
      }, Ip.prototype.childContextForFieldPath = function (t) {
        var e = null == this.path ? null : this.path.child(t),
          n = new Ip(this.dataSource, this.methodName, e, !1, this.fieldTransforms, this.fieldMask);
        return n.validatePath(), n
      }, Ip.prototype.childContextForArray = function (t) {
        return new Ip(this.dataSource, this.methodName, null, !0, this.fieldTransforms, this.fieldMask)
      }, Ip.prototype.createError = function (t) {
        var e = null === this.path || this.path.isEmpty() ? "" : " (found in field " + this.path.toString() + ")";
        return new Qr(Ur.INVALID_ARGUMENT, "Function " + this.methodName + "() called with invalid data. " + t + e)
      }, Ip.prototype.contains = function (e) {
        return void 0 !== this.fieldMask.find(function (t) {
          return e.isPrefixOf(t)
        }) || void 0 !== this.fieldTransforms.find(function (t) {
          return e.isPrefixOf(t.field)
        })
      }, Ip.prototype.validatePath = function () {
        if (null !== this.path) for (var t = 0; t < this.path.length; t++) this.validatePathSegment(this.path.get(t))
      }, Ip.prototype.validatePathSegment = function (t) {
        if (Sp(this.dataSource) && mp.test(t)) throw this.createError("Document fields cannot begin and end with __")
      }, Ip);

      function Ip(t, e, n, r, i, o) {
        this.dataSource = t, this.methodName = e, this.path = n, this.arrayElement = r, void 0 === i && this.validatePath(), this.arrayElement = void 0 !== r && r, this.fieldTransforms = i || [], this.fieldMask = o || []
      }

      var Cp = function (t, e) {
        this.databaseId = t, this.key = e
      }, Dp = (Np.prototype.parseSetData = function (t, e) {
        var n = new Tp(vp.Set, t, Fi.EMPTY_PATH);
        kp("Data must be an object, but it was:", n, e);
        var r = this.parseData(e, n);
        return new yp(r, null, n.fieldTransforms)
      }, Np.prototype.parseMergeData = function (t, e, n) {
        var r = new Tp(vp.MergeSet, t, Fi.EMPTY_PATH);
        kp("Data must be an object, but it was:", r, e);
        var i, o, a = this.parseData(e, r);
        if (n) {
          for (var s = new yo(Fi.comparator), u = 0, c = n; u < c.length; u++) {
            var h = c[u], l = void 0;
            if (h instanceof Ff) l = h._internalPath; else {
              if ("string" != typeof h) throw Pr("Expected stringOrFieldPath to be a string or a FieldPath");
              l = Mp(t, h)
            }
            if (!r.contains(l)) throw new Qr(Ur.INVALID_ARGUMENT, "Field '" + l + "' is specified in your field mask but missing from your input data.");
            s = s.add(l)
          }
          i = Hu.fromSet(s), o = r.fieldTransforms.filter(function (t) {
            return i.covers(t.field)
          })
        } else i = Hu.fromArray(r.fieldMask), o = r.fieldTransforms;
        return new yp(a, i, o)
      }, Np.prototype.parseUpdateData = function (o, t) {
        var a = this, s = new Tp(vp.Update, o, Fi.EMPTY_PATH);
        kp("Data must be an object, but it was:", s, t);
        var u = new yo(Fi.comparator), c = Ku.EMPTY;
        Hr(t, function (t, e) {
          var n = Mp(o, t), r = s.childContextForFieldPath(n);
          if ((e = a.runPreConverter(e, r)) instanceof tp) u = u.add(n); else {
            var i = a.parseData(e, r);
            null != i && (u = u.add(n), c = c.set(n, i))
          }
        });
        var e = Hu.fromSet(u);
        return new wp(c, e, s.fieldTransforms)
      }, Np.prototype.parseUpdateVarargs = function (t, e, n, r) {
        var i = new Tp(vp.Update, t, Fi.EMPTY_PATH), o = [Rp(t, e)], a = [n];
        if (r.length % 2 != 0) throw new Qr(Ur.INVALID_ARGUMENT, "Function " + t + "() needs to be called with an even number of arguments that alternate between field names and values.");
        for (var s = 0; s < r.length; s += 2) o.push(Rp(t, r[s])), a.push(r[s + 1]);
        var u = new yo(Fi.comparator), c = Ku.EMPTY;
        for (s = 0; s < o.length; ++s) {
          var h = o[s], l = i.childContextForFieldPath(h), f = this.runPreConverter(a[s], l);
          if (f instanceof tp) u = u.add(h); else {
            var p = this.parseData(f, l);
            null != p && (u = u.add(h), c = c.set(h, p))
          }
        }
        var d = Hu.fromSet(u);
        return new wp(c, d, i.fieldTransforms)
      }, Np.prototype.parseQueryValue = function (t, e) {
        var n = new Tp(vp.Argument, t, Fi.EMPTY_PATH), r = this.parseData(e, n);
        return xr(null != r, "Parsed data should not be null."), xr(0 === n.fieldTransforms.length, "Field transforms should have been disallowed."), r
      }, Np.prototype.runPreConverter = function (t, e) {
        try {
          return this.preConverter(t)
        } catch (t) {
          var n = _p(t);
          throw e.createError(n)
        }
      }, Np.prototype.parseData = function (t, e) {
        if (Ap(t = this.runPreConverter(t, e))) return kp("Unsupported field value:", e, t), this.parseObject(t, e);
        if (t instanceof Jf) return this.parseSentinelFieldValue(t, e), null;
        if (e.path && e.fieldMask.push(e.path), t instanceof Array) {
          if (e.arrayElement) throw e.createError("Nested arrays are not supported");
          return this.parseArray(t, e)
        }
        return this.parseScalarValue(t, e)
      }, Np.prototype.parseObject = function (t, r) {
        var i = this, o = new so(yi);
        return Yr(t) ? r.path && 0 < r.path.length && r.fieldMask.push(r.path) : Hr(t, function (t, e) {
          var n = i.parseData(e, r.childContextForField(t));
          null != n && (o = o.insert(t, n))
        }), new Ku(o)
      }, Np.prototype.parseArray = function (t, e) {
        for (var n = [], r = 0, i = 0, o = t; i < o.length; i++) {
          var a = o[i], s = this.parseData(a, e.childContextForArray(r));
          null == s && (s = cu.INSTANCE), n.push(s), r++
        }
        return new Wu(n)
      }, Np.prototype.parseSentinelFieldValue = function (t, e) {
        if (!Sp(e.dataSource)) throw e.createError(t._methodName + "() can only be used with update() and set()");
        if (null === e.path) throw e.createError(t._methodName + "() is not currently supported inside arrays");
        if (t instanceof tp) {
          if (e.dataSource !== vp.MergeSet) throw e.dataSource === vp.Update ? (xr(0 < e.path.length, "FieldValue.delete() at the top level should have already been handled."), e.createError("FieldValue.delete() can only appear at the top level of your update data")) : e.createError("FieldValue.delete() cannot be used with set() unless you pass {merge:true}");
          e.fieldMask.push(e.path)
        } else if (t instanceof rp) e.fieldTransforms.push(new Xu(e.path, Nl.instance)); else if (t instanceof ap) {
          var n = this.parseArrayTransformElements(t._methodName, t._elements), r = new kl(n);
          e.fieldTransforms.push(new Xu(e.path, r))
        } else if (t instanceof cp) {
          n = this.parseArrayTransformElements(t._methodName, t._elements);
          var i = new Ml(n);
          e.fieldTransforms.push(new Xu(e.path, i))
        } else if (t instanceof fp) {
          var o = this.parseQueryValue("FieldValue.increment", t._operand), a = new Ol(o);
          e.fieldTransforms.push(new Xu(e.path, a))
        } else Pr("Unknown FieldValue type: " + t)
      }, Np.prototype.parseScalarValue = function (t, e) {
        if (null === t) return cu.INSTANCE;
        if ("number" == typeof t) return Wc(t) ? new bu(t) : new Su(t);
        if ("boolean" == typeof t) return fu.of(t);
        if ("string" == typeof t) return new Cu(t);
        if (t instanceof Date) return new Au(ro.fromDate(t));
        if (t instanceof ro) return new Au(new ro(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3)));
        if (t instanceof Hh) return new Bu(t);
        if (t instanceof Ei) return new Lu(t);
        if (t instanceof Cp) return new qu(t.databaseId, t.key);
        throw e.createError("Unsupported field value: " + ui(t))
      }, Np.prototype.parseArrayTransformElements = function (r, t) {
        var i = this;
        return t.map(function (t, e) {
          var n = new Tp(vp.Argument, r, Fi.EMPTY_PATH);
          return i.parseData(t, n.childContextForArray(e))
        })
      }, Np);

      function Np(t) {
        this.preConverter = t
      }

      function Ap(t) {
        return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof ro || t instanceof Hh || t instanceof Ei || t instanceof Cp || t instanceof Jf)
      }

      function kp(t, e, n) {
        if (!Ap(n) || !si(n)) {
          var r = ui(n);
          throw"an object" === r ? e.createError(t + " a custom object") : e.createError(t + " " + r)
        }
      }

      function Rp(t, e) {
        if (e instanceof Ff) return e._internalPath;
        if ("string" == typeof e) return Mp(t, e);
        throw new Qr(Ur.INVALID_ARGUMENT, "Function " + t + "() called with invalid data. Field path arguments must be of type string or FieldPath.")
      }

      function Mp(e, t) {
        try {
          return function (e) {
            if (0 <= e.search(Bf)) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid field path (" + e + "). Paths must not contain '~', '*', '/', '[', or ']'");
            try {
              return new (Ff.bind.apply(Ff, [void 0].concat(e.split("."))))
            } catch (t) {
              throw new Qr(Ur.INVALID_ARGUMENT, "Invalid field path (" + e + "). Paths must not be empty, begin with '.', end with '.', or contain '..'")
            }
          }(t)._internalPath
        } catch (t) {
          var n = _p(t);
          throw new Qr(Ur.INVALID_ARGUMENT, "Function " + e + "() called with invalid data. " + n)
        }
      }

      function _p(t) {
        return t instanceof Error ? t.message : t.toString()
      }

      var Op = Ls.COLLECTION_DISABLED, Lp = (Pp.prototype.isEqual = function (t) {
        return this.host === t.host && this.ssl === t.ssl && this.timestampsInSnapshots === t.timestampsInSnapshots && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.forceLongPolling === t.forceLongPolling
      }, Pp);

      function Pp(t) {
        if (void 0 === t.host) {
          if (void 0 !== t.ssl) throw new Qr(Ur.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
          this.host = "firestore.googleapis.com", this.ssl = !0
        } else ni("settings", "non-empty string", "host", t.host), this.host = t.host, ri("settings", "boolean", "ssl", t.ssl), this.ssl = Wr(t.ssl, !0);
        if (hi("settings", t, ["host", "ssl", "credentials", "timestampsInSnapshots", "cacheSizeBytes", "experimentalForceLongPolling"]), ri("settings", "object", "credentials", t.credentials), this.credentials = t.credentials, ri("settings", "boolean", "timestampsInSnapshots", t.timestampsInSnapshots), !0 === t.timestampsInSnapshots ? Or("\n  The timestampsInSnapshots setting now defaults to true and you no\n  longer need to explicitly set it. In a future release, the setting\n  will be removed entirely and so it is recommended that you remove it\n  from your firestore.settings() call now.") : !1 === t.timestampsInSnapshots && Or("\n  The timestampsInSnapshots setting will soon be removed. YOU MUST UPDATE\n  YOUR CODE.\n\n  To hide this warning, stop using the timestampsInSnapshots setting in your\n  firestore.settings({ ... }) call.\n\n  Once you remove the setting, Timestamps stored in Cloud Firestore will be\n  read back as Firebase Timestamp objects instead of as system Date objects.\n  So you will also need to update code expecting a Date to instead expect a\n  Timestamp. For example:\n\n  // Old:\n  const date = snapshot.get('created_at');\n  // New:\n  const timestamp = snapshot.get('created_at'); const date =\n  timestamp.toDate();\n\n  Please audit all existing usages of Date when you enable the new\n  behavior."), this.timestampsInSnapshots = Wr(t.timestampsInSnapshots, !0), ri("settings", "number", "cacheSizeBytes", t.cacheSizeBytes), void 0 === t.cacheSizeBytes) this.cacheSizeBytes = Ls.DEFAULT_CACHE_SIZE_BYTES; else {
          if (t.cacheSizeBytes !== Op && t.cacheSizeBytes < Ls.MINIMUM_CACHE_SIZE_BYTES) throw new Qr(Ur.INVALID_ARGUMENT, "cacheSizeBytes must be at least " + Ls.MINIMUM_CACHE_SIZE_BYTES);
          this.cacheSizeBytes = t.cacheSizeBytes
        }
        ri("settings", "boolean", "experimentalForceLongPolling", t.experimentalForceLongPolling), this.forceLongPolling = void 0 !== t.experimentalForceLongPolling && t.experimentalForceLongPolling
      }

      var xp = function () {
      }, qp = (Fp.prototype.settings = function (t) {
        if (Jr("Firestore.settings", arguments, 1), ti("Firestore.settings", "object", 1, t), jr(t, "persistence")) throw new Qr(Ur.INVALID_ARGUMENT, '"persistence" is now specified with a separate call to firestore.enablePersistence().');
        var e = new Lp(t);
        if (this._firestoreClient && !this._config.settings.isEqual(e)) throw new Qr(Ur.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only call settings() before calling any other methods on a Firestore object.");
        void 0 !== (this._config.settings = e).credentials && (this._config.credentials = function (t) {
          if (!t) return new Qf;
          switch (t.type) {
            case"gapi":
              var e = t.client;
              return xr(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty), "unexpected gapi interface"), new Hf(e, t.sessionIndex || "0");
            case"provider":
              return t.client;
            default:
              throw new Qr(Ur.INVALID_ARGUMENT, "makeCredentialsProvider failed due to invalid credential type")
          }
        }(e.credentials))
      }, Fp.prototype.enableNetwork = function () {
        return this.ensureClientConfigured(), this._firestoreClient.enableNetwork()
      }, Fp.prototype.disableNetwork = function () {
        return this.ensureClientConfigured(), this._firestoreClient.disableNetwork()
      }, Fp.prototype.enablePersistence = function (t) {
        if (this._firestoreClient) throw new Qr(Ur.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only call enablePersistence() before calling any other methods on a Firestore object.");
        var e = !1;
        return t && (void 0 !== t.experimentalTabSynchronization && Or("The 'experimentalTabSynchronization' setting has been renamed to 'synchronizeTabs'. In a future release, the setting will be removed and it is recommended that you update your firestore.enablePersistence() call to use 'synchronizeTabs'."), e = Wr(void 0 !== t.synchronizeTabs ? t.synchronizeTabs : t.experimentalTabSynchronization, !1)), this.configureClient(new Mf(this._config.settings.cacheSizeBytes, e))
      }, Fp.prototype.clearPersistence = function () {
        var t = this, n = Ws.buildStoragePrefix(this.makeDatabaseInfo()), r = new Gi;
        return this._queue.enqueueAndForget(function () {
          return p(t, void 0, void 0, function () {
            var e;
            return d(this, function (t) {
              switch (t.label) {
                case 0:
                  if (t.trys.push([0, 2, , 3]), void 0 !== this._firestoreClient && !this._firestoreClient.clientShutdown) throw new Qr(Ur.FAILED_PRECONDITION, "Persistence cannot be cleared after this Firestore instance is initialized.");
                  return [4, Ws.clearPersistence(n)];
                case 1:
                  return t.sent(), r.resolve(), [3, 3];
                case 2:
                  return e = t.sent(), r.reject(e), [3, 3];
                case 3:
                  return [2]
              }
            })
          })
        }), r.promise
      }, Fp.prototype.ensureClientConfigured = function () {
        return this._firestoreClient || this.configureClient(new Of), this._firestoreClient
      }, Fp.prototype.makeDatabaseInfo = function () {
        return new Ii(this._config.databaseId, this._config.persistenceKey, this._config.settings.host, this._config.settings.ssl, this._config.settings.forceLongPolling)
      }, Fp.prototype.configureClient = function (t) {
        var r = this;
        xr(!!this._config.settings.host, "FirestoreSettings.host cannot be falsey"), xr(!this._firestoreClient, "configureClient() called multiple times");
        var e = this.makeDatabaseInfo();
        return this._dataConverter = new Dp(function (t) {
          if (t instanceof Kp) {
            var e = r._config.databaseId, n = t.firestore._config.databaseId;
            if (!n.isEqual(e)) throw new Qr(Ur.INVALID_ARGUMENT, "Document reference is for database " + n.projectId + "/" + n.database + " but should be for database " + e.projectId + "/" + e.database);
            return new Cp(r._config.databaseId, t._key)
          }
          return t
        }), this._firestoreClient = new Lf(qr.getPlatform(), e, this._config.credentials, this._queue), this._firestoreClient.start(t)
      }, Fp.databaseIdFromApp = function (t) {
        var e = t.options;
        if (!jr(e, "projectId")) throw new Qr(Ur.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
        var n = e.projectId;
        if (!n || "string" != typeof n) throw new Qr(Ur.INVALID_ARGUMENT, "projectId must be a string in FirebaseApp.options");
        return new Di(n)
      }, Object.defineProperty(Fp.prototype, "app", {
        get: function () {
          if (!this._config.firebaseApp) throw new Qr(Ur.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
          return this._config.firebaseApp
        }, enumerable: !0, configurable: !0
      }), Fp.prototype.collection = function (t) {
        return Jr("Firestore.collection", arguments, 1), ti("Firestore.collection", "non-empty string", 1, t), this.ensureClientConfigured(), new rd(Li.fromString(t), this)
      }, Fp.prototype.doc = function (t) {
        return Jr("Firestore.doc", arguments, 1), ti("Firestore.doc", "non-empty string", 1, t), this.ensureClientConfigured(), Kp.forPath(Li.fromString(t), this)
      }, Fp.prototype.collectionGroup = function (t) {
        if (Jr("Firestore.collectionGroup", arguments, 1), ti("Firestore.collectionGroup", "non-empty string", 1, t), 0 <= t.indexOf("/")) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid collection ID '" + t + "' passed to function Firestore.collectionGroup(). Collection IDs must not contain '/'.");
        return this.ensureClientConfigured(), new $p(new Xh(Li.EMPTY_PATH, t), this)
      }, Fp.prototype.runTransaction = function (e) {
        var n = this;
        return Jr("Firestore.runTransaction", arguments, 1), ti("Firestore.runTransaction", "function", 1, e), this.ensureClientConfigured().transaction(function (t) {
          return e(new Vp(n, t))
        })
      }, Fp.prototype.batch = function () {
        return this.ensureClientConfigured(), new Up(this)
      }, Object.defineProperty(Fp, "logLevel", {
        get: function () {
          switch (Rr()) {
            case wr.DEBUG:
              return "debug";
            case wr.ERROR:
              return "error";
            case wr.SILENT:
              return "silent";
            default:
              return Pr("Unknown log level: " + Rr())
          }
        }, enumerable: !0, configurable: !0
      }), Fp.setLogLevel = function (t) {
        switch (Jr("Firestore.setLogLevel", arguments, 1), ti("Firestore.setLogLevel", "non-empty string", 1, t), t) {
          case"debug":
            Mr(wr.DEBUG);
            break;
          case"error":
            Mr(wr.ERROR);
            break;
          case"silent":
            Mr(wr.SILENT);
            break;
          default:
            throw new Qr(Ur.INVALID_ARGUMENT, "Invalid log level: " + t)
        }
      }, Fp.prototype._areTimestampsInSnapshotsEnabled = function () {
        return this._config.settings.timestampsInSnapshots
      }, Fp);

      function Fp(t) {
        var e = this;
        this._queue = new zi, this.INTERNAL = {
          delete: function () {
            return p(e, void 0, void 0, function () {
              return d(this, function (t) {
                switch (t.label) {
                  case 0:
                    return this.ensureClientConfigured(), [4, this._firestoreClient.shutdown()];
                  case 1:
                    return t.sent(), [2]
                }
              })
            })
          }
        };
        var n = new xp;
        if ("object" == typeof t.options) {
          var r = t;
          n.firebaseApp = r, n.databaseId = Fp.databaseIdFromApp(r), n.persistenceKey = n.firebaseApp.name, n.credentials = new Gf(r)
        } else {
          var i = t;
          if (!i.projectId) throw new Qr(Ur.INVALID_ARGUMENT, "Must provide projectId");
          n.databaseId = new Di(i.projectId, i.database), n.persistenceKey = "[DEFAULT]", n.credentials = new Qf
        }
        n.settings = new Lp({}), this._config = n, this._databaseId = n.databaseId
      }

      var Vp = (Bp.prototype.get = function (t) {
        var n = this;
        Jr("Transaction.get", arguments, 1);
        var r = ud("Transaction.get", t, this._firestore);
        return this._transaction.lookup([r._key]).then(function (t) {
          if (!t || 1 !== t.length) return Pr("Mismatch in docs returned from document lookup.");
          var e = t[0];
          if (e instanceof ba) return new zp(n._firestore, r._key, null, !1, !1);
          if (e instanceof ya) return new zp(n._firestore, r._key, e, !1, !1);
          throw Pr("BatchGetDocumentsRequest returned unexpected document type: " + e.constructor.name)
        })
      }, Bp.prototype.set = function (t, e, n) {
        Zr("Transaction.set", arguments, 2, 3);
        var r = ud("Transaction.set", t, this._firestore),
          i = (n = od("Transaction.set", n)).merge || n.mergeFields ? this._firestore._dataConverter.parseMergeData("Transaction.set", e, n.mergeFields) : this._firestore._dataConverter.parseSetData("Transaction.set", e);
        return this._transaction.set(r._key, i), this
      }, Bp.prototype.update = function (t, e, n) {
        for (var r, i, o = [], a = 3; a < arguments.length; a++) o[a - 3] = arguments[a];
        return i = "string" == typeof e || e instanceof Ff ? ($r("Transaction.update", arguments, 3), r = ud("Transaction.update", t, this._firestore), this._firestore._dataConverter.parseUpdateVarargs("Transaction.update", e, n, o)) : (Jr("Transaction.update", arguments, 2), r = ud("Transaction.update", t, this._firestore), this._firestore._dataConverter.parseUpdateData("Transaction.update", e)), this._transaction.update(r._key, i), this
      }, Bp.prototype.delete = function (t) {
        Jr("Transaction.delete", arguments, 1);
        var e = ud("Transaction.delete", t, this._firestore);
        return this._transaction.delete(e._key), this
      }, Bp);

      function Bp(t, e) {
        this._firestore = t, this._transaction = e
      }

      var Up = (Qp.prototype.set = function (t, e, n) {
        Zr("WriteBatch.set", arguments, 2, 3), this.verifyNotCommitted();
        var r = ud("WriteBatch.set", t, this._firestore),
          i = (n = od("WriteBatch.set", n)).merge || n.mergeFields ? this._firestore._dataConverter.parseMergeData("WriteBatch.set", e, n.mergeFields) : this._firestore._dataConverter.parseSetData("WriteBatch.set", e);
        return this._mutations = this._mutations.concat(i.toMutations(r._key, ec.NONE)), this
      }, Qp.prototype.update = function (t, e, n) {
        for (var r, i, o = [], a = 3; a < arguments.length; a++) o[a - 3] = arguments[a];
        return this.verifyNotCommitted(), i = "string" == typeof e || e instanceof Ff ? ($r("WriteBatch.update", arguments, 3), r = ud("WriteBatch.update", t, this._firestore), this._firestore._dataConverter.parseUpdateVarargs("WriteBatch.update", e, n, o)) : (Jr("WriteBatch.update", arguments, 2), r = ud("WriteBatch.update", t, this._firestore), this._firestore._dataConverter.parseUpdateData("WriteBatch.update", e)), this._mutations = this._mutations.concat(i.toMutations(r._key, ec.exists(!0))), this
      }, Qp.prototype.delete = function (t) {
        Jr("WriteBatch.delete", arguments, 1), this.verifyNotCommitted();
        var e = ud("WriteBatch.delete", t, this._firestore);
        return this._mutations = this._mutations.concat(new mc(e._key, ec.NONE)), this
      }, Qp.prototype.commit = function () {
        return p(this, void 0, void 0, function () {
          return d(this, function (t) {
            return this.verifyNotCommitted(), this._committed = !0, 0 < this._mutations.length ? [2, this._firestore.ensureClientConfigured().write(this._mutations)] : [2]
          })
        })
      }, Qp.prototype.verifyNotCommitted = function () {
        if (this._committed) throw new Qr(Ur.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.")
      }, Qp);

      function Qp(t) {
        this._firestore = t, this._mutations = [], this._committed = !1
      }

      var Kp = (Gp.forPath = function (t, e) {
        if (t.length % 2 != 0) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + t.canonicalString() + " has " + t.length);
        return new Gp(new Bi(t), e)
      }, Object.defineProperty(Gp.prototype, "id", {
        get: function () {
          return this._key.path.lastSegment()
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(Gp.prototype, "parent", {
        get: function () {
          return new rd(this._key.path.popLast(), this.firestore)
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(Gp.prototype, "path", {
        get: function () {
          return this._key.path.canonicalString()
        }, enumerable: !0, configurable: !0
      }), Gp.prototype.collection = function (t) {
        if (Jr("DocumentReference.collection", arguments, 1), ti("DocumentReference.collection", "non-empty string", 1, t), !t) throw new Qr(Ur.INVALID_ARGUMENT, "Must provide a non-empty collection name to collection()");
        var e = Li.fromString(t);
        return new rd(this._key.path.child(e), this.firestore)
      }, Gp.prototype.isEqual = function (t) {
        if (!(t instanceof Gp)) throw li("isEqual", "DocumentReference", 1, t);
        return this.firestore === t.firestore && this._key.isEqual(t._key)
      }, Gp.prototype.set = function (t, e) {
        Zr("DocumentReference.set", arguments, 1, 2);
        var n = (e = od("DocumentReference.set", e)).merge || e.mergeFields ? this.firestore._dataConverter.parseMergeData("DocumentReference.set", t, e.mergeFields) : this.firestore._dataConverter.parseSetData("DocumentReference.set", t);
        return this._firestoreClient.write(n.toMutations(this._key, ec.NONE))
      }, Gp.prototype.update = function (t, e) {
        for (var n, r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
        return n = "string" == typeof t || t instanceof Ff ? ($r("DocumentReference.update", arguments, 2), this.firestore._dataConverter.parseUpdateVarargs("DocumentReference.update", t, e, r)) : (Jr("DocumentReference.update", arguments, 1), this.firestore._dataConverter.parseUpdateData("DocumentReference.update", t)), this._firestoreClient.write(n.toMutations(this._key, ec.exists(!0)))
      }, Gp.prototype.delete = function () {
        return Jr("DocumentReference.delete", arguments, 0), this._firestoreClient.write([new mc(this._key, ec.NONE)])
      }, Gp.prototype.onSnapshot = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        Zr("DocumentReference.onSnapshot", arguments, 1, 4);
        var n, r = {includeMetadataChanges: !1}, i = 0;
        "object" != typeof t[i] || Xf(t[i]) || (hi("DocumentReference.onSnapshot", r = t[i], ["includeMetadataChanges"]), ri("DocumentReference.onSnapshot", "boolean", "includeMetadataChanges", r.includeMetadataChanges), i++);
        var o = {includeMetadataChanges: r.includeMetadataChanges};
        return n = Xf(t[i]) ? t[i] : (ti("DocumentReference.onSnapshot", "function", i, t[i]), ei("DocumentReference.onSnapshot", "function", i + 1, t[i + 1]), ei("DocumentReference.onSnapshot", "function", i + 2, t[i + 2]), {
          next: t[i],
          error: t[i + 1],
          complete: t[i + 2]
        }), this.onSnapshotInternal(o, n)
      }, Gp.prototype.onSnapshotInternal = function (t, n) {
        var r = this, e = function (t) {
          console.error("Uncaught Error in onSnapshot:", t)
        };
        n.error && (e = n.error.bind(n));
        var i = new xf({
          next: function (t) {
            if (n.next) {
              xr(t.docs.size <= 1, "Too many documents returned on a document query");
              var e = t.docs.get(r._key);
              n.next(new zp(r.firestore, r._key, e, t.fromCache, t.hasPendingWrites))
            }
          }, error: e
        }), o = this._firestoreClient.listen(Xh.atPath(this._key.path), i, t);
        return function () {
          i.mute(), r._firestoreClient.unlisten(o)
        }
      }, Gp.prototype.get = function (n) {
        var r = this;
        return Zr("DocumentReference.get", arguments, 0, 1), sd("DocumentReference.get", n), new Promise(function (e, t) {
          n && "cache" === n.source ? r.firestore.ensureClientConfigured().getDocumentFromLocalCache(r._key).then(function (t) {
            e(new zp(r.firestore, r._key, t, !0, t instanceof ya && t.hasLocalMutations))
          }, t) : r.getViaSnapshotListener(e, t, n)
        })
      }, Gp.prototype.getViaSnapshotListener = function (e, n, r) {
        var i = this.onSnapshotInternal({includeMetadataChanges: !0, waitForSyncWhenOnline: !0}, {
          next: function (t) {
            i(), !t.exists && t.metadata.fromCache ? n(new Qr(Ur.UNAVAILABLE, "Failed to get document because the client is offline.")) : t.exists && t.metadata.fromCache && r && "server" === r.source ? n(new Qr(Ur.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : e(t)
          }, error: n
        })
      }, Gp);

      function Gp(t, e) {
        this._key = t, this.firestore = e, this._firestoreClient = this.firestore.ensureClientConfigured()
      }

      var jp = (Wp.prototype.isEqual = function (t) {
        return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache
      }, Wp);

      function Wp(t, e) {
        this.hasPendingWrites = t, this.fromCache = e
      }

      var zp = (Hp.prototype.data = function (t) {
        return Zr("DocumentSnapshot.data", arguments, 0, 1), t = ad("DocumentSnapshot.data", t), this._document ? this.convertObject(this._document.data, iu.fromSnapshotOptions(t, this._firestore._areTimestampsInSnapshotsEnabled())) : void 0
      }, Hp.prototype.get = function (t, e) {
        if (Zr("DocumentSnapshot.get", arguments, 1, 2), e = ad("DocumentSnapshot.get", e), this._document) {
          var n = this._document.data.field(Rp("DocumentSnapshot.get", t));
          if (null !== n) return this.convertValue(n, iu.fromSnapshotOptions(e, this._firestore._areTimestampsInSnapshotsEnabled()))
        }
      }, Object.defineProperty(Hp.prototype, "id", {
        get: function () {
          return this._key.path.lastSegment()
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(Hp.prototype, "ref", {
        get: function () {
          return new Kp(this._key, this._firestore)
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(Hp.prototype, "exists", {
        get: function () {
          return null !== this._document
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(Hp.prototype, "metadata", {
        get: function () {
          return new jp(this._hasPendingWrites, this._fromCache)
        }, enumerable: !0, configurable: !0
      }), Hp.prototype.isEqual = function (t) {
        if (!(t instanceof Hp)) throw li("isEqual", "DocumentSnapshot", 1, t);
        return this._firestore === t._firestore && this._fromCache === t._fromCache && this._key.isEqual(t._key) && (null === this._document ? null === t._document : this._document.isEqual(t._document))
      }, Hp.prototype.convertObject = function (t, n) {
        var r = this, i = {};
        return t.forEach(function (t, e) {
          i[t] = r.convertValue(e, n)
        }), i
      }, Hp.prototype.convertValue = function (t, e) {
        if (t instanceof Ku) return this.convertObject(t, e);
        if (t instanceof Wu) return this.convertArray(t, e);
        if (t instanceof qu) {
          var n = t.value(e), r = this._firestore.ensureClientConfigured().databaseId();
          return t.databaseId.isEqual(r) || Or("Document " + this._key.path + " contains a document reference within a different database (" + t.databaseId.projectId + "/" + t.databaseId.database + ") which is not supported. It will be treated as a reference in the current database (" + r.projectId + "/" + r.database + ") instead."), new Kp(n, this._firestore)
        }
        return t.value(e)
      }, Hp.prototype.convertArray = function (t, e) {
        var n = this;
        return t.internalValue.map(function (t) {
          return n.convertValue(t, e)
        })
      }, Hp);

      function Hp(t, e, n, r, i) {
        this._firestore = t, this._key = e, this._document = n, this._fromCache = r, this._hasPendingWrites = i
      }

      var Yp, Xp = (s(Jp, Yp = zp), Jp.prototype.data = function (t) {
        var e = Yp.prototype.data.call(this, t);
        return xr("object" == typeof e, "Document in a QueryDocumentSnapshot should exist"), e
      }, Jp);

      function Jp() {
        return null !== Yp && Yp.apply(this, arguments) || this
      }

      var $p = (Zp.prototype.where = function (t, e, n) {
        Jr("Query.where", arguments, 3), ci("Query.where", 3, n), "in" !== e && "array-contains-any" !== e && function (t, e, n, r) {
          if (!e.some(function (t) {
            return t === r
          })) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid value " + ui(r) + " provided to function " + t + "() for its " + fi(n) + " argument. Acceptable values: " + e.join(", "))
        }("Query.where", ["<", "<=", "==", ">=", ">", "array-contains"], 2, e);
        var r, i = Rp("Query.where", t), o = Zh.fromString(e);
        if (i.isKeyField()) {
          if (o === Zh.ARRAY_CONTAINS || o === Zh.ARRAY_CONTAINS_ANY) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid Query. You can't perform '" + o.toString() + "' queries on FieldPath.documentId().");
          if (o === Zh.IN) {
            this.validateDisjunctiveFilterElements(n, o);
            for (var a = [], s = 0, u = n; s < u.length; s++) {
              var c = u[s];
              a.push(this.parseDocumentIdValue(c))
            }
            r = new Wu(a)
          } else r = this.parseDocumentIdValue(n)
        } else o !== Zh.IN && o !== Zh.ARRAY_CONTAINS_ANY || this.validateDisjunctiveFilterElements(n, o), r = this.firestore._dataConverter.parseQueryValue("Query.where", n);
        var h = nl.create(i, o, r);
        return this.validateNewFilter(h), new Zp(this._query.addFilter(h), this.firestore)
      }, Zp.prototype.orderBy = function (t, e) {
        var n;
        if (Zr("Query.orderBy", arguments, 1, 2), ei("Query.orderBy", "non-empty string", 2, e), void 0 === e || "asc" === e) n = bl.ASCENDING; else {
          if ("desc" !== e) throw new Qr(Ur.INVALID_ARGUMENT, "Function Query.orderBy() has unknown direction '" + e + "', expected 'asc' or 'desc'.");
          n = bl.DESCENDING
        }
        if (null !== this._query.startAt) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid query. You must not call Query.startAt() or Query.startAfter() before calling Query.orderBy().");
        if (null !== this._query.endAt) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid query. You must not call Query.endAt() or Query.endBefore() before calling Query.orderBy().");
        var r = Rp("Query.orderBy", t), i = new Tl(r, n);
        return this.validateNewOrderBy(i), new Zp(this._query.addOrderBy(i), this.firestore)
      }, Zp.prototype.limit = function (t) {
        if (Jr("Query.limit", arguments, 1), ti("Query.limit", "number", 1, t), t <= 0) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid Query. Query limit (" + t + ") is invalid. Limit must be positive.");
        return new Zp(this._query.withLimit(t), this.firestore)
      }, Zp.prototype.startAt = function (t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        $r("Query.startAt", arguments, 1);
        var r = this.boundFromDocOrFields("Query.startAt", t, e, !0);
        return new Zp(this._query.withStartAt(r), this.firestore)
      }, Zp.prototype.startAfter = function (t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        $r("Query.startAfter", arguments, 1);
        var r = this.boundFromDocOrFields("Query.startAfter", t, e, !1);
        return new Zp(this._query.withStartAt(r), this.firestore)
      }, Zp.prototype.endBefore = function (t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        $r("Query.endBefore", arguments, 1);
        var r = this.boundFromDocOrFields("Query.endBefore", t, e, !0);
        return new Zp(this._query.withEndAt(r), this.firestore)
      }, Zp.prototype.endAt = function (t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        $r("Query.endAt", arguments, 1);
        var r = this.boundFromDocOrFields("Query.endAt", t, e, !1);
        return new Zp(this._query.withEndAt(r), this.firestore)
      }, Zp.prototype.isEqual = function (t) {
        if (!(t instanceof Zp)) throw li("isEqual", "Query", 1, t);
        return this.firestore === t.firestore && this._query.isEqual(t._query)
      }, Zp.prototype.boundFromDocOrFields = function (t, e, n, r) {
        if (ci(t, 1, e), e instanceof zp) {
          if (0 < n.length) throw new Qr(Ur.INVALID_ARGUMENT, "Too many arguments provided to " + t + "().");
          var i = e;
          if (!i.exists) throw new Qr(Ur.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for " + t + "().");
          return this.boundFromDocument(t, i._document, r)
        }
        var o = [e].concat(n);
        return this.boundFromFields(t, o, r)
      }, Zp.prototype.boundFromDocument = function (t, e, n) {
        for (var r = [], i = 0, o = this._query.orderBy; i < o.length; i++) {
          var a = o[i];
          if (a.field.isKeyField()) r.push(new qu(this.firestore._databaseId, e.key)); else {
            var s = e.field(a.field);
            if (s instanceof Mu) throw new Qr(Ur.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + a.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
            if (null === s) {
              var u = a.field.canonicalString();
              throw new Qr(Ur.INVALID_ARGUMENT, "Invalid query. You are trying to start or end a query using a document for which the field '" + u + "' (used as the orderBy) does not exist.")
            }
            r.push(s)
          }
        }
        return new El(r, n)
      }, Zp.prototype.boundFromFields = function (t, e, n) {
        var r = this._query.explicitOrderBy;
        if (e.length > r.length) throw new Qr(Ur.INVALID_ARGUMENT, "Too many arguments provided to " + t + "(). The number of arguments must be less than or equal to the number of Query.orderBy() clauses");
        for (var i = [], o = 0; o < e.length; o++) {
          var a = e[o];
          if (r[o].field.isKeyField()) {
            if ("string" != typeof a) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid query. Expected a string for document ID in " + t + "(), but got a " + typeof a);
            if (!this._query.isCollectionGroupQuery() && -1 !== a.indexOf("/")) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to " + t + "() must be a plain document ID, but '" + a + "' contains a slash.");
            var s = this._query.path.child(Li.fromString(a));
            if (!Bi.isDocumentKey(s)) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to " + t + "() must result in a valid document path, but '" + s + "' is not because it contains an odd number of segments.");
            var u = new Bi(s);
            i.push(new qu(this.firestore._databaseId, u))
          } else {
            var c = this.firestore._dataConverter.parseQueryValue(t, a);
            i.push(c)
          }
        }
        return new El(i, n)
      }, Zp.prototype.onSnapshot = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        Zr("Query.onSnapshot", arguments, 1, 4);
        var n, r = {}, i = 0;
        return "object" != typeof t[i] || Xf(t[i]) || (hi("Query.onSnapshot", r = t[i], ["includeMetadataChanges"]), ri("Query.onSnapshot", "boolean", "includeMetadataChanges", r.includeMetadataChanges), i++), n = Xf(t[i]) ? t[i] : (ti("Query.onSnapshot", "function", i, t[i]), ei("Query.onSnapshot", "function", i + 1, t[i + 1]), ei("Query.onSnapshot", "function", i + 2, t[i + 2]), {
          next: t[i],
          error: t[i + 1],
          complete: t[i + 2]
        }), this.onSnapshotInternal(r, n)
      }, Zp.prototype.onSnapshotInternal = function (t, e) {
        var n = this, r = function (t) {
          console.error("Uncaught Error in onSnapshot:", t)
        };
        e.error && (r = e.error.bind(e));
        var i = new xf({
          next: function (t) {
            e.next && e.next(new td(n.firestore, n._query, t))
          }, error: r
        }), o = this.firestore.ensureClientConfigured(), a = o.listen(this._query, i, t);
        return function () {
          i.mute(), o.unlisten(a)
        }
      }, Zp.prototype.get = function (n) {
        var r = this;
        return Zr("Query.get", arguments, 0, 1), sd("Query.get", n), new Promise(function (e, t) {
          n && "cache" === n.source ? r.firestore.ensureClientConfigured().getDocumentsFromLocalCache(r._query).then(function (t) {
            e(new td(r.firestore, r._query, t))
          }, t) : r.getViaSnapshotListener(e, t, n)
        })
      }, Zp.prototype.getViaSnapshotListener = function (e, n, r) {
        var i = this.onSnapshotInternal({includeMetadataChanges: !0, waitForSyncWhenOnline: !0}, {
          next: function (t) {
            i(), t.metadata.fromCache && r && "server" === r.source ? n(new Qr(Ur.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : e(t)
          }, error: n
        })
      }, Zp.prototype.parseDocumentIdValue = function (t) {
        if ("string" == typeof t) {
          if ("" === t) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
          if (!this._query.isCollectionGroupQuery() && -1 !== t.indexOf("/")) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '" + t + "' contains a '/' character.");
          var e = this._query.path.child(Li.fromString(t));
          if (!Bi.isDocumentKey(e)) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '" + e + "' is not because it has an odd number of segments (" + e.length + ").");
          return new qu(this.firestore._databaseId, new Bi(e))
        }
        if (t instanceof Kp) {
          var n = t;
          return new qu(this.firestore._databaseId, n._key)
        }
        throw new Qr(Ur.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + ui(t) + ".")
      }, Zp.prototype.validateDisjunctiveFilterElements = function (t, e) {
        if (!Array.isArray(t) || 0 === t.length) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid Query. A non-empty array is required for '" + e.toString() + "' filters.");
        if (10 < t.length) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters support a maximum of 10 elements in the value array.");
        if (0 <= t.indexOf(null)) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters cannot contain 'null' in the value array.");
        if (0 < t.filter(function (t) {
          return Number.isNaN(t)
        }).length) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters cannot contain 'NaN' in the value array.")
      }, Zp.prototype.validateNewFilter = function (t) {
        if (t instanceof nl) {
          var e = [Zh.ARRAY_CONTAINS, Zh.ARRAY_CONTAINS_ANY], n = [Zh.IN, Zh.ARRAY_CONTAINS_ANY],
            r = 0 <= e.indexOf(t.op), i = 0 <= n.indexOf(t.op);
          if (t.isInequality()) {
            var o = this._query.getInequalityFilterField();
            if (null !== o && !o.isEqual(t.field)) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid query. All where filters with an inequality (<, <=, >, or >=) must be on the same field. But you have inequality filters on '" + o.toString() + "' and '" + t.field.toString() + "'");
            var a = this._query.getFirstOrderByField();
            null !== a && this.validateOrderByAndInequalityMatch(t.field, a)
          } else if (i || r) {
            var s = null;
            if (i && (s = this._query.findFilterOperator(n)), null === s && r && (s = this._query.findFilterOperator(e)), null != s) throw s === t.op ? new Qr(Ur.INVALID_ARGUMENT, "Invalid query. You cannot use more than one '" + t.op.toString() + "' filter.") : new Qr(Ur.INVALID_ARGUMENT, "Invalid query. You cannot use '" + t.op.toString() + "' filters with '" + s.toString() + "' filters.")
          }
        }
      }, Zp.prototype.validateNewOrderBy = function (t) {
        if (null === this._query.getFirstOrderByField()) {
          var e = this._query.getInequalityFilterField();
          null !== e && this.validateOrderByAndInequalityMatch(e, t.field)
        }
      }, Zp.prototype.validateOrderByAndInequalityMatch = function (t, e) {
        if (!e.isEqual(t)) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid query. You have a where filter with an inequality (<, <=, >, or >=) on field '" + t.toString() + "' and so you must also use '" + t.toString() + "' as your first Query.orderBy(), but your first Query.orderBy() is on field '" + e.toString() + "' instead.")
      }, Zp);

      function Zp(t, e) {
        this._query = t, this.firestore = e
      }

      var td = (Object.defineProperty(ed.prototype, "docs", {
        get: function () {
          var e = [];
          return this.forEach(function (t) {
            return e.push(t)
          }), e
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(ed.prototype, "empty", {
        get: function () {
          return this._snapshot.docs.isEmpty()
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(ed.prototype, "size", {
        get: function () {
          return this._snapshot.docs.size
        }, enumerable: !0, configurable: !0
      }), ed.prototype.forEach = function (e, n) {
        var r = this;
        Zr("QuerySnapshot.forEach", arguments, 1, 2), ti("QuerySnapshot.forEach", "function", 1, e), this._snapshot.docs.forEach(function (t) {
          e.call(n, r.convertToDocumentImpl(t))
        })
      }, Object.defineProperty(ed.prototype, "query", {
        get: function () {
          return new $p(this._originalQuery, this._firestore)
        }, enumerable: !0, configurable: !0
      }), ed.prototype.docChanges = function (t) {
        t && (hi("QuerySnapshot.docChanges", t, ["includeMetadataChanges"]), ri("QuerySnapshot.docChanges", "boolean", "includeMetadataChanges", t.includeMetadataChanges));
        var e = !(!t || !t.includeMetadataChanges);
        if (e && this._snapshot.excludesMetadataChanges) throw new Qr(Ur.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = function (i, e, o) {
          if (o.oldDocs.isEmpty()) {
            var n, r = 0;
            return o.docChanges.map(function (t) {
              var e = new Xp(i, t.doc.key, t.doc, o.fromCache, o.mutatedKeys.has(t.doc.key));
              return xr(t.type === wh.Added, "Invalid event type for first snapshot"), xr(!n || o.query.docComparator(n, t.doc) < 0, "Got added events in wrong order"), n = t.doc, {
                type: "added",
                doc: e,
                oldIndex: -1,
                newIndex: r++
              }
            })
          }
          var a = o.oldDocs;
          return o.docChanges.filter(function (t) {
            return e || t.type !== wh.Metadata
          }).map(function (t) {
            var e = new Xp(i, t.doc.key, t.doc, o.fromCache, o.mutatedKeys.has(t.doc.key)), n = -1, r = -1;
            return t.type !== wh.Added && (xr(0 <= (n = a.indexOf(t.doc.key)), "Index for document not found"), a = a.delete(t.doc.key)), t.type !== wh.Removed && (r = (a = a.add(t.doc)).indexOf(t.doc.key)), {
              type: function (t) {
                switch (t) {
                  case wh.Added:
                    return "added";
                  case wh.Modified:
                  case wh.Metadata:
                    return "modified";
                  case wh.Removed:
                    return "removed";
                  default:
                    return Pr("Unknown change type: " + t)
                }
              }(t.type), doc: e, oldIndex: n, newIndex: r
            }
          })
        }(this._firestore, e, this._snapshot), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges
      }, ed.prototype.isEqual = function (t) {
        if (!(t instanceof ed)) throw li("isEqual", "QuerySnapshot", 1, t);
        return this._firestore === t._firestore && this._originalQuery.isEqual(t._originalQuery) && this._snapshot.isEqual(t._snapshot)
      }, ed.prototype.convertToDocumentImpl = function (t) {
        return new Xp(this._firestore, t.key, t, this.metadata.fromCache, this._snapshot.mutatedKeys.has(t.key))
      }, ed);

      function ed(t, e, n) {
        this._firestore = t, this._originalQuery = e, this._snapshot = n, this._cachedChanges = null, this._cachedChangesIncludeMetadataChanges = null, this.metadata = new jp(n.hasPendingWrites, n.fromCache)
      }

      ["length", "forEach", "map"].concat("undefined" != typeof Symbol ? [Symbol.iterator] : []).forEach(function (t) {
        try {
          Object.defineProperty(td.prototype.docChanges, t, {
            get: function () {
              return function () {
                throw new Qr(Ur.INVALID_ARGUMENT, 'QuerySnapshot.docChanges has been changed from a property into a method, so usages like "querySnapshot.docChanges" should become "querySnapshot.docChanges()"')
              }()
            }
          })
        } catch (t) {
        }
      });
      var nd, rd = (s(id, nd = $p), Object.defineProperty(id.prototype, "id", {
        get: function () {
          return this._query.path.lastSegment()
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(id.prototype, "parent", {
        get: function () {
          var t = this._query.path.popLast();
          return t.isEmpty() ? null : new Kp(new Bi(t), this.firestore)
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(id.prototype, "path", {
        get: function () {
          return this._query.path.canonicalString()
        }, enumerable: !0, configurable: !0
      }), id.prototype.doc = function (t) {
        if (Zr("CollectionReference.doc", arguments, 0, 1), 0 === arguments.length && (t = di.newId()), ti("CollectionReference.doc", "non-empty string", 1, t), "" === t) throw new Qr(Ur.INVALID_ARGUMENT, "Document path must be a non-empty string");
        var e = Li.fromString(t);
        return Kp.forPath(this._query.path.child(e), this.firestore)
      }, id.prototype.add = function (t) {
        Jr("CollectionReference.add", arguments, 1), ti("CollectionReference.add", "object", 1, t);
        var e = this.doc();
        return e.set(t).then(function () {
          return e
        })
      }, id);

      function id(t, e) {
        var n = nd.call(this, Xh.atPath(t), e) || this;
        if (t.length % 2 != 1) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid collection reference. Collection references must have an odd number of segments, but " + t.canonicalString() + " has " + t.length);
        return n
      }

      function od(t, e) {
        if (void 0 === e) return {merge: !1};
        if (hi(t, e, ["merge", "mergeFields"]), ri(t, "boolean", "merge", e.merge), ii(t, "mergeFields", "a string or a FieldPath", e.mergeFields, function (t) {
          return "string" == typeof t || t instanceof Ff
        }), void 0 !== e.mergeFields && void 0 !== e.merge) throw new Qr(Ur.INVALID_ARGUMENT, "Invalid options passed to function " + t + '(): You cannot specify both "merge" and "mergeFields".');
        return e
      }

      function ad(t, e) {
        return void 0 === e ? {} : (hi(t, e, ["serverTimestamps"]), oi(t, 0, "serverTimestamps", e.serverTimestamps, ["estimate", "previous", "none"]), e)
      }

      function sd(t, e) {
        ei(t, "object", 1, e), e && (hi(t, e, ["source"]), oi(t, 0, "source", e.source, ["default", "server", "cache"]))
      }

      function ud(t, e, n) {
        if (e instanceof Kp) {
          if (e.firestore !== n) throw new Qr(Ur.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
          return e
        }
        throw li(t, "DocumentReference", 1, e)
      }

      var cd = Gr(qp, "Use firebase.firestore() instead."),
        hd = Gr(Vp, "Use firebase.firestore().runTransaction() instead."),
        ld = Gr(Up, "Use firebase.firestore().batch() instead."),
        fd = Gr(Kp, "Use firebase.firestore().doc() instead."), pd = Gr(zp), dd = Gr(Xp), md = Gr($p), yd = Gr(td),
        gd = Gr(rd, "Use firebase.firestore().collection() instead."), vd = {
          Firestore: cd,
          GeoPoint: Hh,
          Timestamp: ro,
          Blob: Ti,
          Transaction: hd,
          WriteBatch: ld,
          DocumentReference: fd,
          DocumentSnapshot: pd,
          Query: md,
          QueryDocumentSnapshot: dd,
          QuerySnapshot: yd,
          CollectionReference: gd,
          FieldPath: Ff,
          FieldValue: dp,
          setLogLevel: qp.setLogLevel,
          CACHE_SIZE_UNLIMITED: Op
        };

      function bd(t) {
        t.INTERNAL.registerService("firestore", function (t) {
          return new qp(t)
        }, function (t) {
          xr(t && "object" == typeof t, "shallowCopy() expects object parameter.");
          var e = {};
          for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e
        }(vd))
      }

      var wd = (Ed.prototype.addCallback = function (t) {
      }, Ed.prototype.shutdown = function () {
      }, Ed);

      function Ed() {
      }

      var Sd = "ConnectivityMonitor", Td = (Id.prototype.addCallback = function (t) {
        this.callbacks.push(t)
      }, Id.prototype.shutdown = function () {
        window.removeEventListener("online", this.networkAvailableListener), window.removeEventListener("offline", this.networkUnavailableListener)
      }, Id.prototype.configureNetworkMonitoring = function () {
        window.addEventListener("online", this.networkAvailableListener), window.addEventListener("offline", this.networkUnavailableListener)
      }, Id.prototype.onNetworkAvailable = function () {
        _r(Sd, "Network connectivity changed: AVAILABLE");
        for (var t = 0, e = this.callbacks; t < e.length; t++) (0, e[t])(0)
      }, Id.prototype.onNetworkUnavailable = function () {
        _r(Sd, "Network connectivity changed: UNAVAILABLE");
        for (var t = 0, e = this.callbacks; t < e.length; t++) (0, e[t])(1)
      }, Id.isAvailable = function () {
        return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener
      }, Id);

      function Id() {
        var t = this;
        this.networkAvailableListener = function () {
          return t.onNetworkAvailable()
        }, this.networkUnavailableListener = function () {
          return t.onNetworkUnavailable()
        }, this.callbacks = [], this.configureNetworkMonitoring()
      }

      var Cd = (Dd.prototype.onOpen = function (t) {
        xr(!this.wrappedOnOpen, "Called onOpen on stream twice!"), this.wrappedOnOpen = t
      }, Dd.prototype.onClose = function (t) {
        xr(!this.wrappedOnClose, "Called onClose on stream twice!"), this.wrappedOnClose = t
      }, Dd.prototype.onMessage = function (t) {
        xr(!this.wrappedOnMessage, "Called onMessage on stream twice!"), this.wrappedOnMessage = t
      }, Dd.prototype.close = function () {
        this.closeFn()
      }, Dd.prototype.send = function (t) {
        this.sendFn(t)
      }, Dd.prototype.callOnOpen = function () {
        xr(void 0 !== this.wrappedOnOpen, "Cannot call onOpen because no callback was set"), this.wrappedOnOpen()
      }, Dd.prototype.callOnClose = function (t) {
        xr(void 0 !== this.wrappedOnClose, "Cannot call onClose because no callback was set"), this.wrappedOnClose(t)
      }, Dd.prototype.callOnMessage = function (t) {
        xr(void 0 !== this.wrappedOnMessage, "Cannot call onMessage because no callback was set"), this.wrappedOnMessage(t)
      }, Dd);

      function Dd(t) {
        this.sendFn = t.sendFn, this.closeFn = t.closeFn
      }

      var Nd = "Connection", Ad = {BatchGetDocuments: "batchGet", Commit: "commit"}, kd = "gl-js/ fire/" + Ar,
        Rd = (Md.prototype.modifyHeadersForRequest = function (t, e) {
          if (e) for (var n in e.authHeaders) e.authHeaders.hasOwnProperty(n) && (t[n] = e.authHeaders[n]);
          t["X-Goog-Api-Client"] = kd
        }, Md.prototype.invokeRPC = function (s, n, r) {
          var u = this, c = this.makeUrl(s);
          return new Promise(function (i, o) {
            var a = new Nr;
            a.listenOnce(Cr.COMPLETE, function () {
              try {
                switch (a.getLastErrorCode()) {
                  case Ir.NO_ERROR:
                    var t = a.getResponseJson();
                    _r(Nd, "XHR received:", JSON.stringify(t)), i(t);
                    break;
                  case Ir.TIMEOUT:
                    _r(Nd, 'RPC "' + s + '" timed out'), o(new Qr(Ur.DEADLINE_EXCEEDED, "Request time out"));
                    break;
                  case Ir.HTTP_ERROR:
                    var e = a.getStatus();
                    if (_r(Nd, 'RPC "' + s + '" failed with status:', e, "response text:", a.getResponseText()), 0 < e) {
                      var n = a.getResponseJson().error;
                      if (n && n.status && n.message) {
                        var r = function (t) {
                          var e = t.toLowerCase().replace("_", "-");
                          return 0 <= Object.values(Ur).indexOf(e) ? e : Ur.UNKNOWN
                        }(n.status);
                        o(new Qr(r, n.message))
                      } else o(new Qr(Ur.UNKNOWN, "Server responded with status " + a.getStatus()))
                    } else _r(Nd, 'RPC "' + s + '" failed'), o(new Qr(Ur.UNAVAILABLE, "Connection failed."));
                    break;
                  default:
                    Pr('RPC "' + s + '" failed with unanticipated webchannel error ' + a.getLastErrorCode() + ": " + a.getLastError() + ", giving up.")
                }
              } finally {
                _r(Nd, 'RPC "' + s + '" completed.')
              }
            });
            var t = JSON.stringify(n);
            _r(Nd, "XHR sending: ", c + " " + t);
            var e = {"Content-Type": "text/plain"};
            u.modifyHeadersForRequest(e, r), a.send(c, "POST", t, e, 15)
          })
        }, Md.prototype.invokeStreamingRPC = function (t, e, n) {
          return this.invokeRPC(t, e, n)
        }, Md.prototype.openStream = function (t, e) {
          var n = [this.baseUrl, "/", "google.firestore.v1.Firestore", "/", t, "/channel"], r = Tr(), i = {
            backgroundChannelTest: !0,
            httpSessionIdParam: "gsessionid",
            initMessageHeaders: {},
            messageUrlParams: {database: "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database},
            sendRawJson: !0,
            supportsCrossDomainXhr: !0,
            internalChannelParams: {forwardChannelRequestTimeoutMs: 6e5},
            forceLongPolling: this.forceLongPolling
          };
          this.modifyHeadersForRequest(i.initMessageHeaders, e), "object" == typeof navigator && "ReactNative" === navigator.product || (i.httpHeadersOverwriteParam = "$httpHeaders");
          var o = n.join("");

          function a(t, e) {
            s.listen(t, function (t) {
              try {
                e(t)
              } catch (t) {
                setTimeout(function () {
                  throw t
                }, 0)
              }
            })
          }

          _r(Nd, "Creating WebChannel: " + o + " " + i);
          var s = r.createWebChannel(o, i), u = !1, c = !1, h = new Cd({
            sendFn: function (t) {
              c ? _r(Nd, "Not sending because WebChannel is closed:", t) : (u || (_r(Nd, "Opening WebChannel transport."), s.open(), u = !0), _r(Nd, "WebChannel sending:", t), s.send(t))
            }, closeFn: function () {
              return s.close()
            }
          });
          return a(Dr.EventType.OPEN, function () {
            c || _r(Nd, "WebChannel transport opened.")
          }), a(Dr.EventType.CLOSE, function () {
            c || (c = !0, _r(Nd, "WebChannel transport closed"), h.callOnClose())
          }), a(Dr.EventType.ERROR, function (t) {
            c || (c = !0, _r(Nd, "WebChannel transport errored:", t), h.callOnClose(new Qr(Ur.UNAVAILABLE, "The operation could not be completed")))
          }), a(Dr.EventType.MESSAGE, function (t) {
            if (!c) {
              var e = t.data[0];
              xr(!!e, "Got a webchannel message without data.");
              var n = e, r = n.error || n[0] && n[0].error;
              if (r) {
                _r(Nd, "WebChannel received error:", r);
                var i = r.status, o = function (t) {
                  var e = dh[t];
                  if (void 0 !== e) return bh(e)
                }(i), a = r.message;
                void 0 === o && (o = Ur.INTERNAL, a = "Unknown error status: " + i + " with message " + r.message), c = !0, h.callOnClose(new Qr(o, a)), s.close()
              } else _r(Nd, "WebChannel received:", e), h.callOnMessage(e)
            }
          }), setTimeout(function () {
            h.callOnOpen()
          }, 0), h
        }, Md.prototype.makeUrl = function (t) {
          var e = Ad[t];
          xr(void 0 !== e, "Unknown REST mapping for: " + t);
          var n = [this.baseUrl, "/", "v1"];
          return n.push("/projects/"), n.push(this.databaseId.projectId), n.push("/databases/"), n.push(this.databaseId.database), n.push("/documents"), n.push(":"), n.push(e), n.join("")
        }, Md);

      function Md(t) {
        this.databaseId = t.databaseId;
        var e = t.ssl ? "https" : "http";
        this.baseUrl = e + "://" + t.host, this.forceLongPolling = t.forceLongPolling
      }

      var _d = (Object.defineProperty(Od.prototype, "document", {
        get: function () {
          return "undefined" != typeof document ? document : null
        }, enumerable: !0, configurable: !0
      }), Object.defineProperty(Od.prototype, "window", {
        get: function () {
          return "undefined" != typeof window ? window : null
        }, enumerable: !0, configurable: !0
      }), Od.prototype.loadConnection = function (t) {
        return Promise.resolve(new Rd(t))
      }, Od.prototype.newConnectivityMonitor = function () {
        return Td.isAvailable() ? new Td : new wd
      }, Od.prototype.newSerializer = function (t) {
        return new jl(t, {useProto3Json: !0})
      }, Od.prototype.formatJSON = function (t) {
        return JSON.stringify(t)
      }, Od.prototype.atob = function (t) {
        return atob(t)
      }, Od.prototype.btoa = function (t) {
        return btoa(t)
      }, Od);

      function Od() {
        this.emptyByteString = "", this.base64Available = "undefined" != typeof atob
      }

      qr.setPlatform(new _d), bd(Ld)
    }).apply(this, arguments)
  } catch (t) {
    throw console.error(t), new Error("Cannot instantiate firebase-firestore - be sure to load firebase-app.js first.")
  }
});

//# sourceMappingURL=firebase-firestore.js.map
function initializeFireBase() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBPrAfspM9RFxuNuDtSyaOZ5YRjDBNiq5I",
    authDomain: "justbuild-cdb86.firebaseapp.com",
    databaseURL: "https://justbuild-cdb86.firebaseio.com",
    projectId: "justbuild-cdb86",
    storageBucket: "justbuild-cdb86.appspot.com",
    messagingSenderId: "93158914000",
    appId: "1:93158914000:web:e73a8b453338ab7c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

var tempErrorCreds;
var tempProviderName;

function retrieveIdToken(successCallback, errorCallback) {
  if (firebase.auth().currentUser === null) {
    if (errorCallback !== null)
      errorCallback("User is null");
    return;
  }

  firebase.auth().currentUser.getIdToken().then(function (idToken) {
    console.log(idToken);

    var resultObj = {
      token: idToken,
      displayName: firebase.auth().currentUser.displayName
    };
    console.log("Sending result to unity:");
    console.log(resultObj);

    if (successCallback !== undefined) {

      successCallback(resultObj);
    }
  })
    .catch(function (error) {
      console.log(error);
      if (errorCallback !== undefined)
        errorCallback(error.message);
    });
}

function anonymousLogin(successCallback, errorCallback) {
  var resultObj = {
    token: "",
    displayName: "guest"
  };
  console.log("Sending result to unity:");
  console.log(resultObj);

  if (successCallback !== undefined) {

    successCallback(resultObj);
  }
}

function firebaseLogin(providerName, successCallback, errorCallback) {
  if (providerName === "anonymous") {
    anonymousLogin(successCallback, errorCallback);
    return;
  }

  var user = firebase.auth().currentUser;

  if (user != null && !user.isAnonymous) {
    retrieveIdToken(successCallback, errorCallback);
    return;
  }

  var provider = getProvider(providerName);
  firebase.auth().useDeviceLanguage();

  //var task = firebase.auth().currentUser.isAnonymous ? firebase.auth().signInWithPopup(provider) : firebase.auth().linkWithPopup(provider);

  firebase.auth().signInWithPopup(provider).then(function (result) {
    console.log("Successful sign in");
    retrieveIdToken(successCallback, errorCallback);
  })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      tempErrorCreds = error.credential;
      console.log(error);

      if (errorCallback !== undefined)
        errorCallback(error.message);

      if (errorCode === 'auth/account-exists-with-different-credential') {
        // User's email already exists.
        // Get sign-in methods for this email.
        firebase.auth().fetchSignInMethodsForEmail(email).then(function (methods) {
          // the first method in the list will be the "recommended" method to use.
          if (methods.length == 0)
            return;
          // Sign in to provider.
          tempProviderName = methods[0].trim();
          setModalContent("generalModalContent",
            "<div id =\"continueWindow\"><span class=\"close\" id=\"closeButton\" onclick=\"hideModal('generalModal')\">&times;</span><p>Please press the button to login: </p><button onclick=\"continueLogin()\">Continue Login</button></div>");
          showModal("generalModal");
        });
      }
    });
}

function firebaseLogout() {
  firebase.auth().signOut().catch(function (error) {
    console.log(error);
  });
}

function getCurrentUserDisplayName() {
  var user = firebase.auth().currentUser;
  var displayName = "";
  if (user) {
    displayName = user.displayName;
  }
  return displayName;
}

function getProvider(providerName) {
  if (providerName && providerName.indexOf("facebook") != -1)
    return new firebase.auth.FacebookAuthProvider()
  else
    return new firebase.auth.GoogleAuthProvider()
}

function setModalContent(modalContentId, contentString) {
  content = document.getElementById(modalContentId);
  if (content) {
    content.innerHTML = contentString;
  }

}

function continueLogin() {
  hideModal("generalModal");
  var provider = getProvider(tempProviderName);
  firebase.auth().signInWithPopup(provider).then(
    function (result) {
      if (!tempErrorCreds) {
        return;
      }
      // As we have access to the pending credential, we can directly call the link method.
      result.user.linkAndRetrieveDataWithCredential(tempErrorCreds).then(function (usercred) {
        //goToApp();
      });
    });

}

function showModal(modalId) {
  modal = document.getElementById(modalId);
  if (modal)
    modal.style.display = "block";
}

function hideModal(modalId) {
  modal = document.getElementById(modalId);
  if (modal)
    modal.style.display = "none";
}

var db;

function initializeFirestore() {
  db = firebase.firestore();
}

//TODO: add subcollections support

function addDocument(collectionName, data, isJson) {
  if (!db || !collectionName)
    return;

  if (isJson) {
    try {
      data = JSON.parse(data);
    } catch (error) {
      console.log("Couldnt insert data to db, invalid json");
      return;
    }
  }

  return db.collection(collectionName).add(data);
}

function setDocument(collectionName, documentName, data, isJson, isMerge) {
  if (!db || !collectionName || !documentName)
    return;

  if (isJson) {
    try {
      data = JSON.parse(data);
    } catch (error) {
      console.log("Couldnt insert data to db, invalid json");
      return;
    }
  }

  return db.collection(collectionName).doc(documentName).set(data, {merge: isMerge});
}

function updateDocument(collectionName, documentName, data, isJson) {
  // TODO: add support for arrays
  if (!db || !collectionName || !documentName)
    return;

  if (isJson) {
    try {
      data = JSON.parse(data);
    } catch (error) {
      console.log("Couldnt insert data to db, invalid json");
      return;
    }
  }

  return db.collection(collectionName).doc(documentName).update(data);
}

function deleteDocument(collectionName, documentName) {
  if (!db || !collectionName || !documentName)
    return;

  return db.collection(collectionName).doc(documentName).delete();
}

function getDocument(collectionName, documentName) {
  if (!db || !collectionName || !documentName)
    return;

  return db.collection(collectionName).doc(documentName).get();
}
