/* FrontendController.java */

package com.carboncalc.onrender.backend.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
    @GetMapping("/{path:[^\\.]*}")
    public String redirect() {
        return "index.html";
    }
}
