package jokefetcher;

import com.google.gson.Gson;
import dtos.ChuckDTO;
import dtos.DadDTO;
import dtos.OurDTO;
import java.io.IOException;
import utils.HttpUtils;


public class JokeFetcher {
    public static void main(String[] args) throws IOException {
        
        Gson gson = new Gson();

        String chuck = HttpUtils.fetchData("https://api.chucknorris.io/jokes/random");
        ChuckDTO chuckDTO = gson.fromJson(chuck, ChuckDTO.class);
        
        String dad = HttpUtils.fetchData("https://icanhazdadjoke.com");
        DadDTO dadDTO = gson.fromJson(dad, DadDTO.class);
        
        OurDTO ourDTO = new OurDTO(chuckDTO, dadDTO);  
        
        
        System.out.println("JSON fetched from chucknorris:");
        System.out.println(chuck);
        System.out.println("JSON fetched from dadjokes:");
        System.out.println(dad);
        System.out.println("OurDTO :");
        System.out.println(ourDTO.getJoke1());
       
    }
}
