# Current Version (Record: 600)
| Model Name        | Accuracy | F1-Score | Precision | Recall | Training Time |
|-------------------|----------|----------|-----------|--------|---------------|
| Classical Bert    | 0.0500   | 0.0400   | 0.0357    | 0.0500 | 2002.17 sec   |
| Distil Bert       | 0.0650   | 0.0471   | 0.04127   | 0.0600 | 3011.14 sec   |
| RoBERTa Bert      | 0.0800   | 0.0091   | 0.0049    | 0.0790 | 3901.69s      |
| AlBERT Bert       | 0.0750   | 0.0091   | 0.0049    | 0.0700 | 2422.72 sec   |
| MobileBERT Bert   | 0.1966   | 0.0084   | 0.0916    | 0.0767 | 1228.76 sec   |
| Electra Bert      | 0.1250   | 0.0725   | 0.0605    | 0.1250 | 2100.20 sec   |
- not suit for large record,or either epochs be more than 12

# Current Version (Record: 200 to 300)
| Model Name        | Accuracy | F1-Score | Precision | Recall | Training Time |
|-------------------|----------|----------|-----------|--------|---------------|
| Classical Bert    | 0.0500   | 0.0400   | 0.0357    | 0.0500 | 2002.17 sec   |
| Distil Bert       | 0.0250   | 0.0148   | 0.0095    | 0.0250 | 3011.14 sec   |
| RoBERTa Bert      | 0.1200   | 0.0699   | 0.0586    | 0.0980 | 3901.69 sec   |
| AlBERT Bert       | 0.0250   | 0.0142   | 0.0103    | 0.0250 | 2422.72 sec   |
| MobileBERT Bert   | 0.0666   | 0.0684   | 0.0816    | 0.0667 | 1228.76 sec   | (300 records)
| Electra Bert      | 0.1250   | 0.0725   | 0.0605    | 0.1250 | 2100.20 sec   |

# Previous Version
| Model Name        | Accuracy | F1-Score | Precision | Recall | Training Time |
|-------------------|----------|----------|-----------|--------|---------------|
| Classical Bert    | 0.1200   | 0.0773   | 0.0768    | 0.1800 | 312.17 ms     |
| Distil Bert       | 0.0500   | 0.0048   | 0.0025    | 0.0500 | 130.95 ms     |
| RoBERTa Bert      | 0.0580   | 0.0048   | 0.0670    | 0.0500 | 118.46 ms     |
| AlBERT Bert       | 0.0500   | 0.0049   | 0.0026    | 0.0500 | 234.64 ms     |
| MobileBERT Bert   | 0.0250   | 0.0024   | 0.0060    | 0.0250 | 103.19 ms     |
| Electra Bert      | 0.0500   | 0.0214   | 0.0136    | 0.0500 | 280.20 ms     |
| Top2Vec           | 0.0850   | 0.0218   | 0.0130    | 0.0850 | 200.20 ms     |

# For Percentage:
| Model Name        | Accuracy (%) | F1-Score (%) | Precision (%) | Recall (%) | Training Time |
|-------------------|-------------|-------------|---------------|------------|---------------|
| Classical Bert    | 12.00       | 7.73        | 7.68          | 18.00      | 312.17 ms     |
| Distil Bert       | 5.00        | 0.48        | 0.25          | 5.00       | 130.95 ms     |
| RoBERTa Bert      | 5.80        | 0.48        | 6.70          | 5.00       | 118.46 ms     |
| AlBERT Bert       | 5.00        | 0.49        | 0.26          | 5.00       | 234.64 ms     |
| MobileBERT Bert   | 2.50        | 0.24        | 0.60          | 2.50       | 103.19 ms     |
| Electra Bert      | 5.00        | 2.14        | 1.36          | 5.00       | 280.20 ms     |
| Top2Vec           | 8.50        | 2.18        | 1.30          | 8.50       | 200.20 ms     |



