//package com.example.backend.controllerTests;
//
////import com.example.backend.model.Eclipse;
////import com.example.astronomy.repository.EclipseRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.time.LocalDateTime;
//
//import static org.hamcrest.Matchers.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//class EclipseControllerIntegrationTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private EclipseRepository eclipseRepository;
//
//    @BeforeEach
//    void setUp() {
//        // Puhastame ja sisestame testandmed enne iga testi
//        eclipseRepository.deleteAll();
//
//        Eclipse solarEclipse = new Eclipse();
//        solarEclipse.setType(false); // 0 - päikesevarjutus (solar)
//        solarEclipse.setGlobalStart(LocalDateTime.of(2026, 8, 12, 10, 0));
//        solarEclipse.setGlobalPeak(LocalDateTime.of(2026, 8, 12, 12, 30));
//        solarEclipse.setGlobalEnd(LocalDateTime.of(2026, 8, 12, 15, 0));
//        solarEclipse.setObservableInEstonia(true);
//
//        eclipseRepository.save(solarEclipse);
//    }
//
//    @Test
//    void testQueryAllEclipsesReturnsPrecalculatedData() throws Exception {
//        // Testib, kas varjutuste nimekirja pärimine toimib ja tagastab õiged väljad
//        mockMvc.perform(get("/api/eclipses")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(json-path("$", hasSize(1)))
//                .andExpect(json-path("$[0].type", is(0))) // 0 = päikesevarjutus
//                .andExpect(json-path("$[0].observableInEstonia", is(true)))
//                .andExpect(json-path("$[0].globalStart", notNullValue()))
//                .andExpect(json-path("$[0].globalPeak", notNullValue()))
//                .andExpect(json-path("$[0].globalEnd", notNullValue()));
//    }
//
//    @Test
//    void testLiveCalculationForSpecificLocation() throws Exception {
//        // Oletame, et meil on endpoint, mis arvutab konkreetse varjutuse ja asukoha (nt Tallinna ID = 1) jaoks kohalikud ajad
//        Long eclipseId = eclipseRepository.findAll().get(0).getId();
//        Long locationId = 1L; // Eesti asukoht Locations tabelist
//
//        mockMvc.perform(get("/api/eclipses/" + eclipseId + "/calculate")
//                        .param("locationId", String.valueOf(locationId))
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(json-path("$.locationId", is(locationId.intValue())))
//                .andExpect(json-path("$.localPeakTime", notNullValue())); // Reaalajas arvutatud kohalik haripunkt
//    }
//}