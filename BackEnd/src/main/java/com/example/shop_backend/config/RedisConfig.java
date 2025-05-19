package com.example.shop_backend.config;


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
import org.springframework.stereotype.Service;
import redis.clients.jedis.JedisPoolConfig;

import java.time.Duration;

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
