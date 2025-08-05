**Element 1: Data Type**

1. **Types and amount of scientific data expected to be generated in the project:**  
   This project will generate a clinical dataset containing estimated parenchymal kidney volumes derived from secondary analysis of existing kidney MRI data. The dataset will also include minimal demographic and clinical covariates necessary for analysis (e.g., subject age, sex, diagnosis, and study identifiers). The estimated size of the resulting dataset is approximately 1,000–2,000 records (one per subject), with each record containing up to 20 variables. No new imaging files will be created; only derived quantitative data will be generated.

2. **Scientific data that will be preserved and shared, and the rationale for doing so:**  
   The clinical dataset of estimated kidney volumes and associated covariates will be preserved and shared. Raw MRI imaging data will not be generated nor re-shared, as it is already maintained by dbGaP. Sharing the derived clinical dataset will support reproducibility and secondary analyses by other investigators, in alignment with NIDDK and NIH data sharing policies.

3. **Metadata, other relevant data, and associated documentation:**  
   The following documentation will be provided to facilitate data interpretation and reuse:
   - Data dictionary defining all variables and coding.
   - Study protocol outlining methods for kidney volume estimation.
   - Data processing and analysis code or workflow description.
   - Documentation of inclusion/exclusion criteria and relevant data provenance.

**Element 2: Related Tools, Software and/or Code:**  
No specialized or proprietary tools are required to access or analyze the shared clinical dataset, which will be provided in standard CSV format. Any analysis code developed (e.g., R or Python scripts for data cleaning or kidney volume calculations) will be shared as supplementary files or via a public code repository (e.g., GitHub) with appropriate documentation to facilitate reproducibility.

**Element 3: Standards:**  
The clinical dataset will adhere to relevant data standards to maximize interoperability:

- Variables will be coded using standard terminologies where possible (e.g., SNOMED CT for diagnoses, LOINC for laboratory measures).
- Data will be formatted as comma-separated values (CSV) files.
- Metadata will comply with the NIH Common Data Elements (CDEs) where applicable, and variable definitions will be mapped to existing ontologies as appropriate.
- If no consensus standard exists for specific variables (e.g., custom kidney volume estimation methods), clear definitions will be provided in the data dictionary.

**Element 4: Data Preservation, Access, and Associated Timelines**

1. **Repository where scientific data and metadata will be archived:**  
   The clinical dataset, metadata, and associated documentation will be deposited in the NIH Database of Genotypes and Phenotypes (dbGaP), which is the repository of record for the source imaging data and is recommended for biomedical datasets involving human participants.

2. **How scientific data will be findable and identifiable:**  
   Upon deposition, the dataset will be assigned a unique accession number and persistent identifier by dbGaP. The dataset will be indexed and searchable through the dbGaP portal and referenced in related publications.

3. **When and how long the scientific data will be made available:**  
   The dataset will be made available through dbGaP no later than the time of the first publication of results or by the end of the project’s performance period, whichever comes first. Data will be available for a minimum of 10 years, in accordance with NIH data retention policies and dbGaP guidelines.

**Element 5: Access, Distribution, or Reuse Considerations**

1. **Factors affecting subsequent access, distribution, or reuse of scientific data:**  
   All research participants have been consented for broad data sharing. However, since the data are derived from human subjects, data sharing will comply with privacy and confidentiality regulations (e.g., HIPAA). Data use may be subject to Data Use Certifications and approval by dbGaP’s Data Access Committees to ensure compliance with consent and applicable laws.

2. **Whether access to scientific data will be controlled:**  
   Yes, access will be controlled. The dataset will be available through dbGaP’s controlled-access process to ensure that only qualified researchers with approved data use requests may access the data.

3. **Protections for privacy, rights, and confidentiality of human research participants:**  
   The shared dataset will be de-identified in accordance with the HIPAA Privacy Rule and NIH Genomic Data Sharing Policy. Direct identifiers will be removed, and only the minimum necessary demographic and clinical data will be included. Data will be shared under dbGaP’s controlled-access procedures, and users must agree to dbGaP’s Data Use Certification agreements to further protect participant privacy and confidentiality.

**Element 6: Oversight of Data Management and Sharing:**  
Compliance with this Data Management and Sharing Plan will be overseen by the project’s Principal Investigator, with support from the project’s Data Steward and the Institutional Office of Research Compliance. Review of data management and sharing activities will occur at least annually, and prior to dataset deposition, to ensure adherence to the Plan and NIH requirements. Any deviations or issues will be reported to the Institutional Official responsible for research compliance.
