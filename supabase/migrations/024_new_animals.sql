-- Migration 024: Adiciona Sanhaço e Saíra à tabela animals

INSERT INTO animals (id, name, sci_name, emoji, tier, tier_label, pts, status, status_label, where_find, habitat, wiki_url)
VALUES
  ('saira', 'Saíra', 'Tangara seledon', '🐦', 'B', 'Raro', 90, 'LC', 'Pouco preocupante', 'Dossel da Floresta Atlântica, bordas de mata com frutíferas', 'Floresta Atlântica', 'https://pt.wikipedia.org/wiki/Sa%C3%ADra-sete-cores'),
  ('sanhaco', 'Sanhaço', 'Thraupis sayaca', '🐦', 'C', 'Comum', 35, 'LC', 'Pouco preocupante', 'Parques, jardins, bordas de mata e áreas urbanas', 'Floresta/Urbano', 'https://pt.wikipedia.org/wiki/Sanha%C3%A7o-cinzento');
