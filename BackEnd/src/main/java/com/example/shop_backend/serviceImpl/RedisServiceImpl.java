package com.example.shop_backend.serviceImpl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class RedisServiceImpl<T>{
    private final RedisTemplate<String,Object> redisTemplate;
    private final HashOperations<String,String,T> hashOperations ;
    private final ObjectMapper objectMapper;

    public RedisServiceImpl(RedisTemplate<String, Object> redisTemplate, HashOperations<String, String, T> hashOperations, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.hashOperations = redisTemplate.opsForHash();
        this.objectMapper = objectMapper;
    }


    public T getRedisByKey(String key,Class<T> clazz) throws JsonProcessingException {
        String json = (String) redisTemplate.opsForValue().get(key);
        if (json == null)
            return null;
        return objectMapper.readValue(json, clazz);
    }

    public T getRedisHashKey(String key, String file) throws JsonProcessingException {
        String json = (String) redisTemplate.opsForHash().get(key,file);
        if (json == null)
            return null;
        T value = objectMapper.readValue(json, new TypeReference<T>() {});
        log.info("value {}",value);
        return value;
    }

    public T getRedisHashKeyClass(String key, String file , Class<T> clazz) throws JsonProcessingException {
        String json = (String) redisTemplate.opsForHash().get(key,file);
        if (json == null)
            return null;
        T value = objectMapper.readValue(json, clazz);
        log.info("value {}",value);
        return value;
    }
    public List<T> getRedisHashAllKey(String key) {
        List<Object> objects = redisTemplate.opsForHash().values(key);

        return objects.stream().map(
                ob -> {
                    String json = (String) ob;
                    T value = null;
                    try {
                        value = objectMapper.readValue(json, new TypeReference<T>() {});
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(e);
                    }
                    return value;
                }
        ).toList();
    }

    public void saveRedisByKey(String key, T value,Long time) throws JsonProcessingException {
        String json = objectMapper.writeValueAsString(value);
        redisTemplate.opsForValue().set(key,json, Duration.ofDays(time));
    }

    public void saveRedisHashByKey(String key, String file, T value) throws JsonProcessingException {
        String json = objectMapper.writeValueAsString(value);
        redisTemplate.opsForHash().put(key,file,json);
    }

    public void deleteRedisByKey(String key) {
        redisTemplate.delete(key);
    }

    public void deleteRedisHashByKey(String key, String file) {
        redisTemplate.opsForHash().delete(key,file);
    }
    public void  deleteAllRedisHashKey(String key)
    {
        redisTemplate.delete(key);
    }
    public List<T> getAllByKeyAndFile(String key, String field) throws JsonProcessingException {
        List<T> list = new ArrayList<>();
        Map<String, T> haStringTMap = hashOperations.entries(key);
        for (Map.Entry<String,T> entry : haStringTMap.entrySet())
        {
            if (entry.getKey().startsWith(field)) {
                String json = (String) entry.getValue();
                T object = objectMapper.readValue(json, new TypeReference<T>() {});
                list.add(object);
            }
        }
        return list;
    }
    public void setTimeToLive(String key,int time)
    {
        redisTemplate.expire(key,time, TimeUnit.DAYS);
    }
    public List<T> getAllByHeard(String KEY) throws JsonProcessingException {
        Set<String> keys = redisTemplate.keys(KEY + "*");
        List<T> list = new ArrayList<>();
        for(String key : keys)
        {
            String filed = key.substring(KEY.length());
            String json = (String) redisTemplate.opsForValue().get(key);
            T value = objectMapper.readValue(json, new TypeReference<T>() {});
            list.add(value);
        }
        return list;
    }
}
