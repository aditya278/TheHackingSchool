# A Clone of npm bcrypt module.

### A Little Intro:
This hashing technique is similar to the other techniques with one small difference that, the bcrypt hashing is intentionally designed in such a way that it takes longer time to generate.
Based on the number provided as the "saltRounds" (n), the algorithm to generate the hashed string can take 2^n computations, so the time taken will increase exponentially.
```
rounds=8 : ~40 hashes/sec
rounds=9 : ~20 hashes/sec
rounds=10: ~10 hashes/sec
rounds=11: ~5  hashes/sec
rounds=12: 2-3 hashes/sec
rounds=13: ~1 sec/hash
rounds=14: ~1.5 sec/hash
rounds=15: ~3 sec/hash
rounds=25: ~1 hour/hash
rounds=31: 2-3 days/hash
```

This is done so that it takes longer time to create the rainbow dictionary/crack the hash.
Ex: If normal hashing algo take 1ms to generate the hash, and bcrypt takes 100ms (or even 1 sec or even more) to generate the hash, then if it used to take 1 week to crack the hash, then it will now take 100 weeks by the hacker to crack the hash.