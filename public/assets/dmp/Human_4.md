**Element 1: Data Type**

1. **Types and amount of scientific data expected to be generated in the project:**  
    This project will perform secondary data analysis on kidney magnetic resonance imaging (MRI) data to determine the parenchymal kidney volume. Analysis will be done on the subjects with available imaging data within the database of Genotypes and Phenotypes (dbGaP). The following dataset will be produced during this project:
   • Clinical dataset of the estimated kidney volume.

2. **Scientific data that will be preserved and shared, and the rationale for doing so:**  
   This secondary data analysis is not generating new data measurements. The data are already available through the dbGaP. The kidney volume dataset produced from the methods developed during this study will be made available for further research.

3. **Metadata, other relevant data, and associated documentation:**  
   Kidney volume will be estimated by a neural network trained using axial slices of dbGaP full-body MRI data. Manually created training data of known kidney volume from 95 subjects will be used to train and validate the model. Design choices and hyperparameter selections will be documented. The processing pipeline and related quality control metrics and thresholds will be defined and documented in a publication quality methods section

**Element 2: Related Tools, Software and/or Code:**  
MRI images will be accessed using the Horos DICOM Viewer software available on Macintosh computers. The neural network will be implemented using Python. Estimated kidney volumes will be output into a tab-separated file that can be viewed by most text editing software.

**Element 3: Standards:**  
The data that will be used for the proposed secondary data analysis is already available on the dbGaP. The documentation for the generation of the data is also available. The estimated kidney length and volumes will be reported in the community standard of centimeters and milliliters.

**Element 4: Data Preservation, Access, and Associated Timelines**

1. **Repository where scientific data and metadata will be archived:**  
   Estimated kidney volumes will be made available within the dbGaP as a sub-study. Identified study metadata will be supplied in the associated publication supplement as well as a supporting document in the dbGaP sub-study.

2. **How scientific data will be findable and identifiable:**  
   The data will be associated with the subjects within the dbGaP. Links to the parent and sub-study datasets will be included in the publication.

3. **When and how long the scientific data will be made available:**  
   The data will be made available through the dbGaP following the standard review and release protocols. The data will be made available as soon as possible. Scientific data included in published manuscripts will be made available at the time of publication; all other scientific data will be made available no later than the end of the award.

**Element 5: Access, Distribution, or Reuse Considerations**

1. **Factors affecting subsequent access, distribution, or reuse of scientific data:**  
   Access to the data will require investigators to register for a dbGaP account and submit an application providing a summary of the research you intend to conduct, the dataset you require, and a description of any new data or variables your research will generate. Data will then be made available following application approval.

2. **Whether access to scientific data will be controlled:**  
   Data access will be controlled through the dbGaP. This will allow for association of kidney volume estimates produced from this study with the other clinical, imaging, and genomic data for the associated research participants.

3. **Protections for privacy, rights, and confidentiality of human research participants:**  
   This study proposes to use only data that has already been de-identified. Shared data generated from this project will report subject specific kidney volumes by using the study assigned ID, which has already been de-identified.

**Element 6: Oversight of Data Management and Sharing:**  
The Principal Investigator for this project, Dr. ABC, will ensure that this Data Management and Sharing (DMS) Plan is followed. The institutional official (title and role), will be responsible for oversight of compliance with the accepted DMS Plan. Compliance will be
evaluated annually during the award period and progress towards the plan’s DMS activities will be included in the annual Research Performance Progress Report (RPPR) submitted to the National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK) Project Officer. At the project conclusion, the final progress report will summarize how the DMS objectives were fulfilled and provide links to the shared dataset(s).
