```markdown
**Element 1: Data Type**

1. **Types and amount of scientific data expected to be generated in the project:**   
   This project will generate clinical research data from 500 individuals (250 renal dialysis patients and 250 matched healthy controls) recruited from multiple clinics. Data types to be collected include:  
   - Demographic data (e.g., age, sex, race/ethnicity, relevant medical history)  
   - Laboratory results (e.g., blood and urine tests, kidney function markers)  
   - Clinical observations (e.g., blood pressure, weight, dialysis modality, session details)  
   - Clinical disposition (e.g., hospitalization, mortality, end-stage renal disease progression, adverse events)  
   The estimated volume of structured data is approximately 2 GB in total, stored as tabular files (CSV or similar). No high-throughput sequencing or imaging data will be generated.  

2. **Scientific data that will be preserved and shared, and the rationale for doing so:**  
   All de-identified individual-level participant data relevant to the study aims—including demographics, laboratory values, clinical observations, and clinical disposition—will be preserved and shared. Sharing these comprehensive datasets will maximize the scientific utility and reproducibility of the research, supporting future meta-analyses, hypothesis generation, and validation studies.  

3. **Metadata, other relevant data, and associated documentation:**   
   Metadata to be shared will include:  
   - Data dictionaries describing each variable, coding, and permitted values  
   - Study protocol and informed consent templates  
   - Case report forms (CRFs) and data collection instruments  
   - Descriptions of data processing and quality control procedures  
   These will facilitate interpretation and reuse of the scientific data by other investigators.

**Element 2: Related Tools, Software and/or Code:**  
The data will be provided in standard, non-proprietary tabular formats (CSV, TXT), compatible with widely used statistical and data analysis software (e.g., R, Python, SAS, SPSS, Excel). No specialized or proprietary software is required to access or manipulate the data. Any custom code (e.g., for data cleaning) will be shared via a public GitHub repository, with links provided in the data documentation.

**Element 3: Standards:**  
Common data element standards recommended by the NIDDK and NIH (such as CDISC and NIH Common Data Elements for kidney research) will be used whenever possible for variable definitions and coding. Data and metadata will be formatted in accordance with FAIR (Findable, Accessible, Interoperable, Reusable) principles. Data dictionaries and metadata will follow the Data Documentation Initiative (DDI) standard to enable interoperability with other datasets and resources. Where no consensus standard exists for a specific data element, the definitions and coding will be clearly documented.

**Element 4: Data Preservation, Access, and Associated Timelines**

1. **Repository where scientific data and metadata will be archived:**   
   The scientific data and metadata will be deposited in the NIDDK Central Repository (https://repository.niddk.nih.gov/), a NIH-supported domain-specific repository for studies of diabetes, digestive, and kidney diseases.  

2. **How scientific data will be findable and identifiable:**   
   Upon submission, the dataset will be assigned a persistent digital object identifier (DOI) or accession number by the NIDDK Central Repository. Metadata records will be indexed and made searchable through the repository’s interface and via NIH’s data discovery platforms (e.g., NIH RePORTER, Vivli, DataMed).

3. **When and how long the scientific data will be made available:**   
   The data will be made available no later than the time of publication of the main study findings or at the end of the NIH performance period, whichever comes first. Data will remain available through the NIDDK Central Repository for at least 10 years after the project completion, in accordance with repository policies.

**Element 5: Access, Distribution, or Reuse Considerations**

1. **Factors affecting subsequent access, distribution, or reuse of scientific data:**  
   All participants will be consented for broad data sharing. Data will be de-identified in compliance with HIPAA and other applicable regulations. There are no anticipated restrictions on data sharing beyond those required to protect participant privacy and confidentiality. Data use agreements will prohibit attempts to re-identify participants or use the data for non-research purposes.

2. **Whether access to scientific data will be controlled:**  
   Yes, access to individual-level data will be controlled. Researchers will be required to submit a data access request and sign a data use agreement via the NIDDK Central Repository. Summary-level data and metadata will be openly accessible.

3. **Protections for privacy, rights, and confidentiality of human research participants:**   
   All shared data will be rigorously de-identified prior to release, following the HIPAA Safe Harbor method and expert determination as appropriate. Direct identifiers will be removed, and indirect identifiers will be reviewed to minimize re-identification risk. A Certificate of Confidentiality will be obtained for the project. Access to controlled data will require data use agreements specifying requirements for privacy, security, and prohibition of re-identification.

**Element 6: Oversight of Data Management and Sharing:**  
Compliance with this DMSP will be monitored by the study’s Principal Investigator and the designated Data Steward (a PhD-level project manager with data governance experience). Oversight activities will include regular reviews (quarterly) of data collection, de-identification, documentation, and repository submission activities. Compliance will also be reviewed annually by the institution’s Office of Research Compliance and the NIDDK program officer, as required by NIH policy.
```