# LoranC

## What is this?
>The Loran system is a radio aid to navigation which utilizes<br>
the principle of hyperbolic fixing. The locus of points for which<br>
the difference in arrival time of synchronized signals from a pair<br>
of transmitters is constant determines a hyperbolic line of<br>
positions. The intersection of two hyperbolic lines of position<br>
from two pairs of stations determines a hyperbolic fix. That two<br>
pairs of stations are required for a fix does not necessarily mean<br>
that there are four separate stations, for one station of one pair<br>
may be colocated with one station of the other pair forming a<br>
**Loran Triplets** may be joined "end-to-end" by station<br>
colocation to form a **Loran chain**. Loran chains are common on both<br>
the East and West coasts of the North American continent.

From: [POSITION DETERMINATION WITH LORAN-C TRIPLETS](/pdfs/ADA137009.pdf)


## TRS-80 Model 100 Emulator

https://bitchin100.com/CloudT/#/M100Display

---

1. Navigate to "BASIC"
2. Load [the original LORAN code](/LORAN.bas) into the "cassette tape"
3. You can upload the file in two ways. You can upload the file using the upload file option or you can copy paste the file into the plain text box. Either method you will need to use the file's name. Use `CLOAD "LORAN"` to load the file from the "cassette" into the machine's memory.
![loran_upload.png](/images/loran_upload.png)
4. Use `RUN` to run the program.
5. Use option 8 to set the `Chain` / `GRI`
7. Use option 1 to convert LORAN numbers to Lat/Lon

Try using the examples on page 31 (PDF Page 40/53) in [ADA137009.pdf](/pdfs/ADA137009.pdf).
![loran_usage.png](/images/loran_usage.png)

Partial list of chains can be found here: https://prc68.com/I/Loran-c.shtml<br>
More chain information can be found throughout the various books. I plan to aggregate the information myself later.

## Manual on using the program

[POSITION DETERMINATION WITH LORAN-C TRIPLETS](/pdfs/ADA137009.pdf)

I highly recommend reading this PDF starting on page 1 (or 10 in the PDF file). It will explain the quirks of the program and necessary steps to take in order. It also gives sample input/output. Copying step by step what is done in this book you should get the same exact results.

## Manual on the TRS-80 Model 100
If you want to learn more about the computer itself then this manual will do you well.

[TRS80-M100-User-Guide](/pdfs/TRS80-M100-User-Guide.pdf)

## More
More resources on this topic can be found by using the search feature on this site.<br>
https://discover.dtic.mil/

Preprocessor for TRS-80 BASIC that implements labels for GOTO/GOSUB jumps.<br>
https://github.com/Auios/Labeled-Basic-Preprocessor

### Acronyms
* TD: Time Delay OR Time Difference
* ASF: Additional Secondary Factor
* ITD: Indicated Time Delay
* GRI: Group Repetition Interval

## Science?
* Name: *AN ALGORITHM FOR POSITION DETERMINATION USING LORAN-C TRIPLETS WITH A BASIC PROGRAM FOR THE COMMODORE 2001 MICROCOMPUTER*<br>
Date: March 1980<br>
Link: [ADA086790.pdf](/pdfs/ADA086790.pdf)

* Name: *POSITION DETERMINATION WITH LORAN-C TRIPLETS AND THE HEWLETT-PACKARD HP-41CV PROGRAMMABLE CALCULATOR*<br>
Date: September 1982<br>
Link: [ADA122499.pdf](/pdfs/ADA122499.pdf)

* Name: *APPLICATION OF ADDITIONAL SECONDARY FACTORIS TO LORAN-C POSITIONS FOR HYDROGRAPHIC OPERATIONS*<br>
Date: October 1982<br>
Link: [ADA125620.pdf](/pdfs/ADA125620.pdf)
