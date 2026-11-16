package com.proiect.geografie.model;

import jakarta.persistence.*;

@Entity
@Table(name = "geo_quiz")
public class GeoQuiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String intrebare;

    @Column(nullable = false)
    private String optiuneA;

    @Column(nullable = false)
    private String optiuneB;

    @Column(nullable = false)
    private String optiuneC;

    @Column(nullable = false)
    private String optiuneD;

    @Column(nullable = false)
    private String raspunsCorect; // "A", "B", "C" sau "D"

    private String domeniu;

    public GeoQuiz() {}

    public GeoQuiz(String intrebare, String optiuneA, String optiuneB, String optiuneC, String optiuneD, String raspunsCorect, String domeniu) {
        this.intrebare = intrebare;
        this.optiuneA = optiuneA;
        this.optiuneB = optiuneB;
        this.optiuneC = optiuneC;
        this.optiuneD = optiuneD;
        this.raspunsCorect = raspunsCorect;
        this.domeniu = domeniu;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getIntrebare() { return intrebare; }
    public void setIntrebare(String intrebare) { this.intrebare = intrebare; }
    public String getOptiuneA() { return optiuneA; }
    public void setOptiuneA(String optiuneA) { this.optiuneA = optiuneA; }
    public String getOptiuneB() { return optiuneB; }
    public void setOptiuneB(String optiuneB) { this.optiuneB = optiuneB; }
    public String getOptiuneC() { return optiuneC; }
    public void setOptiuneC(String optiuneC) { this.optiuneC = optiuneC; }
    public String getOptiuneD() { return optiuneD; }
    public void setOptiuneD(String optiuneD) { this.optiuneD = optiuneD; }
    public String getRaspunsCorect() { return raspunsCorect; }
    public void setRaspunsCorect(String raspunsCorect) { this.raspunsCorect = raspunsCorect; }
    public String getDomeniu() { return domeniu; }
    public void setDomeniu(String domeniu) { this.domeniu = domeniu; }
}