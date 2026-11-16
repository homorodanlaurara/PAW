package com.proiect.geografie;

import com.proiect.geografie.model.GeoQuiz;
import com.proiect.geografie.repository.GeoQuizRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GeografieApplication {

	public static void main(String[] args) {
		SpringApplication.run(GeografieApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(GeoQuizRepository repository) {
		return args -> {
			if (repository.count() == 0) {
				repository.save(new GeoQuiz(
						"Care este capitala Romaniei?",
						"Cluj-Napoca", "Bucuresti", "Timisoara", "Iasi",
						"B", "Geografie"
				));
				repository.save(new GeoQuiz(
						"Care este cel mai lung fluviu din Europa?",
						"Dunarea", "Rin", "Volga", "Nil",
						"C", "Geografie"
				));
				repository.save(new GeoQuiz(
						"In ce continent se afla desertul Sahara?",
						"Asia", "Africa", "America de Sud", "Australia",
						"B", "Geografie"
				));
				repository.save(new GeoQuiz(
						"Care este cel mai inalt varf muntos din Romania?",
						"Varful Omu", "Varful Moldoveanu", "Varful Negoiu", "Varful Parangul Mare",
						"B", "Geografie"
				));
				System.out.println("=== Intrebarile de geografie tip grila au fost incarcate! ===");
			}
		};
	}
}