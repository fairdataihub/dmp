**Element 1: Data Type**

1. **Types and amount of scientific data expected to be generated in the project:**  
   The project will generate three main types of high-throughput sequencing data from 20 human cell lines obtained from BIOBANK X:

   - **Nanopore sequence data:** Long-read sequencing data (~100 Gb per cell line, ~2 Tb total) produced using Oxford Nanopore technology, enabling structural variant detection and high-quality genome assembly.
   - **30x Whole-Genome Sequencing (WGS) data:** High-coverage short-read sequencing (~120 Gb per cell line, ~2.4 Tb total) for comprehensive genomic variant analysis.
   - **RNA sequencing (RNA-seq) data:** Transcriptomic data (~8 Gb per cell line, ~160 Gb total) to capture gene expression profiles.

   The total estimated raw data output is approximately 4.6 Tb, excluding processed and intermediate files.

2. **Scientific data that will be preserved and shared, and the rationale for doing so:**  
   The following scientific data will be preserved and shared:

   - **Raw sequencing data:** FASTQ files from Nanopore, WGS, and RNA-seq runs.
   - **Processed data:** Aligned BAM/CRAM files, variant call files (VCF), and gene expression matrices.

   Sharing these data types aligns with NHGRI and NIH guidelines for maximizing utility and reproducibility. Preserving both raw and processed data ensures that future users can verify results, apply new analytical methods, and integrate findings with other datasets.

3. **Metadata, other relevant data, and associated documentation:**
   - Sample-level metadata (e.g., cell line identifiers, BIOBANK X accession numbers, passage number, tissue/cell type, demographic summaries where permitted)
   - Experimental protocols (including library preparation, sequencing parameters, and quality control metrics)
   - Data processing and analysis pipelines (including software versions and parameter settings)
   - Data dictionaries and README files to facilitate data interpretation

**Element 2: Related Tools, Software and/or Code:**  
Specialized tools and software will be required for access and manipulation of the data:

- **Nanopore data:** Oxford Nanopore’s Guppy basecaller, MinKNOW software, and compatible analysis tools (available at [Oxford Nanopore Community](https://community.nanoporetech.com/))
- **Short-read data:** Standard genomics tools such as BWA (for alignment), GATK (for variant calling), and STAR (for RNA-seq alignment), all of which are open-source and available via [Bioconda](https://bioconda.github.io/) or [GitHub](https://github.com/)
- **Custom scripts:** Any custom code or workflows developed for data processing and analysis will be shared in a public GitHub repository, with documentation provided.

**Element 3: Standards:**  
The following community-accepted data and metadata standards will be applied:

- **Raw sequence data:** FASTQ format (standard for high-throughput sequencing data)
- **Aligned sequence data:** BAM/CRAM format (SAM/BAM Specification)
- **Variant calls:** VCF format (Variant Call Format Specification)
- **RNA-seq quantification:** Standard tab-delimited gene expression matrices (e.g., TPM/FPKM tables)
- **Metadata:** Minimum Information About a Sequencing Experiment (MINSEQE) guidelines and NCBI BioSample metadata standards will be followed
- **Protocols:** Described using protocols.io links or equivalent
  These standards will ensure interoperability, reproducibility, and reusability of the datasets.

**Element 4: Data Preservation, Access, and Associated Timelines**

1. **Repository where scientific data and metadata will be archived:**

   - **Raw and processed genomic data:** Database of Genotypes and Phenotypes (dbGaP, [https://www.ncbi.nlm.nih.gov/gap/](https://www.ncbi.nlm.nih.gov/gap/))
   - **RNA-seq data:** Gene Expression Omnibus (GEO, [https://www.ncbi.nlm.nih.gov/geo/](https://www.ncbi.nlm.nih.gov/geo/)) or Sequence Read Archive (SRA)
   - **Metadata and protocols:** Associated with the primary dbGaP/GEO/SRA submissions and linked in publications

2. **How scientific data will be findable and identifiable:**  
   Each dataset will be assigned persistent unique identifiers (e.g., dbGaP accession numbers, GEO Series accession numbers, BioSample IDs). These identifiers will be referenced in publications and project webpages, enabling data discovery via repository search tools and standard indexing services.

3. **When and how long the scientific data will be made available:**  
   Data will be submitted to repositories and made available no later than the time of first publication of results or at the end of the grant period, whichever occurs first. Data will remain available in the repositories for at least 10 years, in accordance with NIH and repository policies.

**Element 5: Access, Distribution, or Reuse Considerations**

1. **Factors affecting subsequent access, distribution, or reuse of scientific data:**  
   Data will be shared consistent with the broad consent provided by participants. Potential factors affecting reuse include:

   - Data use limitations as specified in consent forms (e.g., non-commercial use, general biomedical research)
   - Protection of participant privacy and compliance with applicable laws and regulations (e.g., HIPAA, GINA)
   - Controlled access requirements for sensitive human genomic data

2. **Whether access to scientific data will be controlled:**  
   Yes, access to human genomic data (raw and processed) will be controlled via dbGaP’s Data Access Committees. Qualified investigators must apply and agree to data use limitations.

3. **Protections for privacy, rights, and confidentiality of human research participants:**  
   All data will be de-identified prior to submission, in compliance with NIH Genomic Data Sharing Policy and institutional IRB requirements. Data will be assigned random study IDs with all direct identifiers removed. A Certificate of Confidentiality will be obtained. Access to controlled data will be limited to approved users, and all users must agree to terms that prohibit re-identification and unauthorized data sharing.

**Element 6: Oversight of Data Management and Sharing:**  
Compliance with this Data Management and Sharing Plan will be overseen by the Project Principal Investigator (PI) and the institutional Data Steward. The PI will ensure timely data submission, accurate metadata, and adherence to sharing timelines. The Data Steward will monitor compliance at quarterly project meetings and prior to manuscript submission. Oversight will include regular audits of data integrity and documentation. Any issues will be promptly reported to the NHGRI Program Officer.
