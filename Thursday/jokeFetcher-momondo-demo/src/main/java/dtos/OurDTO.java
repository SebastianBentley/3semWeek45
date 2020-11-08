package dtos;

import java.util.Objects;

public class OurDTO {

    private String joke1, joke1Reference, joke2, joke2Reference;

    public OurDTO(ChuckDTO chuckDTO, DadDTO dadDTO) {
        this.joke1 = chuckDTO.getValue();
        this.joke1Reference = "https://api.chucknorris.io/jokes/random";
        this.joke2 = dadDTO.getJoke();
        this.joke2Reference = "https://icanhazdadjoke.com";
    }

    public OurDTO() {
    }

    public String getJoke1() {
        return joke1;
    }

    public void setJoke1(String joke1) {
        this.joke1 = joke1;
    }

    public String getJoke1Reference() {
        return joke1Reference;
    }

    public void setJoke1Reference(String joke1Reference) {
        this.joke1Reference = joke1Reference;
    }

    public String getJoke2() {
        return joke2;
    }

    public void setJoke2(String joke2) {
        this.joke2 = joke2;
    }

    public String getJoke2Reference() {
        return joke2Reference;
    }

    public void setJoke2Reference(String joke2Reference) {
        this.joke2Reference = joke2Reference;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final OurDTO other = (OurDTO) obj;
        if (!Objects.equals(this.joke1, other.joke1)) {
            return false;
        }
        if (!Objects.equals(this.joke1Reference, other.joke1Reference)) {
            return false;
        }
        if (!Objects.equals(this.joke2, other.joke2)) {
            return false;
        }
        if (!Objects.equals(this.joke2Reference, other.joke2Reference)) {
            return false;
        }
        return true;
    }
    
    

}
