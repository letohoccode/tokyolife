package com.example.shop_backend.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisClientConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.*;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.stereotype.Service;
import redis.clients.jedis.JedisPoolConfig;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Configuration
@Service
@EnableRedisRepositories
@EnableCaching
public class RedisConfig {

   @Bean
    public RedisCacheConfiguration redisCacheConfiguration()
   {
       return RedisCacheConfiguration
               .defaultCacheConfig()
               .entryTtl(Duration.ofMinutes(5))
               .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(RedisSerializer.string()))
               .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(RedisSerializer.json()));
   }
   @Bean
    public JedisConnectionFactory jedisConnectionFactory()
   {
       RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
       redisStandaloneConfiguration.setHostName("localhost");
       redisStandaloneConfiguration.setPort(6379);

       JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
       jedisPoolConfig.setMaxTotal(10);
       jedisPoolConfig.setMaxIdle(5);
       jedisPoolConfig.setMinIdle(2);
       JedisClientConfiguration jedisClientConfiguration = JedisClientConfiguration.builder()
               .usePooling().poolConfig(jedisPoolConfig).build();
       return new JedisConnectionFactory(redisStandaloneConfiguration,jedisClientConfiguration);
   }

   @Bean
    public RedisTemplate<String,Object> redisTemplate()
   {
       RedisTemplate<String,Object> template =new RedisTemplate<>();
       template.setConnectionFactory(jedisConnectionFactory());

       template.setKeySerializer(new StringRedisSerializer());
       template.setHashKeySerializer(new StringRedisSerializer());

       template.setValueSerializer(new Jackson2JsonRedisSerializer<Object>(Object.class));
       template.setHashValueSerializer(new Jackson2JsonRedisSerializer<Object>(Object.class));
       template.afterPropertiesSet();
       return template;
   }
    @Bean
    public HashOperations<String,String,Object> hashOperations()
    {
        return redisTemplate().opsForHash();
    }
}
