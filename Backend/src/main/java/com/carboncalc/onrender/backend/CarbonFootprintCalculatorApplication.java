/* CarbonFootPrintCalculatorApplication.java */

package com.carboncalc.onrender.backend;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.carboncalc.onrender.backend")
public class CarbonFootprintCalculatorApplication {
    public static void main(String[] args) {
        SpringApplication.run(CarbonFootprintCalculatorApplication.class, args);
    }
}