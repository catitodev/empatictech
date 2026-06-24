# Política de Segurança

## Divulgação Responsável

Se você encontrar uma vulnerabilidade de segurança neste projeto, por favor **NÃO** abra uma issue pública.

Entre em contato pelo email ou abra um Security Advisory privado no GitHub:
- [Criar Security Advisory](https://github.com/catitodev/empatictech/security/advisories/new)

## Medidas de Segurança Implementadas

### Proteção de API
- ✅ Rate limiting: 20 requisições/minuto por IP
- ✅ Limite de payload: 100KB máximo
- ✅ Limite de mensagens: 50 por requisição
- ✅ Limite de texto: 2000 caracteres por mensagem
- ✅ Validação de tipos em todos os campos de entrada

### Headers de Segurança
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `X-XSS-Protection: 0` (desabilitado em favor de CSP)
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- ✅ `Strict-Transport-Security` (produção)

### Proteção de Dados
- ✅ Chaves de API exclusivamente via variáveis de ambiente
- ✅ `.env` no `.gitignore`
- ✅ Nenhum secret hardcoded no código-fonte
- ✅ Marcadores internos de IA removidos antes de exibir ao usuário
- ✅ Erros não expõem stack traces ou informações internas
- ✅ Sem logging de dados pessoais ou tokens

### Frontend
- ✅ Sem uso de `eval()`, `innerHTML` ou `dangerouslySetInnerHTML`
- ✅ Links externos com `rel="noopener noreferrer"`
- ✅ Input sanitizado (trimming, limites de caracteres)
- ✅ Sem armazenamento de dados sensíveis no localStorage (apenas preferência de tema)

## Dependências

- 0 vulnerabilidades conhecidas (`npm audit`)
- Dependências de tipagem removidas para eliminar vetores transitivos
- Apenas pacotes well-known e amplamente mantidos

## Versões Suportadas

| Versão | Suportada |
|--------|-----------|
| 1.x    | ✅         |

## Checklist de Deploy Seguro

1. Configure `GROQ_API_KEY` como variável de ambiente (nunca no código)
2. Habilite HTTPS no domínio de produção
3. Configure CORS restritivo se usar domínios separados
4. Monitore uso de API para detectar abusos
5. Mantenha dependências atualizadas (`npm audit` periódico)
