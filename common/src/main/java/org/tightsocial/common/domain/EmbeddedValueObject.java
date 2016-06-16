/*
 * The MIT License
 *
 * Copyright 2016 tightsocial.org.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package org.tightsocial.common.domain;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */
public abstract class EmbeddedValueObject implements Serializable {
    private static final long serialVersionUID = 456952647815934462L;

    @Override
    public String toString() {
        final Object thisObj = this;
        return this.collect(new Producer<String>(){

            @Override
            public String produce(Field field1, Field field2) {
                String fieldName = field1.getName();
                try {
                    Object valueOfField1 = field1.get(thisObj);
                    if (valueOfField1 != null){
                        return fieldName + "=" + valueOfField1.toString();
                    }
                } catch (IllegalArgumentException | IllegalAccessException ex) {
                    Logger.getLogger(EmbeddedValueObject.class.getName()).log(Level.SEVERE, null, ex);
                }
                return fieldName + "=null";
            }
            }, new StringConcatAccumulater());
    }

    @Override
    public boolean equals(final Object otherObj) {
        if (otherObj == null){
            return false;
        }
        if (!this.getClass().equals(otherObj.getClass())){
            return false;
        }
        final Object thisObj = this;
        
        return this.collect(new Producer<Boolean>(){
                @Override
                public Boolean produce(Field field1, Field field2){
                    try {
                        Object valueOfField1 = field1.get(thisObj);
                        Object valueOfField2 = field2.get(otherObj);
                        if (valueOfField1 != null){
                            return valueOfField1.equals(valueOfField2);
                        } else if (valueOfField1 == null && valueOfField2 == null){
                            return true;
                        } else {
                            return false;
                        }
                    } catch (IllegalArgumentException | IllegalAccessException ex) {
                        Logger.getLogger(EmbeddedValueObject.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    return Boolean.FALSE;
                }
            }
            , new BooleanAndAccumulater(), otherObj);
    
    }

    @Override
    public int hashCode() {
        final Object thisObj = this;
        
        return this.collect(new Producer<Integer>(){
                @Override
                public Integer produce(Field field1, Field field2){
                    try {
                        Object valueOfField1 = field1.get(thisObj);
                        if (valueOfField1 != null){
                            return valueOfField1.hashCode();
                        } else {
                            return 0;
                        }
                    } catch (IllegalArgumentException | IllegalAccessException ex) {
                        Logger.getLogger(EmbeddedValueObject.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    return 0;
                }
            }
            , new IntegerAppendAccumulater());
    }
    
    protected <T> T collect(Producer<T> producer, Accumulater<T> accumulator){
        return collect(producer, accumulator, null);
    }
    
    protected <T> T collect(Producer<T> prducer, Accumulater<T> accumulator, Object otherObj){
        Field[] fields =  this.getClass().getDeclaredFields();
        for(Field field : fields){
            Field field2 = null;
            if (otherObj != null){
                try {
                    field2 = otherObj.getClass().getDeclaredField(field.getName());
                    field2.setAccessible(true);
                } catch (NoSuchFieldException | SecurityException ex) {
                    Logger.getLogger(EmbeddedValueObject.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
            field.setAccessible(true);
            T tmp = prducer.produce(field, field2);
            accumulator.accumulate(tmp);
        }
        return accumulator.getAccumulated();
    }
    
    public static class BooleanAndAccumulater implements Accumulater<Boolean>{
        Boolean accumulated = Boolean.TRUE;
        @Override
        public void accumulate(Boolean input) {
            accumulated = accumulated & input;
        }

        @Override
        public Boolean getAccumulated() {
            return this.accumulated;
        }
    }
    
    public static class IntegerAppendAccumulater implements Accumulater<Integer>{
        int accumulated = 17;
        @Override
        public void accumulate(Integer input) {
            accumulated = accumulated*31 + input;
        }

        @Override
        public Integer getAccumulated() {
            return accumulated;
        }
    }
    
    public static class StringConcatAccumulater implements Accumulater<String>{
        String accumulated = "";
        @Override
        public void accumulate(String input) {
            accumulated += ", " + input;
        }

        @Override
        public String getAccumulated() {
            return "[" + accumulated + "]";
        }
    }
    
    public static interface Accumulater<T>{
        public void accumulate(T input);
        public T getAccumulated();
    }
    
    public static interface Producer<T>{
        public T produce(Field field1, Field field2);
    }
}
